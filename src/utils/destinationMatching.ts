import { demoDestinations } from "@/data/destinations";
import { isTripSubtypeForType } from "@/data/tripTypeThemes";
import type {
  BudgetLevel,
  Destination,
  DestinationMatch,
  DestinationSort,
  MatchReason,
  MatchReasonCode,
  MatchResults,
} from "@/types/destination";
import type {
  AccommodationType,
  Currency,
  DurationPreference,
  MealPreference,
  TimingPreferences,
  TransportMode,
  TravelMonth,
  TripPreferences,
} from "@/types/tripPreferences";

export const destinationMatchWeights = {
  tripType: 22,
  tripSubtype: 8,
  budget: 17,
  timing: 14,
  duration: 11,
  transport: 13,
  accommodation: 7,
  travellerAndPets: 5,
  meals: 3,
} as const;

type Coordinates = {
  latitude: number;
  longitude: number;
};

type ActualAccommodation = Exclude<AccommodationType, "No preference">;
type ActualMealPreference = Exclude<MealPreference, "No preference">;

const earthRadiusKm = 6_371;

const travelMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const satisfies readonly TravelMonth[];

const durationOrder = [
  "weekend",
  "short",
  "week",
  "long",
  "extended",
] as const satisfies readonly DurationPreference[];

const representativeTripDays = {
  weekend: 3,
  short: 5,
  week: 7,
  long: 12,
  extended: 18,
} as const satisfies Record<DurationPreference, number>;

const budgetLevelRank = {
  value: 0,
  moderate: 1,
  premium: 2,
} as const satisfies Record<BudgetLevel, number>;

/**
 * Versioned prototype heuristics for per-traveller daily spending capacity.
 * They are deliberately local and static: they are not prices, exchange rates,
 * quotes, or claims about live destination costs.
 */
const dailyBudgetThresholds = {
  RON: { valueMaximum: 300, moderateMaximum: 650 },
  EUR: { valueMaximum: 60, moderateMaximum: 130 },
  USD: { valueMaximum: 65, moderateMaximum: 140 },
  GBP: { valueMaximum: 52, moderateMaximum: 112 },
} as const satisfies Record<
  Currency,
  { valueMaximum: number; moderateMaximum: number }
>;

const reasonPriority = {
  tripType: 0,
  budget: 1,
  timing: 2,
  transport: 3,
  duration: 4,
  tripSubtype: 5,
  accommodation: 6,
  familyFriendly: 7,
  travellerGroup: 8,
  meals: 9,
  petFriendly: 10,
} as const satisfies Record<MatchReasonCode, number>;

function isValidCoordinates(coordinates: Coordinates) {
  return (
    Number.isFinite(coordinates.latitude) &&
    Number.isFinite(coordinates.longitude) &&
    coordinates.latitude >= -90 &&
    coordinates.latitude <= 90 &&
    coordinates.longitude >= -180 &&
    coordinates.longitude <= 180
  );
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function calculateHaversineDistance(
  origin: Coordinates,
  destination: Coordinates,
) {
  if (!isValidCoordinates(origin) || !isValidCoordinates(destination)) {
    return null;
  }

  const latitudeDelta = toRadians(destination.latitude - origin.latitude);
  const longitudeDelta = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);

  const haversineValue =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  const boundedHaversineValue = Math.min(1, Math.max(0, haversineValue));
  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(boundedHaversineValue),
      Math.sqrt(1 - boundedHaversineValue),
    );

  return earthRadiusKm * angularDistance;
}

function getActiveOriginCoordinates(
  preferences: TripPreferences,
): Coordinates | null {
  const origin = preferences.origin;

  if (
    origin.mode === null ||
    origin.locationStatus !== "success" ||
    origin.latitude === null ||
    origin.longitude === null
  ) {
    return null;
  }

  const coordinates = {
    latitude: origin.latitude,
    longitude: origin.longitude,
  };

  if (!isValidCoordinates(coordinates)) {
    return null;
  }

  if (
    origin.mode === "manual" &&
    (origin.manualLatitude !== origin.latitude ||
      origin.manualLongitude !== origin.longitude)
  ) {
    return null;
  }

  return coordinates;
}

function getIntersection<T>(left: readonly T[], right: readonly T[]) {
  return left.filter((item) => right.includes(item));
}

function isHardCandidate(
  destination: Destination,
  preferences: TripPreferences,
) {
  const matchesTripType =
    preferences.tripType === null ||
    destination.tripTypes.includes(preferences.tripType);
  const matchesTransport =
    preferences.transport.length === 0 ||
    getIntersection(destination.transportModes, preferences.transport).length >
      0;

  return matchesTripType && matchesTransport;
}

