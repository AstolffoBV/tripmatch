"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import DiscoverThemeBackground from "@/components/discovery/DiscoverThemeBackground";
import ProgressBar from "@/components/discovery/ProgressBar";
import QuestionFour from "@/components/discovery/QuestionFour";
import QuestionFourBackground from "@/components/discovery/QuestionFourBackground";
import QuestionFive from "@/components/discovery/QuestionFive";
import QuestionFiveBackground from "@/components/discovery/QuestionFiveBackground";
import QuestionSix from "@/components/discovery/QuestionSix";
import QuestionSixBackground from "@/components/discovery/QuestionSixBackground";
import QuestionSeven from "@/components/discovery/QuestionSeven";
import QuestionSevenBackground from "@/components/discovery/QuestionSevenBackground";
import QuestionEight from "@/components/discovery/QuestionEight";
import QuestionEightBackground from "@/components/discovery/QuestionEightBackground";
import QuestionNine from "@/components/discovery/QuestionNine";
import QuestionNineBackground from "@/components/discovery/QuestionNineBackground";
import QuestionTwo from "@/components/discovery/QuestionTwo";
import QuestionThree from "@/components/discovery/QuestionThree";
import QuestionThreeBackground from "@/components/discovery/QuestionThreeBackground";
import TripTypePanels from "@/components/discovery/TripTypePanels";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  months,
  transportOptions,
} from "@/data/discoveryOptions";
import {
  languageLocales,
  type Translation,
} from "@/data/translations";
import { isTripSubtypeForType } from "@/data/tripTypeThemes";
import { reverseGeocodeLocation } from "@/services/location/client";
import type { LocationResult } from "@/types/location";
import type {
  AccommodationType,
  BudgetMode,
  BudgetPreferences,
  Currency,
  DateFlexibilityDays,
  DiscoveryStep,
  MealPreference,
  OriginMode,
  QuestionNumber,
  TimingMode,
  TransportMode,
  TripSubtypeByType,
  TripType,
  TravellerGroup,
  TravellerPreferences,
  TripPreferences,
} from "@/types/tripPreferences";
import { formatCount, formatMessage } from "@/utils/translations";

const initialPreferences: TripPreferences = {
  tripType: null,
  tripSubtype: null,

  travellers: {
    groupType: null,
    adults: 0,
    children: 0,
    pets: 0,
    rooms: 0,
    beds: 0,
  },

  budget: {
    mode: "total",
    currency: "RON",
    total: null,
    perTraveller: null,
  },

  accommodation: [],
  meals: [],

  timing: {
    mode: null,
    departureDate: "",
    returnDate: "",
    month: null,
    year: null,
    exactNights: null,
    dateFlexibilityDays: 0,
  },

  duration: null,

  origin: {
    mode: null,
    manualLocation: "",
    manualLatitude: null,
    manualLongitude: null,
    resolvedLocation: "",
    latitude: null,
    longitude: null,
    locationStatus: "idle",
    locationError: null,
  },

  transport: [],
};

const primaryButtonClasses =
  "rounded-xl bg-black px-6 py-3 font-semibold text-white transition enabled:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:bg-white dark:text-black dark:focus-visible:outline-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400";

const secondaryButtonClasses =
  "cursor-pointer rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:border-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900 dark:focus-visible:outline-white";

const themedPrimaryButtonClasses =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-white/95 px-6 py-3 font-semibold text-gray-950 shadow-lg shadow-black/15 transition enabled:cursor-pointer enabled:hover:-translate-y-0.5 enabled:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/45 disabled:shadow-none motion-reduce:transform-none";

const themedSecondaryButtonClasses =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-black/20 px-6 py-3 font-semibold text-white/90 shadow-sm backdrop-blur-md transition hover:border-white/45 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none";

const editorialPrimaryButtonClasses =
  "rounded-xl bg-[#123f46] px-6 py-3 font-semibold text-white shadow-sm transition enabled:cursor-pointer enabled:hover:-translate-y-0.5 enabled:hover:bg-[#0d343a] enabled:hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] disabled:cursor-not-allowed disabled:bg-[#cfddda] disabled:text-[#718784] disabled:shadow-none motion-reduce:transform-none dark:bg-[#72d0c9] dark:text-[#092e33] dark:enabled:hover:bg-[#8bddd6] dark:disabled:bg-white/12 dark:disabled:text-white/35";

const editorialSecondaryButtonClasses =
  "cursor-pointer rounded-xl border border-[#bfd3cf] bg-white/55 px-6 py-3 font-semibold text-[#173d42] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#72aaa5] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transform-none dark:border-white/15 dark:bg-white/6 dark:text-[#eaf7f5] dark:hover:border-[#71bbb5] dark:hover:bg-white/10";

const geolocationErrorMessages = {
  unavailableInBrowser: "Location is unavailable in this browser.",
  generic: "We could not get your current location.",
  permissionDenied:
    "Location permission was denied. You can enter a city instead.",
  unavailable:
    "Your location is currently unavailable. Please try again or enter a city.",
  timeout:
    "The location request timed out. Please try again or enter a city.",
  reverseGeocode:
    "We found the coordinates but could not identify the location.",
} as const;

