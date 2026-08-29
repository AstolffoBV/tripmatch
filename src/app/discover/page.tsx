"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import DiscoverThemeBackground from "@/components/discovery/DiscoverThemeBackground";
import OptionCard from "@/components/discovery/OptionCard";
import ProgressBar from "@/components/discovery/ProgressBar";
import QuestionFour from "@/components/discovery/QuestionFour";
import QuestionFourBackground from "@/components/discovery/QuestionFourBackground";
import QuestionFive from "@/components/discovery/QuestionFive";
import QuestionFiveBackground from "@/components/discovery/QuestionFiveBackground";
import QuestionTwo from "@/components/discovery/QuestionTwo";
import QuestionThree from "@/components/discovery/QuestionThree";
import QuestionThreeBackground from "@/components/discovery/QuestionThreeBackground";
import TripTypePanels from "@/components/discovery/TripTypePanels";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  durationOptions,
  months,
  originModeOptions,
  timingModeOptions,
  transportOptions,
} from "@/data/discoveryOptions";
import {
  languageLocales,
  type Translation,
} from "@/data/translations";
import { isTripSubtypeForType } from "@/data/tripTypeThemes";
import type {
  AccommodationType,
  BudgetMode,
  BudgetPreferences,
  Currency,
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
  },
  duration: null,
  origin: {
    mode: null,
    manualLocation: "",
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

const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black dark:border-gray-700 dark:focus:border-white dark:focus:ring-white";

const geolocationErrorMessages = {
  unavailableInBrowser: "Location is unavailable in this browser.",
  generic: "We could not get your current location.",
  permissionDenied:
    "Location permission was denied. You can enter a city instead.",
  unavailable:
    "Your location is currently unavailable. Please try again or enter a city.",
  timeout:
    "The location request timed out. Please try again or enter a city.",
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
    case 8:
      if (preferences.origin.mode === "currentLocation") {
        return (
          preferences.origin.locationStatus === "success" &&
          preferences.origin.latitude !== null &&
          preferences.origin.longitude !== null
        );
      }
      return (
        preferences.origin.mode === "manual" &&
        preferences.origin.manualLocation.trim().length > 0
      );
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

  useEffect(() => {
    if (previousStepRef.current !== currentStep) {
      stepContentRef.current?.focus();
    }

    previousStepRef.current = currentStep;
  }, [currentStep]);

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
    setPreferences((previous) => ({
      ...previous,
      origin: { ...previous.origin, mode },
    }));
  }

  function requestCurrentLocation() {
    setPreferences((previous) => ({
      ...previous,
      origin: {
        ...previous.origin,
        mode: "currentLocation",
        latitude: null,
        longitude: null,
        locationStatus: "requesting",
        locationError: null,
      },
    }));

    if (!("geolocation" in navigator)) {
      setPreferences((previous) => ({
        ...previous,
        origin: {
          ...previous.origin,
          locationStatus: "error",
          locationError: geolocationErrorMessages.unavailableInBrowser,
        },
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPreferences((previous) => ({
          ...previous,
          origin: {
            ...previous.origin,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            locationStatus: "success",
            locationError: null,
          },
        }));
      },
      (error) => {
        let message: string = geolocationErrorMessages.generic;

        if (error.code === 1) {
          message = geolocationErrorMessages.permissionDenied;
        } else if (error.code === 2) {
          message = geolocationErrorMessages.unavailable;
        } else if (error.code === 3) {
          message = geolocationErrorMessages.timeout;
        }

        setPreferences((previous) => ({
          ...previous,
          origin: {
            ...previous.origin,
            locationStatus: "error",
            locationError: message,
          },
        }));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  function changeManualLocation(manualLocation: string) {
    setPreferences((previous) => ({
      ...previous,
      origin: {
        ...previous.origin,
        mode: "manual",
        manualLocation,
      },
    }));
  }

  function toggleTransport(option: TransportMode) {
    setPreferences((previous) => ({
      ...previous,
      transport: toggleOption(previous.transport, option),
    }));
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
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {questionLabel(6)}
            </p>
            <h1 id="question-6-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              {discoverCopy.q6.heading}
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {timingModeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={discoverCopy.q6.modes[option.value]}
                  selected={preferences.timing.mode === option.value}
                  onClick={() => selectTimingMode(option.value)}
                />
              ))}
            </div>

            {preferences.timing.mode === "exact" ? (
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      {discoverCopy.q6.departureDate}
                    </span>
                    <input
                      type="date"
                      value={preferences.timing.departureDate}
                      onChange={(event) => changeExactDate("departureDate", event.target.value)}
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      {discoverCopy.q6.returnDate}
                    </span>
                    <input
                      type="date"
                      min={minimumReturnDate}
                      value={preferences.timing.returnDate}
                      onChange={(event) => changeExactDate("returnDate", event.target.value)}
                      aria-invalid={exactDatesAreInvalid}
                      aria-describedby={
                        exactDatesAreInvalid ? "return-date-error" : undefined
                      }
                      className={inputClasses}
                    />
                  </label>
                </div>

                {preferences.timing.exactNights !== null ? (
                  <p className="mt-4 rounded-xl bg-gray-50 p-4 font-semibold dark:bg-gray-900">
                    {formatCount(
                      preferences.timing.exactNights,
                      commonCopy.nouns.night,
                    )}
                  </p>
                ) : null}

                {exactDatesAreInvalid ? (
                  <p
                    id="return-date-error"
                    className="mt-3 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {discoverCopy.q6.returnDateError}
                  </p>
                ) : null}
              </div>
            ) : null}

            {preferences.timing.mode === "rough" ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-medium">
                    {discoverCopy.q6.month}
                  </span>
                  <select
                    value={preferences.timing.month ?? ""}
                    onChange={(event) => changeTravelMonth(event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">{discoverCopy.q6.selectMonth}</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {discoverCopy.q6.months[month]}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium">
                    {discoverCopy.q6.year}
                  </span>
                  <select
                    value={preferences.timing.year ?? ""}
                    onChange={(event) => changeTravelYear(event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">{discoverCopy.q6.selectYear}</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : null}

            {preferences.timing.mode === "flexible" ? (
              <p className="mt-8 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                {discoverCopy.q6.flexibleHelper}
              </p>
            ) : null}
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-7-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {questionLabel(7)}
            </p>
            <h1 id="question-7-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              {discoverCopy.q7.heading}
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {durationOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={discoverCopy.q7.options[option.value].label}
                  description={
                    discoverCopy.q7.options[option.value].description
                  }
                  selected={preferences.duration === option.value}
                  onClick={() =>
                    setPreferences((previous) => ({
                      ...previous,
                      duration: option.value,
                    }))
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-8-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {questionLabel(8)}
            </p>
            <h1 id="question-8-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              {discoverCopy.q8.heading}
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              {discoverCopy.q8.subtitle}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {originModeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={discoverCopy.q8.modes[option.value]}
                  selected={preferences.origin.mode === option.value}
                  disabled={
                    option.value === "currentLocation" &&
                    preferences.origin.locationStatus === "requesting"
                  }
                  onClick={
                    option.value === "currentLocation"
                      ? requestCurrentLocation
                      : () => selectOriginMode(option.value)
                  }
                />
              ))}
            </div>

            {preferences.origin.mode === "currentLocation" ? (
              <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                {preferences.origin.locationStatus === "requesting" ? (
                  <p role="status">{discoverCopy.q8.requestingLocation}</p>
                ) : null}

                {preferences.origin.locationStatus === "success" ? (
                  <div role="status">
                    <p className="font-semibold">
                      {discoverCopy.q8.currentLocationSelected}
                    </p>
                    <p className="mt-1 text-gray-500">
                      {preferences.origin.latitude?.toFixed(5)}, {preferences.origin.longitude?.toFixed(5)}
                    </p>
                  </div>
                ) : null}

                {preferences.origin.locationStatus === "error" ? (
                  <p className="text-red-600 dark:text-red-400" role="alert">
                    {getLocalizedLocationError(
                      preferences.origin.locationError,
                      discoverCopy.q8.errors,
                    )}
                  </p>
                ) : null}

                {preferences.origin.locationStatus === "idle" ? (
                  <p>{discoverCopy.q8.locationPermissionHelper}</p>
                ) : null}
              </div>
            ) : null}

            {preferences.origin.mode === "manual" ? (
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium">
                  {discoverCopy.q8.cityAndCountry}
                </span>
                <input
                  type="text"
                  value={preferences.origin.manualLocation}
                  onChange={(event) => changeManualLocation(event.target.value)}
                  className={inputClasses}
                  placeholder={discoverCopy.q8.manualPlaceholder}
                />
              </label>
            ) : null}
          </section>
        ) : null}

        {currentStep === 9 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-9-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {questionLabel(9)}
            </p>
            <h1 id="question-9-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              {discoverCopy.q9.heading}
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              {discoverCopy.q9.subtitle}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {transportOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={discoverCopy.q9.options[option]}
                  selected={preferences.transport.includes(option)}
                  onClick={() => toggleTransport(option)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentStep !== "summary" && currentStep !== 1 ? (
          <div
            className={`flex flex-wrap gap-4 border-t pt-6 ${
              currentStep === 2 ||
              currentStep === 3 ||
              currentStep === 4 ||
              currentStep === 5
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
                currentStep === 5
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
                currentStep === 5
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
                {preferences.origin.mode === "manual" ? (
                  <p>{preferences.origin.manualLocation.trim()}</p>
                ) : (
                  <p>
                    {formatMessage(discoverCopy.summary.currentLocation, {
                      coordinates: `${preferences.origin.latitude?.toFixed(5)}, ${preferences.origin.longitude?.toFixed(5)}`,
                    })}
                  </p>
                )}
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