function parseDateOnly(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (match === null) {
    return null;
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, monthIndex, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== monthIndex ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function shiftUtcDate(date: Date, days: number) {
  const shifted = new Date(date);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted;
}

function addMonthsInRange(
  target: Set<TravelMonth>,
  rangeStart: Date,
  rangeEnd: Date,
) {
  const cursor = new Date(
    Date.UTC(rangeStart.getUTCFullYear(), rangeStart.getUTCMonth(), 1),
  );
  const finalMonth = new Date(
    Date.UTC(rangeEnd.getUTCFullYear(), rangeEnd.getUTCMonth(), 1),
  );

  while (cursor.getTime() <= finalMonth.getTime()) {
    target.add(travelMonths[cursor.getUTCMonth()]);
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
}

function getActiveTravelMonths(timing: TimingPreferences) {
  if (timing.mode === "rough") {
    return timing.month === null ? [] : [timing.month];
  }

  if (timing.mode !== "exact" || timing.exactNights === null) {
    return [];
  }

  const departure = parseDateOnly(timing.departureDate);
  const returnDate = parseDateOnly(timing.returnDate);

  if (
    departure === null ||
    returnDate === null ||
    returnDate.getTime() <= departure.getTime()
  ) {
    return [];
  }

  const activeMonths = new Set<TravelMonth>();

  // Each offset shifts departure and return together, preserving trip duration.
  for (
    let shift = -timing.dateFlexibilityDays;
    shift <= timing.dateFlexibilityDays;
    shift += 1
  ) {
    addMonthsInRange(
      activeMonths,
      shiftUtcDate(departure, shift),
      shiftUtcDate(returnDate, shift),
    );
  }

  return travelMonths.filter((month) => activeMonths.has(month));
}

function isAdjacentMonth(
  selectedMonths: readonly TravelMonth[],
  idealMonths: readonly TravelMonth[],
) {
  return selectedMonths.some((selectedMonth) => {
    const selectedIndex = travelMonths.indexOf(selectedMonth);

    return idealMonths.some((idealMonth) => {
      const idealIndex = travelMonths.indexOf(idealMonth);
      const difference = Math.abs(selectedIndex - idealIndex);
      return difference === 1 || difference === travelMonths.length - 1;
    });
  });
}

function getActiveDuration(preferences: TripPreferences) {
  if (
    preferences.timing.mode === "exact" &&
    preferences.timing.exactNights !== null
  ) {
    const nights = preferences.timing.exactNights;

    if (nights <= 3) {
      return "weekend";
    }

    if (nights <= 5) {
      return "short";
    }

    if (nights <= 8) {
      return "week";
    }

    if (nights <= 14) {
      return "long";
    }

    return "extended";
  }

  return preferences.duration;
}

function getTripDaysForBudget(preferences: TripPreferences) {
  if (
    preferences.timing.mode === "exact" &&
    preferences.timing.exactNights !== null &&
    preferences.timing.exactNights > 0
  ) {
    return preferences.timing.exactNights;
  }

  return preferences.duration === null
    ? null
    : representativeTripDays[preferences.duration];
}

function getBudgetCapacity(preferences: TripPreferences) {
  const perTravellerBudget = preferences.budget.perTraveller;
  const tripDays = getTripDaysForBudget(preferences);

  if (
    perTravellerBudget === null ||
    perTravellerBudget <= 0 ||
    tripDays === null ||
    tripDays <= 0
  ) {
    return null;
  }

  const dailyBudget = perTravellerBudget / tripDays;
  const thresholds = dailyBudgetThresholds[preferences.budget.currency];

  if (dailyBudget <= thresholds.valueMaximum) {
    return "value";
  }

  if (dailyBudget <= thresholds.moderateMaximum) {
    return "moderate";
  }

  return "premium";
}

function scoreTripStyle(
  destination: Destination,
  preferences: TripPreferences,
) {
  const reasons: MatchReason[] = [];
  const tripType = preferences.tripType;

  if (tripType === null || !destination.tripTypes.includes(tripType)) {
    return { points: 0, reasons };
  }

  let points = destinationMatchWeights.tripType;
  reasons.push({
    code: "tripType",
    points: destinationMatchWeights.tripType,
    tripType,
  });

  const tripSubtype = preferences.tripSubtype;

  if (!isTripSubtypeForType(tripType, tripSubtype)) {
    return { points, reasons };
  }

  if (tripSubtype.endsWith("-any")) {
    points += destinationMatchWeights.tripSubtype;
  } else if (destination.tripSubtypes.includes(tripSubtype)) {
    points += destinationMatchWeights.tripSubtype;
    reasons.push({
      code: "tripSubtype",
      points: destinationMatchWeights.tripSubtype,
      tripSubtype,
    });
  }

  return { points, reasons };
}

function scoreBudget(
  destination: Destination,
  preferences: TripPreferences,
) {
  const capacity = getBudgetCapacity(preferences);

  if (capacity === null) {
    return { points: 0, reason: null };
  }

  const levelDifference =
    budgetLevelRank[capacity] - budgetLevelRank[destination.budgetLevel];

  if (levelDifference >= 0) {
    return {
      points: destinationMatchWeights.budget,
      reason: {
        code: "budget",
        points: destinationMatchWeights.budget,
        budgetLevel: destination.budgetLevel,
      } satisfies MatchReason,
    };
  }

  return {
    points: levelDifference === -1 ? 9 : 3,
    reason: null,
  };
}

function scoreTiming(
  destination: Destination,
  preferences: TripPreferences,
) {
  const timingMode = preferences.timing.mode;

  if (timingMode === null) {
    return { points: 0, reason: null };
  }

  if (timingMode === "flexible") {
    return {
      points: destinationMatchWeights.timing,
      reason: {
        code: "timing",
        points: destinationMatchWeights.timing,
        timingMode,
        months: [],
      } satisfies MatchReason,
    };
  }

  const activeMonths = getActiveTravelMonths(preferences.timing);
  const hasIdealMonth =
    getIntersection(activeMonths, destination.idealMonths).length > 0;

  if (hasIdealMonth) {
    return {
      points: destinationMatchWeights.timing,
      reason: {
        code: "timing",
        points: destinationMatchWeights.timing,
        timingMode,
        months: activeMonths,
      } satisfies MatchReason,
    };
  }

  if (isAdjacentMonth(activeMonths, destination.idealMonths)) {
    return {
      points: 8,
      reason: {
        code: "timing",
        points: 8,
        timingMode,
        months: activeMonths,
      } satisfies MatchReason,
    };
  }

  return { points: activeMonths.length > 0 ? 3 : 0, reason: null };
}

function scoreDuration(
  destination: Destination,
  preferences: TripPreferences,
) {
  const duration = getActiveDuration(preferences);

  if (duration === null) {
    return { points: 0, reason: null };
  }

  if (destination.durationPreferences.includes(duration)) {
    return {
      points: destinationMatchWeights.duration,
      reason: {
        code: "duration",
        points: destinationMatchWeights.duration,
        duration,
        exactNights:
          preferences.timing.mode === "exact"
            ? preferences.timing.exactNights
            : null,
      } satisfies MatchReason,
    };
  }

  const selectedIndex = durationOrder.indexOf(duration);
  const isAdjacent = destination.durationPreferences.some(
    (preference) =>
      Math.abs(durationOrder.indexOf(preference) - selectedIndex) === 1,
  );

  return { points: isAdjacent ? 6 : 2, reason: null };
}

function scoreTransport(
  destination: Destination,
  selectedTransports: readonly TransportMode[],
) {
  const matches = getIntersection(
    destination.transportModes,
    selectedTransports,
  );

  if (matches.length === 0) {
    return { points: 0, reason: null };
  }

  return {
    points: destinationMatchWeights.transport,
    reason: {
      code: "transport",
      points: destinationMatchWeights.transport,
      transportModes: matches,
    } satisfies MatchReason,
  };
}

function scoreAccommodation(
  destination: Destination,
  selectedAccommodation: readonly AccommodationType[],
) {
  if (selectedAccommodation.includes("No preference")) {
    return { points: destinationMatchWeights.accommodation, reason: null };
  }

  const selectedTypes = selectedAccommodation.filter(
    (type): type is ActualAccommodation => type !== "No preference",
  );
  const matches = getIntersection(
    destination.accommodationTypes,
    selectedTypes,
  );

  if (matches.length === 0) {
    return { points: 0, reason: null };
  }

  return {
    points: destinationMatchWeights.accommodation,
    reason: {
      code: "accommodation",
      points: destinationMatchWeights.accommodation,
      accommodationTypes: matches,
    } satisfies MatchReason,
  };
}

function scoreTravellerAndPets(
  destination: Destination,
  preferences: TripPreferences,
) {
  const groupType = preferences.travellers.groupType;

  if (groupType === null) {
    return { points: 0, reasons: [] as MatchReason[] };
  }

  let points = 0;
  const reasons: MatchReason[] = [];

  if (destination.travellerGroups.includes(groupType)) {
    points += 3;

    if (
      groupType === "family" &&
      destination.tags.includes("familyFriendly")
    ) {
      reasons.push({ code: "familyFriendly", points: 3 });
    } else {
      reasons.push({
        code: "travellerGroup",
        points: 3,
        travellerGroup: groupType,
      });
    }
  }

  if (preferences.travellers.pets === 0) {
    points += 2;
  } else if (destination.petFriendly) {
    points += 2;
    reasons.push({ code: "petFriendly", points: 2 });
  }

  return { points, reasons };
}

function scoreMeals(
  destination: Destination,
  selectedMeals: readonly MealPreference[],
) {
  if (selectedMeals.includes("No preference")) {
    return { points: destinationMatchWeights.meals, reason: null };
  }

  const selectedPreferences = selectedMeals.filter(
    (preference): preference is ActualMealPreference =>
      preference !== "No preference",
  );
  const matches = getIntersection(
    destination.mealCompatibility,
    selectedPreferences,
  );

  if (matches.length === 0) {
    return { points: 0, reason: null };
  }

  return {
    points: destinationMatchWeights.meals,
    reason: {
      code: "meals",
      points: destinationMatchWeights.meals,
      mealPreferences: matches,
    } satisfies MatchReason,
  };
}

function selectStrongestReasons(reasons: readonly MatchReason[]) {
  return [...reasons]
    .sort(
      (left, right) =>
        right.points - left.points ||
        reasonPriority[left.code] - reasonPriority[right.code],
    )
    .slice(0, 4);
}

function scoreDestination(
  destination: Destination,
  preferences: TripPreferences,
  originCoordinates: Coordinates | null,
): DestinationMatch {
  const tripStyle = scoreTripStyle(destination, preferences);
  const budget = scoreBudget(destination, preferences);
  const timing = scoreTiming(destination, preferences);
  const duration = scoreDuration(destination, preferences);
  const transport = scoreTransport(destination, preferences.transport);
  const accommodation = scoreAccommodation(
    destination,
    preferences.accommodation,
  );
  const travellerAndPets = scoreTravellerAndPets(destination, preferences);
  const meals = scoreMeals(destination, preferences.meals);

  const score =
    tripStyle.points +
    budget.points +
    timing.points +
    duration.points +
    transport.points +
    accommodation.points +
    travellerAndPets.points +
    meals.points;
  const reasons = [
    ...tripStyle.reasons,
    budget.reason,
    timing.reason,
    duration.reason,
    transport.reason,
    accommodation.reason,
    ...travellerAndPets.reasons,
    meals.reason,
  ].filter((reason): reason is MatchReason => reason !== null);

  return {
    destination,
    matchScore: Math.max(0, Math.min(100, Math.round(score))),
    distanceKm:
      originCoordinates === null
        ? null
        : calculateHaversineDistance(originCoordinates, destination),
    reasons: selectStrongestReasons(reasons),
  };
}

function compareDestinationIds(
  left: DestinationMatch,
  right: DestinationMatch,
) {
  if (left.destination.id === right.destination.id) {
    return 0;
  }

  return left.destination.id < right.destination.id ? -1 : 1;
}

export function sortDestinationMatches(
  matches: readonly DestinationMatch[],
  sort: DestinationSort,
) {
  return [...matches].sort((left, right) => {
    if (sort === "closest") {
      const leftDistance = left.distanceKm ?? Number.POSITIVE_INFINITY;
      const rightDistance = right.distanceKm ?? Number.POSITIVE_INFINITY;

      return (
        leftDistance - rightDistance ||
        right.matchScore - left.matchScore ||
        compareDestinationIds(left, right)
      );
    }

    return (
      right.matchScore - left.matchScore ||
      compareDestinationIds(left, right)
    );
  });
}

export function matchDestinations(
  preferences: TripPreferences,
  destinations: readonly Destination[] = demoDestinations,
): MatchResults {
  const hardMatches = destinations.filter((destination) =>
    isHardCandidate(destination, preferences),
  );
  const usedFallback = hardMatches.length === 0;
  const candidates = usedFallback ? destinations : hardMatches;
  const originCoordinates = getActiveOriginCoordinates(preferences);
  const matches = candidates.map((destination) =>
    scoreDestination(destination, preferences, originCoordinates),
  );

  return {
    matches: sortDestinationMatches(matches, "bestMatch"),
    usedFallback,
    hardMatchCount: hardMatches.length,
    hasOriginCoordinates: originCoordinates !== null,
  };
}
