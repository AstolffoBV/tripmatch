import type {
  AccommodationType,
  DurationPreference,
  MealPreference,
  TransportMode,
  TravelMonth,
  TravellerGroup,
  TripSubtype,
  TripType,
} from "@/types/tripPreferences";

export type DestinationId =
  | "innsbruck"
  | "salzburg"
  | "vienna"
  | "prague"
  | "budapest"
  | "ljubljana"
  | "bled"
  | "brasov"
  | "zakopane"
  | "munich"
  | "dubrovnik"
  | "split"
  | "barcelona"
  | "lisbon"
  | "amsterdam"
  | "krakow"
  | "venice"
  | "nice"
  | "interlaken"
  | "edinburgh";

export type CountryCode =
  | "AT"
  | "CH"
  | "CZ"
  | "DE"
  | "ES"
  | "FR"
  | "GB"
  | "HR"
  | "HU"
  | "IT"
  | "NL"
  | "PL"
  | "PT"
  | "RO"
  | "SI";

export type BudgetLevel = "value" | "moderate" | "premium";

export type DestinationTag =
  | "alpine"
  | "architecture"
  | "arts"
  | "beach"
  | "coastal"
  | "events"
  | "familyFriendly"
  | "food"
  | "historic"
  | "lakes"
  | "nature"
  | "nightlife"
  | "outdoors"
  | "railFriendly"
  | "romantic";

export type DestinationVisual =
  | "alpine"
  | "coastal"
  | "heritage"
  | "city"
  | "lake"
  | "nightlife";

export type Destination = {
  id: DestinationId;
  city: string;
  countryCode: CountryCode;
  latitude: number;
  longitude: number;
  tripTypes: readonly TripType[];
  tripSubtypes: readonly TripSubtype[];
  durationPreferences: readonly DurationPreference[];
  transportModes: readonly TransportMode[];
  accommodationTypes: readonly Exclude<
    AccommodationType,
    "No preference"
  >[];
  mealCompatibility: readonly Exclude<MealPreference, "No preference">[];
  travellerGroups: readonly TravellerGroup[];
  petFriendly: boolean;
  budgetLevel: BudgetLevel;
  idealMonths: readonly TravelMonth[];
  tags: readonly DestinationTag[];
  visual: DestinationVisual;
};

export type MatchReasonCode =
  | "tripType"
  | "tripSubtype"
  | "budget"
  | "timing"
  | "duration"
  | "transport"
  | "accommodation"
  | "travellerGroup"
  | "familyFriendly"
  | "petFriendly"
  | "meals";

type MatchReasonBase<Code extends MatchReasonCode> = {
  code: Code;
  points: number;
};

export type MatchReason =
  | (MatchReasonBase<"tripType"> & { tripType: TripType })
  | (MatchReasonBase<"tripSubtype"> & { tripSubtype: TripSubtype })
  | (MatchReasonBase<"budget"> & { budgetLevel: BudgetLevel })
  | (MatchReasonBase<"timing"> & {
      timingMode: "exact" | "rough" | "flexible";
      months: readonly TravelMonth[];
    })
  | (MatchReasonBase<"duration"> & {
      duration: DurationPreference;
      exactNights: number | null;
    })
  | (MatchReasonBase<"transport"> & {
      transportModes: readonly TransportMode[];
    })
  | (MatchReasonBase<"accommodation"> & {
      accommodationTypes: readonly Exclude<
        AccommodationType,
        "No preference"
      >[];
    })
  | (MatchReasonBase<"travellerGroup"> & { travellerGroup: TravellerGroup })
  | MatchReasonBase<"familyFriendly">
  | MatchReasonBase<"petFriendly">
  | (MatchReasonBase<"meals"> & {
      mealPreferences: readonly Exclude<MealPreference, "No preference">[];
    });

export type DestinationMatch = {
  destination: Destination;
  matchScore: number;
  distanceKm: number | null;
  reasons: readonly MatchReason[];
};

export type MatchResults = {
  matches: readonly DestinationMatch[];
  usedFallback: boolean;
  hardMatchCount: number;
  hasOriginCoordinates: boolean;
};

export type DestinationSort = "bestMatch" | "closest";