function getTravellerCount(travellers: TravellerPreferences) {
  return travellers.adults + travellers.children;
}

function recalculateBudget(
  budget: BudgetPreferences,
  travellerCount: number,
): BudgetPreferences {
  if (budget.mode === "total") {
    return {
      ...budget,
      perTraveller:
        budget.total !== null && travellerCount > 0
          ? budget.total / travellerCount
          : null,
    };
  }

  return {
    ...budget,
    total:
      budget.perTraveller !== null && travellerCount > 0
        ? budget.perTraveller * travellerCount
        : null,
  };
}

function updateTravellers(
  preferences: TripPreferences,
  travellers: TravellerPreferences,
): TripPreferences {
  return {
    ...preferences,
    travellers,
    budget: recalculateBudget(
      preferences.budget,
      getTravellerCount(travellers),
    ),
  };
}

function getTravellersForGroup(
  groupType: TravellerGroup,
  pets: number,
): TravellerPreferences {
  switch (groupType) {
    case "solo":
      return { groupType, adults: 1, children: 0, pets, rooms: 1, beds: 1 };
    case "couple":
      return { groupType, adults: 2, children: 0, pets, rooms: 1, beds: 1 };
    case "family":
      return { groupType, adults: 2, children: 1, pets, rooms: 2, beds: 2 };
    case "friends":
      return { groupType, adults: 2, children: 0, pets, rooms: 2, beds: 2 };
    case "other":
      return { groupType, adults: 1, children: 0, pets, rooms: 1, beds: 1 };
  }
}

function calculateExactNights(departureDate: string, returnDate: string) {
  if (!departureDate || !returnDate) {
    return null;
  }

  const departureTime = Date.parse(`${departureDate}T00:00:00Z`);
  const returnTime = Date.parse(`${returnDate}T00:00:00Z`);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const nights = (returnTime - departureTime) / millisecondsPerDay;

  return Number.isInteger(nights) && nights > 0 ? nights : null;
}

function getMinimumReturnDate(departureDate: string) {
  if (!departureDate) {
    return undefined;
  }

  const departureTime = Date.parse(`${departureDate}T00:00:00Z`);

  if (Number.isNaN(departureTime)) {
    return undefined;
  }

  const nextDay = new Date(departureTime + 1000 * 60 * 60 * 24);
  return nextDay.toISOString().slice(0, 10);
}

function hasExactDuration(preferences: TripPreferences) {
  return (
    preferences.timing.mode === "exact" &&
    preferences.timing.exactNights !== null
  );
}

function toggleOption<T extends string>(selected: T[], option: T) {
  return selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option];
}

function toggleExclusiveOption<T extends string>(
  selected: T[],
  option: T,
  exclusiveOption: T,
) {
  if (option === exclusiveOption) {
    return selected.includes(option) ? [] : [option];
  }

  const choicesWithoutExclusiveOption = selected.filter(
    (item) => item !== exclusiveOption,
  );

  return choicesWithoutExclusiveOption.includes(option)
    ? choicesWithoutExclusiveOption.filter((item) => item !== option)
    : [...choicesWithoutExclusiveOption, option];
}

function isStepComplete(step: QuestionNumber, preferences: TripPreferences) {
  const travellers = preferences.travellers;

  switch (step) {
    case 1:
      return (
        preferences.tripType !== null &&
        isTripSubtypeForType(
          preferences.tripType,
          preferences.tripSubtype,
        )
      );
    case 2:
      return (
        travellers.groupType !== null &&
        getTravellerCount(travellers) > 0 &&
        travellers.rooms > 0 &&
        travellers.beds > 0
      );
    case 3:
      return (
        preferences.budget.total !== null &&
        preferences.budget.total > 0 &&
        preferences.budget.perTraveller !== null &&
        preferences.budget.perTraveller > 0
      );
    case 4:
      return preferences.accommodation.length > 0;
    case 5:
      return preferences.meals.length > 0;
    case 6:
      if (preferences.timing.mode === "exact") {
        return preferences.timing.exactNights !== null;
      }
      if (preferences.timing.mode === "rough") {
        return (
          preferences.timing.month !== null &&
          preferences.timing.year !== null
        );
      }
      return preferences.timing.mode === "flexible";
    case 7:
      return preferences.duration !== null;
    case 8: {
      const origin = preferences.origin;
      const hasResolvedLocation =
        origin.latitude !== null &&
        Number.isFinite(origin.latitude) &&
        origin.longitude !== null &&
        Number.isFinite(origin.longitude) &&
        origin.resolvedLocation.trim().length > 0;

      if (origin.mode === "currentLocation") {
        return (
          origin.locationStatus === "success" && hasResolvedLocation
        );
      }

      return (
        origin.mode === "manual" &&
        origin.locationStatus === "success" &&
        hasResolvedLocation &&
        origin.manualLocation.trim().length > 0 &&
        origin.manualLatitude === origin.latitude &&
        origin.manualLongitude === origin.longitude
      );
    }
    case 9:
      return preferences.transport.length > 0;
  }
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value);
}

function getLocalizedLocationError(
  message: string | null,
  errors: Translation["discover"]["q8"]["errors"],
) {
  if (message === geolocationErrorMessages.unavailableInBrowser) {
    return errors.unavailableInBrowser;
  }

  if (message === geolocationErrorMessages.permissionDenied) {
    return errors.permissionDenied;
  }

  if (message === geolocationErrorMessages.unavailable) {
    return errors.unavailable;
  }

  if (message === geolocationErrorMessages.timeout) {
    return errors.timeout;
  }

  if (message === geolocationErrorMessages.reverseGeocode) {
    return errors.reverseGeocode;
  }

  return errors.generic;
}

function SummaryItem({
  questionLabel,
  title,
  children,
}: {
  questionLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {questionLabel}
      </p>
      <h2 className="mt-1 font-semibold">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const { language, copy, setLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>(1);
  const [highestVisitedQuestion, setHighestVisitedQuestion] =
    useState<QuestionNumber>(1);
  const [preferences, setPreferences] =
    useState<TripPreferences>(initialPreferences);
  const stepContentRef = useRef<HTMLElement>(null);
  const previousStepRef = useRef<DiscoveryStep>(currentStep);
  const originRequestIdRef = useRef(0);
  const originGeocodingAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (previousStepRef.current !== currentStep) {
      stepContentRef.current?.focus();
    }

    previousStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    return () => originGeocodingAbortRef.current?.abort();
  }, []);

  const travellers = preferences.travellers;
  const travellerCount = getTravellerCount(travellers);
  const skipDurationQuestion = hasExactDuration(preferences);
  const questionSequence: QuestionNumber[] = skipDurationQuestion
    ? [1, 2, 3, 4, 5, 6, 8, 9]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 8 },
    (_, index) => currentYear + index,
  );

  const groupType = travellers.groupType;
  const adultsAreFixed =
    groupType !== "friends" && groupType !== "other";
  const childrenAreFixed =
    groupType !== "family" && groupType !== "other";
  const roomsAndBedsAreFixed = groupType !== "other";
  const exactDatesAreInvalid = Boolean(
    preferences.timing.departureDate &&
      preferences.timing.returnDate &&
      preferences.timing.exactNights === null,
  );
  const minimumReturnDate = getMinimumReturnDate(
    preferences.timing.departureDate,
  );
  const commonCopy = copy.common;
  const discoverCopy = copy.discover;
  const numberLocale = languageLocales[language];

  function questionLabel(number: QuestionNumber) {
    return formatMessage(commonCopy.question, { number });
  }

  function counterLabels(label: string) {
    return {
      automaticLabel: commonCopy.setAutomatically,
      decreaseLabel: formatMessage(commonCopy.decrease, { label }),
      increaseLabel: formatMessage(commonCopy.increase, { label }),
    };
  }

  function selectTripSubtype<Type extends TripType>(
    tripType: Type,
    tripSubtype: TripSubtypeByType[Type],
  ) {
    if (!isTripSubtypeForType(tripType, tripSubtype)) {
      return;
    }

    setPreferences((previous) => ({
      ...previous,
      tripType,
      tripSubtype,
    }));
  }

  function selectTravellerGroup(nextGroupType: TravellerGroup) {
    setPreferences((previous) => {
      if (previous.travellers.groupType === nextGroupType) {
        return previous;
      }

      return updateTravellers(
        previous,
        getTravellersForGroup(nextGroupType, previous.travellers.pets),
      );
    });
  }

  function changeTravellerValue(
    field: "adults" | "children" | "pets" | "rooms" | "beds",
    value: number,
  ) {
    setPreferences((previous) => {
      const nextTravellers = {
        ...previous.travellers,
        [field]: value,
      };

      if (nextTravellers.groupType === "family" && field === "children") {
        nextTravellers.beds = 1 + value;
      }

      if (nextTravellers.groupType === "friends" && field === "adults") {
        nextTravellers.rooms = value;
        nextTravellers.beds = value;
      }

      return updateTravellers(previous, nextTravellers);
    });
  }

  function selectBudgetMode(mode: BudgetMode) {
    setPreferences((previous) => ({
      ...previous,
      budget: { ...previous.budget, mode },
    }));
  }

  function changeBudgetAmount(rawValue: string) {
    const amount = rawValue === "" ? null : Number(rawValue);

    if (amount !== null && !Number.isFinite(amount)) {
      return;
    }

    setPreferences((previous) => {
      const budget = previous.budget;

      if (budget.mode === "total") {
        return {
          ...previous,
          budget: {
            ...budget,
            total: amount,
            perTraveller:
              amount !== null && travellerCount > 0
                ? amount / travellerCount
                : null,
          },
        };
      }

      return {
        ...previous,
        budget: {
          ...budget,
          perTraveller: amount,
          total:
            amount !== null && travellerCount > 0
              ? amount * travellerCount
              : null,
        },
      };
    });
  }

  function changeCurrency(currency: Currency) {
    setPreferences((previous) => ({
      ...previous,
      budget: { ...previous.budget, currency },
    }));
  }

  function toggleAccommodation(option: AccommodationType) {
    setPreferences((previous) => ({
      ...previous,
      accommodation: toggleExclusiveOption(
        previous.accommodation,
        option,
        "No preference",
      ),
    }));
  }

  function toggleMeal(option: MealPreference) {
    setPreferences((previous) => ({
      ...previous,
      meals: toggleExclusiveOption(
        previous.meals,
        option,
        "No preference",
      ),
    }));
  }

  function selectTimingMode(mode: TimingMode) {
    setPreferences((previous) => ({
      ...previous,
      timing: {
        ...previous.timing,
        mode,
        exactNights:
          mode === "exact"
            ? calculateExactNights(
                previous.timing.departureDate,
                previous.timing.returnDate,
              )
            : null,
      },
    }));
  }

  function changeExactDate(
    field: "departureDate" | "returnDate",
    value: string,
  ) {
    setPreferences((previous) => {
      const nextTiming = { ...previous.timing, [field]: value };

      return {
        ...previous,
        timing: {
          ...nextTiming,
          exactNights: calculateExactNights(
            nextTiming.departureDate,
            nextTiming.returnDate,
          ),
        },
      };
    });
  }

  function changeDateFlexibility(days: DateFlexibilityDays) {
    setPreferences((previous) => ({
      ...previous,
      timing: {
        ...previous.timing,
        dateFlexibilityDays: days,
      },
    }));
  }

  function changeTravelMonth(value: string) {
    const month = months.find((item) => item === value) ?? null;

    setPreferences((previous) => ({
      ...previous,
      timing: { ...previous.timing, month },
    }));
  }

  function changeTravelYear(value: string) {
    setPreferences((previous) => ({
      ...previous,
      timing: {
        ...previous.timing,
        year: value === "" ? null : Number(value),
      },
    }));
  }

  function selectOriginMode(mode: OriginMode) {
    if (mode === "currentLocation") {
      requestCurrentLocation();
      return;
    }

    originRequestIdRef.current += 1;
    originGeocodingAbortRef.current?.abort();
    originGeocodingAbortRef.current = null;

    setPreferences((previous) => ({
      ...previous,
      origin: {
        ...previous.origin,
        mode: "manual",
        latitude: previous.origin.manualLatitude,
        longitude: previous.origin.manualLongitude,
        resolvedLocation:
          previous.origin.manualLatitude !== null &&
          previous.origin.manualLongitude !== null
            ? previous.origin.manualLocation
            : "",
        locationStatus:
          previous.origin.manualLatitude !== null &&
          previous.origin.manualLongitude !== null
            ? "success"
            : "idle",
        locationError: null,
      },
    }));
  }

  function requestCurrentLocation() {
    const requestId = originRequestIdRef.current + 1;
    originRequestIdRef.current = requestId;
    originGeocodingAbortRef.current?.abort();
    originGeocodingAbortRef.current = null;

    setPreferences((previous) => ({
      ...previous,
      origin: {
        ...previous.origin,
        mode: "currentLocation",
        latitude: null,
        longitude: null,
        resolvedLocation: "",
        locationStatus: "requesting",
        locationError: null,
      },
    }));

    if (!("geolocation" in navigator)) {
      setPreferences((previous) => {
        if (
          previous.origin.mode !== "currentLocation" ||
          originRequestIdRef.current !== requestId
        ) {
          return previous;
        }

        return {
          ...previous,
          origin: {
            ...previous.origin,
            locationStatus: "error",
            locationError: geolocationErrorMessages.unavailableInBrowser,
          },
        };
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (originRequestIdRef.current !== requestId) {
          return;
        }

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setPreferences((previous) => {
          if (previous.origin.mode !== "currentLocation") {
            return previous;
          }

          return {
            ...previous,
            origin: {
              ...previous.origin,
              latitude,
              longitude,
              locationStatus: "requesting",
              locationError: null,
            },
          };
        });

        const controller = new AbortController();
        originGeocodingAbortRef.current = controller;

        try {
          const result = await reverseGeocodeLocation(
            latitude,
            longitude,
            language,
            controller.signal,
          );

          if (
            result === null ||
            controller.signal.aborted ||
            originRequestIdRef.current !== requestId
          ) {
            if (result === null) {
              throw new Error("No location was returned for these coordinates.");
            }

            return;
          }

          setPreferences((previous) => {
            if (
              previous.origin.mode !== "currentLocation" ||
              originRequestIdRef.current !== requestId
            ) {
              return previous;
            }

            return {
              ...previous,
              origin: {
                ...previous.origin,
                latitude,
                longitude,
                resolvedLocation: result.label,
                locationStatus: "success",
                locationError: null,
              },
            };
          });
        } catch (error) {
          if (
            (error instanceof DOMException && error.name === "AbortError") ||
            originRequestIdRef.current !== requestId
          ) {
            return;
          }

          setPreferences((previous) => {
            if (previous.origin.mode !== "currentLocation") {
              return previous;
            }

            return {
              ...previous,
              origin: {
                ...previous.origin,
                locationStatus: "error",
                locationError: geolocationErrorMessages.reverseGeocode,
              },
            };
          });
        }
      },
      (error) => {
        if (originRequestIdRef.current !== requestId) {
          return;
        }

        let message: string = geolocationErrorMessages.generic;

        if (error.code === 1) {
          message = geolocationErrorMessages.permissionDenied;
        } else if (error.code === 2) {
          message = geolocationErrorMessages.unavailable;
        } else if (error.code === 3) {
          message = geolocationErrorMessages.timeout;
        }

        setPreferences((previous) => {
          if (previous.origin.mode !== "currentLocation") {
            return previous;
          }

          return {
            ...previous,
            origin: {
              ...previous.origin,
              locationStatus: "error",
              locationError: message,
            },
          };
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  function selectManualLocation(location: LocationResult) {
    originRequestIdRef.current += 1;
    originGeocodingAbortRef.current?.abort();
    originGeocodingAbortRef.current = null;

    setPreferences((previous) => {
      if (previous.origin.mode !== "manual") {
        return previous;
      }

      return {
        ...previous,
        origin: {
          ...previous.origin,
          manualLocation: location.label,
          manualLatitude: location.latitude,
          manualLongitude: location.longitude,
          resolvedLocation: location.label,
          latitude: location.latitude,
          longitude: location.longitude,
          locationStatus: "success",
          locationError: null,
        },
      };
    });
  }

  function startManualMapResolution(latitude: number, longitude: number) {
    setPreferences((previous) => {
      if (previous.origin.mode !== "manual") {
        return previous;
      }

      return {
        ...previous,
        origin: {
          ...previous.origin,
          latitude,
          longitude,
          resolvedLocation: "",
          locationStatus: "requesting",
          locationError: null,
        },
      };
    });
  }

  function failManualMapResolution() {
    setPreferences((previous) => {
      if (previous.origin.mode !== "manual") {
        return previous;
      }

      return {
        ...previous,
        origin: {
          ...previous.origin,
          locationStatus: "error",
          locationError: geolocationErrorMessages.reverseGeocode,
        },
      };
    });
  }

  function toggleTransport(option: TransportMode) {
    setPreferences((previous) => ({
      ...previous,
      transport: toggleOption(previous.transport, option),
    }));
  }

  function toggleAllTransports() {
    setPreferences((previous) => {
      const allSelected = transportOptions.every((option) =>
        previous.transport.includes(option),
      );

      return {
        ...previous,
        transport: allSelected ? [] : [...transportOptions],
      };
    });
  }

  function goToStep(nextStep: DiscoveryStep) {
    setCurrentStep(nextStep);

    if (nextStep !== "summary") {
      setHighestVisitedQuestion((currentHighest) =>
        nextStep > currentHighest ? nextStep : currentHighest,
      );
    }
  }

  function handleContinue() {
    if (
      currentStep === "summary" ||
      !isStepComplete(currentStep, preferences)
    ) {
      return;
    }

    const currentIndex = questionSequence.indexOf(currentStep);
    const nextQuestion = questionSequence[currentIndex + 1];
    goToStep(nextQuestion ?? "summary");
  }

  function handleBack() {
    if (currentStep === "summary") {
      goToStep(9);
      return;
    }

    const currentIndex = questionSequence.indexOf(currentStep);
    const previousQuestion = questionSequence[currentIndex - 1];

    if (previousQuestion !== undefined) {
      goToStep(previousQuestion);
    }
  }

  function handleProgressNavigation(question: QuestionNumber) {
    const destination =
      question === 7 && skipDurationQuestion ? 6 : question;

    if (destination !== currentStep) {
      goToStep(destination);
    }
  }

  const activeBudgetAmount =
    preferences.budget.mode === "total"
      ? preferences.budget.total
      : preferences.budget.perTraveller;
  const budgetEquivalentText =
    preferences.budget.mode === "total" &&
    preferences.budget.perTraveller !== null &&
    preferences.budget.total !== null &&
    preferences.budget.total > 0
      ? formatMessage(discoverCopy.q3.averagePerTraveller, {
          amount: formatNumber(
            preferences.budget.perTraveller,
            numberLocale,
          ),
          currency: preferences.budget.currency,
        })
      : preferences.budget.mode === "perTraveller" &&
          preferences.budget.total !== null &&
          preferences.budget.perTraveller !== null &&
          preferences.budget.perTraveller > 0
        ? formatMessage(discoverCopy.q3.estimatedTotal, {
            amount: formatNumber(preferences.budget.total, numberLocale),
            currency: preferences.budget.currency,
          })
        : null;
  const selectedGroupLabel =
    groupType === null
      ? commonCopy.notSelected
      : discoverCopy.q2.groups[groupType];
  const selectedDuration =
    preferences.duration === null
      ? null
      : discoverCopy.q7.options[preferences.duration];
  const currentQuestion = currentStep === "summary" ? 9 : currentStep;
  const canContinue =
    currentStep !== "summary" && isStepComplete(currentStep, preferences);
  const isQuestionOne = currentStep === 1;
  const isQuestionTwo = currentStep === 2;
  const isQuestionThree = currentStep === 3;
  const isQuestionFour = currentStep === 4;
  const isQuestionFive = currentStep === 5;
  const isQuestionSix = currentStep === 6;
  const isQuestionSeven = currentStep === 7;
  const isQuestionEight = currentStep === 8;
  const isQuestionNine = currentStep === 9;
  const durationContextLabel =
    preferences.timing.mode === "rough" &&
    preferences.timing.month !== null &&
    preferences.timing.year !== null
      ? `${discoverCopy.q6.months[preferences.timing.month]} ${preferences.timing.year}`
      : preferences.timing.mode === "flexible"
        ? discoverCopy.q6.flexibleDates
        : null;
  const localizedLocationError =
    preferences.origin.locationError === null
      ? null
      : getLocalizedLocationError(
          preferences.origin.locationError,
          discoverCopy.q8.errors,
        );

  function renderHeader(themed: boolean) {
    return (
      <header
        className={`flex items-center justify-between gap-4 ${
          themed ? "" : "mb-7"
        }`}
      >
        <Link
          href="/"
          aria-label={commonCopy.homeLabel}
          className={`inline-flex cursor-pointer rounded-md text-lg font-semibold tracking-[-0.03em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
            themed
              ? "text-white/95 hover:text-white focus-visible:outline-white"
              : "text-gray-900 hover:text-gray-500 focus-visible:outline-black dark:text-gray-100 dark:hover:text-gray-400 dark:focus-visible:outline-white"
          }`}
        >
          TripMatch
        </Link>

        <LanguageSelector
          value={language}
          label={commonCopy.languageSelectorLabel}
          onChange={setLanguage}
          appearance={themed ? "themed" : "neutral"}
        />
      </header>
    );
  }

  return (
    <main
      className={
        isQuestionOne
          ? "relative isolate min-h-svh overflow-x-clip bg-[#111a1d]"
          : isQuestionTwo
            ? "relative isolate min-h-screen overflow-x-clip bg-[#f4f9f7] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
            : isQuestionThree
              ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
              : isQuestionFour
                ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                : isQuestionFive
                  ? "relative isolate min-h-screen overflow-x-clip bg-[#f6faf7] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                  : isQuestionSix
                    ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                    : isQuestionSeven
                      ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                      : isQuestionEight
                        ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                        : isQuestionNine
                          ? "relative isolate min-h-screen overflow-x-clip bg-[#f5faf8] px-4 py-6 sm:px-6 sm:py-10 dark:bg-[#071a1f]"
                          : "relative isolate min-h-screen px-4 py-10 sm:px-6 sm:py-16"
      }
    >
      {currentStep === 2 ? (
        <DiscoverThemeBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 3 ? (
        <QuestionThreeBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 4 ? (
        <QuestionFourBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 5 ? (
        <QuestionFiveBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 6 ? (
        <QuestionSixBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 7 ? (
        <QuestionSevenBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 8 ? (
        <QuestionEightBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      {currentStep === 9 ? (
        <QuestionNineBackground
          tripType={preferences.tripType}
          tripSubtype={preferences.tripSubtype}
        />
      ) : null}

      <div
        className={
          isQuestionOne
            ? "relative z-10 w-full"
            : isQuestionTwo
              ? "relative z-10 mx-auto max-w-[58rem]"
              : isQuestionThree
                ? "relative z-10 mx-auto max-w-[58rem]"
                : isQuestionFour
                  ? "relative z-10 mx-auto max-w-[58rem]"
                  : isQuestionFive
                    ? "relative z-10 mx-auto max-w-[58rem]"
                    : isQuestionSix
                      ? "relative z-10 mx-auto max-w-[58rem]"
                      : isQuestionSeven
                        ? "relative z-10 mx-auto max-w-[58rem]"
                        : isQuestionEight
                          ? "relative z-10 mx-auto max-w-[58rem]"
                          : isQuestionNine
                            ? "relative z-10 mx-auto max-w-[58rem]"
                            : "relative z-10 mx-auto max-w-3xl"
        }
      >
        {!isQuestionOne ? renderHeader(false) : null}

        {!isQuestionOne ? (
          <ProgressBar
            currentQuestion={currentQuestion}
            highestVisitedQuestion={highestVisitedQuestion}
            exactDurationNights={
              skipDurationQuestion ? preferences.timing.exactNights : null
            }
            onNavigate={handleProgressNavigation}
            complete={currentStep === "summary"}
          />
        ) : null}

        {currentStep === 1 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-1-title"
            className="outline-none"
          >
            <TripTypePanels
              questionLabel={questionLabel(1)}
              copy={discoverCopy.q1}
              shellHeader={renderHeader(true)}
              shellProgress={
                <ProgressBar
                  currentQuestion={currentQuestion}
                  highestVisitedQuestion={highestVisitedQuestion}
                  exactDurationNights={
                    skipDurationQuestion
                      ? preferences.timing.exactNights
                      : null
                  }
                  onNavigate={handleProgressNavigation}
                  appearance="themed"
                />
              }
              shellActions={
                <>
                  <Link href="/" className={themedSecondaryButtonClasses}>
                    {commonCopy.back}
                  </Link>
                  <button
                    type="button"
                    disabled={!canContinue}
                    onClick={handleContinue}
                    className={themedPrimaryButtonClasses}
                  >
                    {commonCopy.continue}
                  </button>
                </>
              }
              selectedTripType={preferences.tripType}
              selectedTripSubtype={preferences.tripSubtype}
              onSelect={selectTripSubtype}
            />
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-2-title"
            className="outline-none"
          >
            <QuestionTwo
              questionLabel={questionLabel(2)}
              copy={discoverCopy.q2}
              travellers={travellers}
              groupType={groupType}
              adultsAreFixed={adultsAreFixed}
              childrenAreFixed={childrenAreFixed}
              roomsAndBedsAreFixed={roomsAndBedsAreFixed}
              counterLabels={counterLabels}
              onSelectGroup={selectTravellerGroup}
              onChangeTraveller={changeTravellerValue}
            />
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-3-title"
            className="outline-none"
          >
            <QuestionThree
              questionLabel={questionLabel(3)}
              copy={discoverCopy.q3}
              budget={preferences.budget}
              activeAmount={activeBudgetAmount}
              travellerLabel={formatCount(
                travellerCount,
                commonCopy.nouns.traveller,
              )}
              equivalentText={budgetEquivalentText}
              onSelectMode={selectBudgetMode}
              onChangeAmount={changeBudgetAmount}
              onChangeCurrency={changeCurrency}
            />
          </section>
        ) : null}

        {currentStep === 4 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-4-title"
            className="outline-none"
          >
            <QuestionFour
              questionLabel={questionLabel(4)}
              copy={discoverCopy.q4}
              selectedAccommodations={preferences.accommodation}
              bedroomLabel={formatCount(
                travellers.rooms,
                commonCopy.nouns.bedroom,
              )}
              bedLabel={formatCount(
                travellers.beds,
                commonCopy.nouns.bed,
              )}
              petFriendlyRequired={travellers.pets > 0}
              onToggle={toggleAccommodation}
            />
          </section>
        ) : null}

        {currentStep === 5 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-5-title"
            className="outline-none"
          >
            <QuestionFive
              questionLabel={questionLabel(5)}
              copy={discoverCopy.q5}
              selectedMeals={preferences.meals}
              onToggle={toggleMeal}
            />
          </section>
        ) : null}

        {currentStep === 6 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-6-title"
            className="outline-none"
          >
            <QuestionSix
              questionLabel={questionLabel(6)}
              copy={discoverCopy.q6}
              timing={preferences.timing}
              availableYears={availableYears}
              minimumReturnDate={minimumReturnDate}
              exactDatesAreInvalid={exactDatesAreInvalid}
              exactNightsLabel={
                preferences.timing.exactNights === null
                  ? null
                  : formatCount(
                      preferences.timing.exactNights,
                      commonCopy.nouns.night,
                    )
              }
              onSelectMode={selectTimingMode}
              onChangeExactDate={changeExactDate}
              onChangeDateFlexibility={changeDateFlexibility}
              onChangeMonth={changeTravelMonth}
              onChangeYear={changeTravelYear}
            />
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-7-title"
            className="outline-none"
          >
            <QuestionSeven
              questionLabel={questionLabel(7)}
              copy={discoverCopy.q7}
              selectedDuration={preferences.duration}
              contextLabel={durationContextLabel}
              onSelect={(duration) =>
                setPreferences((previous) => ({
                  ...previous,
                  duration,
                }))
              }
            />
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-8-title"
            className="outline-none"
          >
            <QuestionEight
              questionLabel={questionLabel(8)}
              copy={discoverCopy.q8}
              language={language}
              origin={preferences.origin}
              localizedLocationError={localizedLocationError}
              onRequestCurrentLocation={requestCurrentLocation}
              onChooseManual={() => selectOriginMode("manual")}
              onSelectManualLocation={selectManualLocation}
              onManualMapMoveStart={startManualMapResolution}
              onManualMapMoveError={failManualMapResolution}
            />
          </section>
        ) : null}

        {currentStep === 9 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-9-title"
            className="outline-none"
          >
            <QuestionNine
              questionLabel={questionLabel(9)}
              copy={discoverCopy.q9}
              selectedTransports={preferences.transport}
              originLabel={preferences.origin.resolvedLocation.trim() || null}
              onToggle={toggleTransport}
              onToggleAll={toggleAllTransports}
            />
          </section>
        ) : null}

        {currentStep !== "summary" && currentStep !== 1 ? (
          <div
            className={`flex flex-wrap gap-4 border-t pt-6 ${
              currentStep === 2 ||
              currentStep === 3 ||
              currentStep === 4 ||
              currentStep === 5 ||
              currentStep === 6 ||
              currentStep === 7 ||
              currentStep === 8 ||
              currentStep === 9
                ? "mt-8 border-[#cfe0dc] dark:border-white/10"
                : "mt-10 border-gray-200 dark:border-gray-800"
            }`}
          >
            <button
              type="button"
              onClick={handleBack}
              className={
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5 ||
                currentStep === 6 ||
                currentStep === 7 ||
                currentStep === 8 ||
                currentStep === 9
                  ? editorialSecondaryButtonClasses
                  : secondaryButtonClasses
              }
            >
              {commonCopy.back}
            </button>
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className={
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5 ||
                currentStep === 6 ||
                currentStep === 7 ||
                currentStep === 8 ||
                currentStep === 9
                  ? editorialPrimaryButtonClasses
                  : primaryButtonClasses
              }
            >
              {commonCopy.continue}
            </button>
          </div>
        ) : null}

        {currentStep === "summary" ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="summary-title"
            className="outline-none"
          >
            <h1 id="summary-title" className="text-3xl font-bold sm:text-4xl">
              {discoverCopy.summary.heading}
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <SummaryItem
                questionLabel={questionLabel(1)}
                title={discoverCopy.summary.categories[1]}
              >
                <p>
                  {preferences.tripType === null
                    ? commonCopy.notSelected
                    : discoverCopy.q1.options[preferences.tripType]}
                </p>
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(2)}
                title={discoverCopy.summary.categories[2]}
              >
                <p>{selectedGroupLabel}</p>
                <p>
                  {formatCount(travellers.adults, commonCopy.nouns.adult)} · {formatCount(travellers.children, commonCopy.nouns.child)} · {formatCount(travellers.pets, commonCopy.nouns.pet)}
                </p>
                <p>
                  {formatCount(travellers.rooms, commonCopy.nouns.bedroom)} · {formatCount(travellers.beds, commonCopy.nouns.bed)}
                </p>
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(3)}
                title={discoverCopy.summary.categories[3]}
              >
                <p>
                  {formatMessage(discoverCopy.summary.enteredAs, {
                    mode: discoverCopy.q3.modes[preferences.budget.mode],
                  })}
                </p>
                <p>
                  {formatMessage(discoverCopy.summary.totalAmount, {
                    amount: formatNumber(
                      preferences.budget.total ?? 0,
                      numberLocale,
                    ),
                    currency: preferences.budget.currency,
                  })}
                </p>
                <p>
                  {formatMessage(discoverCopy.summary.perTravellerAmount, {
                    amount: formatNumber(
                      preferences.budget.perTraveller ?? 0,
                      numberLocale,
                    ),
                    currency: preferences.budget.currency,
                  })}
                </p>
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(4)}
                title={discoverCopy.summary.categories[4]}
              >
                <p>
                  {preferences.accommodation
                    .map((option) => discoverCopy.q4.options[option])
                    .join(", ")}
                </p>
                {travellers.pets > 0 ? (
                  <p>{discoverCopy.summary.petFriendlyRequired}</p>
                ) : null}
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(5)}
                title={discoverCopy.summary.categories[5]}
              >
                <p>
                  {preferences.meals
                    .map((option) => discoverCopy.q5.options[option])
                    .join(", ")}
                </p>
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(6)}
                title={discoverCopy.summary.categories[6]}
              >
                {preferences.timing.mode === "exact" ? (
                  <p>
                    {formatMessage(discoverCopy.summary.dateRange, {
                      departure: preferences.timing.departureDate,
                      return: preferences.timing.returnDate,
                    })}
                  </p>
                ) : null}
                {preferences.timing.mode === "rough" ? (
                  <p>
                    {preferences.timing.month === null
                      ? ""
                      : discoverCopy.q6.months[preferences.timing.month]}{" "}
                    {preferences.timing.year}
                  </p>
                ) : null}
                {preferences.timing.mode === "flexible" ? (
                  <p>{discoverCopy.summary.flexibleDates}</p>
                ) : null}
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(7)}
                title={discoverCopy.summary.categories[7]}
              >
                {hasExactDuration(preferences) ? (
                  <p>
                    {formatCount(
                      preferences.timing.exactNights ?? 0,
                      commonCopy.nouns.night,
                    )}{" "}
                    ({discoverCopy.summary.calculatedFromExactDates})
                  </p>
                ) : (
                  <p>{selectedDuration?.label} — {selectedDuration?.description}</p>
                )}
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(8)}
                title={discoverCopy.summary.categories[8]}
              >
                <p>{preferences.origin.resolvedLocation.trim()}</p>
              </SummaryItem>

              <SummaryItem
                questionLabel={questionLabel(9)}
                title={discoverCopy.summary.categories[9]}
              >
                <p>
                  {preferences.transport
                    .map((option) => discoverCopy.q9.options[option])
                    .join(", ")}
                </p>
              </SummaryItem>
            </div>

            <p className="mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
              {discoverCopy.summary.nextStepNote}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => goToStep(9)}
                className={secondaryButtonClasses}
              >
                {commonCopy.back}
              </button>
              <button type="button" disabled className={primaryButtonClasses}>
                {discoverCopy.summary.continueToMatching}
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
