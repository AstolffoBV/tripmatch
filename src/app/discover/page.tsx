"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import Counter from "@/components/discovery/Counter";
import OptionCard from "@/components/discovery/OptionCard";
import ProgressBar from "@/components/discovery/ProgressBar";
import {
  accommodationOptions,
  budgetModeOptions,
  currencies,
  durationOptions,
  mealOptions,
  months,
  originModeOptions,
  timingModeOptions,
  transportOptions,
  travellerGroupOptions,
  tripTypeOptions,
} from "@/data/discoveryOptions";
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
  TravellerGroup,
  TravellerPreferences,
  TripPreferences,
} from "@/types/tripPreferences";

const initialPreferences: TripPreferences = {
  tripType: null,
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
  "rounded-xl bg-black px-6 py-3 font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:bg-white dark:text-black dark:focus-visible:outline-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400";

const secondaryButtonClasses =
  "rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:border-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900 dark:focus-visible:outline-white";

const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black dark:border-gray-700 dark:focus:border-white dark:focus:ring-white";

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
      return preferences.tripType !== null;
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function SummaryItem({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Question {number}
      </p>
      <h2 className="mt-1 font-semibold">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>(1);
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
          locationError: "Location is unavailable in this browser.",
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
        let message = "We could not get your current location.";

        if (error.code === 1) {
          message = "Location permission was denied. You can enter a city instead.";
        } else if (error.code === 2) {
          message = "Your location is currently unavailable. Please try again or enter a city.";
        } else if (error.code === 3) {
          message = "The location request timed out. Please try again or enter a city.";
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

  function handleContinue() {
    if (
      currentStep === "summary" ||
      !isStepComplete(currentStep, preferences)
    ) {
      return;
    }

    const currentIndex = questionSequence.indexOf(currentStep);
    const nextQuestion = questionSequence[currentIndex + 1];
    setCurrentStep(nextQuestion ?? "summary");
  }

  function handleBack() {
    if (currentStep === "summary") {
      setCurrentStep(9);
      return;
    }

    const currentIndex = questionSequence.indexOf(currentStep);
    const previousQuestion = questionSequence[currentIndex - 1];

    if (previousQuestion !== undefined) {
      setCurrentStep(previousQuestion);
    }
  }

  const activeBudgetAmount =
    preferences.budget.mode === "total"
      ? preferences.budget.total
      : preferences.budget.perTraveller;
  const selectedGroupLabel =
    travellerGroupOptions.find((option) => option.value === groupType)?.label ??
    "Not selected";
  const selectedDuration = durationOptions.find(
    (option) => option.value === preferences.duration,
  );
  const currentQuestion = currentStep === "summary" ? 9 : currentStep;
  const canContinue =
    currentStep !== "summary" && isStepComplete(currentStep, preferences);

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={9}
          complete={currentStep === "summary"}
        />

        {currentStep === 1 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-1-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 1
            </p>
            <h1 id="question-1-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              What kind of trip are you looking for?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Choose the experience you want most.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tripTypeOptions.map((tripType) => (
                <OptionCard
                  key={tripType}
                  label={tripType}
                  selected={preferences.tripType === tripType}
                  onClick={() =>
                    setPreferences((previous) => ({
                      ...previous,
                      tripType,
                    }))
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-2-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 2
            </p>
            <h1 id="question-2-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              Who are you travelling with?
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {travellerGroupOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  selected={groupType === option.value}
                  onClick={() => selectTravellerGroup(option.value)}
                />
              ))}
            </div>

            {groupType !== null ? (
              <div className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Counter
                    label="Adults"
                    value={travellers.adults}
                    min={groupType === "friends" ? 2 : 0}
                    fixed={adultsAreFixed}
                    onChange={(value) => changeTravellerValue("adults", value)}
                  />
                  <Counter
                    label="Children"
                    value={travellers.children}
                    min={groupType === "family" ? 1 : 0}
                    fixed={childrenAreFixed}
                    onChange={(value) => changeTravellerValue("children", value)}
                  />
                  <Counter
                    label="Pets"
                    value={travellers.pets}
                    onChange={(value) => changeTravellerValue("pets", value)}
                  />
                  <Counter
                    label={groupType === "family" ? "Suggested bedrooms" : "Rooms"}
                    value={travellers.rooms}
                    min={1}
                    fixed={roomsAndBedsAreFixed}
                    onChange={(value) => changeTravellerValue("rooms", value)}
                  />
                  <Counter
                    label="Beds"
                    value={travellers.beds}
                    min={1}
                    fixed={roomsAndBedsAreFixed}
                    onChange={(value) => changeTravellerValue("beds", value)}
                  />
                </div>

                {groupType === "family" || groupType === "other" ? (
                  <p className="text-sm text-gray-500">
                    Anyone under 18 counts as a child.
                  </p>
                ) : null}

                {groupType === "couple" ? (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                    <p className="font-medium">Sleeping setup</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      1 × Double bed
                    </p>
                  </div>
                ) : null}

                {groupType === "family" ? (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                    <p className="font-medium">Sleeping setup</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      1 × Double bed
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {travellers.children} × Single {travellers.children === 1 ? "bed" : "beds"}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-3-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 3
            </p>
            <h1 id="question-3-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              What&apos;s your budget?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Include transport, accommodation, food and activities for the whole trip.
            </p>
            <p className="mt-4 text-sm font-medium">
              {formatCount(travellerCount, "traveller")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {budgetModeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  selected={preferences.budget.mode === option.value}
                  onClick={() => selectBudgetMode(option.value)}
                />
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_140px]">
              <label>
                <span className="mb-2 block text-sm font-medium">
                  {preferences.budget.mode === "total"
                    ? "Total trip budget"
                    : "Budget per traveller"}
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  inputMode="decimal"
                  value={activeBudgetAmount ?? ""}
                  onChange={(event) => changeBudgetAmount(event.target.value)}
                  className={inputClasses}
                  placeholder="12000"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">Currency</span>
                <select
                  value={preferences.budget.currency}
                  onChange={(event) => changeCurrency(event.target.value as Currency)}
                  className={inputClasses}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {preferences.budget.mode === "total" &&
            preferences.budget.perTraveller !== null &&
            preferences.budget.total !== null &&
            preferences.budget.total > 0 ? (
              <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                ≈ {formatNumber(preferences.budget.perTraveller)} {preferences.budget.currency} average per traveller
              </p>
            ) : null}

            {preferences.budget.mode === "perTraveller" &&
            preferences.budget.total !== null &&
            preferences.budget.perTraveller !== null &&
            preferences.budget.perTraveller > 0 ? (
              <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
                ≈ {formatNumber(preferences.budget.total)} {preferences.budget.currency} estimated total
              </p>
            ) : null}
          </section>
        ) : null}

        {currentStep === 4 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-4-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 4
            </p>
            <h1 id="question-4-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              Where would you be happy to stay?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Choose all accommodation types that work for you.
            </p>

            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
              <p>Your group needs approximately:</p>
              <p className="mt-1 font-semibold">
                {formatCount(travellers.rooms, "bedroom")} · {formatCount(travellers.beds, "bed")}
              </p>
              {travellers.pets > 0 ? (
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Pet-friendly accommodation will be required.
                </p>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {accommodationOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={preferences.accommodation.includes(option)}
                  onClick={() => toggleAccommodation(option)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentStep === 5 ? (
          <section
            ref={stepContentRef}
            tabIndex={-1}
            aria-labelledby="question-5-title"
            className="outline-none"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 5
            </p>
            <h1 id="question-5-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              How would you like to handle meals?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Choose all options that would work for you.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mealOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={preferences.meals.includes(option)}
                  onClick={() => toggleMeal(option)}
                />
              ))}
            </div>
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
              Question 6
            </p>
            <h1 id="question-6-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              When do you want to travel?
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {timingModeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  selected={preferences.timing.mode === option.value}
                  onClick={() => selectTimingMode(option.value)}
                />
              ))}
            </div>

            {preferences.timing.mode === "exact" ? (
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium">Departure date</span>
                    <input
                      type="date"
                      value={preferences.timing.departureDate}
                      onChange={(event) => changeExactDate("departureDate", event.target.value)}
                      className={inputClasses}
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium">Return date</span>
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
                    {formatCount(preferences.timing.exactNights, "night")}
                  </p>
                ) : null}

                {exactDatesAreInvalid ? (
                  <p
                    id="return-date-error"
                    className="mt-3 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    Return date must be later than departure date.
                  </p>
                ) : null}
              </div>
            ) : null}

            {preferences.timing.mode === "rough" ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-medium">Month</span>
                  <select
                    value={preferences.timing.month ?? ""}
                    onChange={(event) => changeTravelMonth(event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select a month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium">Year</span>
                  <select
                    value={preferences.timing.year ?? ""}
                    onChange={(event) => changeTravelYear(event.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select a year</option>
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
                No dates are required. You can choose a preferred duration next.
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
              Question 7
            </p>
            <h1 id="question-7-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              How long would you like to stay?
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {durationOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
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
              Question 8
            </p>
            <h1 id="question-8-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              Where are you travelling from?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              We&apos;ll use this later to estimate realistic travel options and costs.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {originModeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
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
                  <p role="status">Requesting your current location…</p>
                ) : null}

                {preferences.origin.locationStatus === "success" ? (
                  <div role="status">
                    <p className="font-semibold">Current location selected</p>
                    <p className="mt-1 text-gray-500">
                      {preferences.origin.latitude?.toFixed(5)}, {preferences.origin.longitude?.toFixed(5)}
                    </p>
                  </div>
                ) : null}

                {preferences.origin.locationStatus === "error" ? (
                  <p className="text-red-600 dark:text-red-400" role="alert">
                    {preferences.origin.locationError}
                  </p>
                ) : null}

                {preferences.origin.locationStatus === "idle" ? (
                  <p>Click the location option to request browser permission.</p>
                ) : null}
              </div>
            ) : null}

            {preferences.origin.mode === "manual" ? (
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium">City and country</span>
                <input
                  type="text"
                  value={preferences.origin.manualLocation}
                  onChange={(event) => changeManualLocation(event.target.value)}
                  className={inputClasses}
                  placeholder="Timisoara, Romania"
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
              Question 9
            </p>
            <h1 id="question-9-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              How are you willing to get there?
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Choose all transport options you&apos;d consider.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {transportOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={preferences.transport.includes(option)}
                  onClick={() => toggleTransport(option)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {currentStep !== "summary" ? (
          <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
            {currentStep !== 1 ? (
              <button type="button" onClick={handleBack} className={secondaryButtonClasses}>
                Back
              </button>
            ) : null}
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className={primaryButtonClasses}
            >
              Continue
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
              Your base trip preferences
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <SummaryItem number={1} title="Trip type">
                <p>{preferences.tripType}</p>
              </SummaryItem>

              <SummaryItem number={2} title="Travellers">
                <p>{selectedGroupLabel}</p>
                <p>
                  {formatCount(travellers.adults, "adult")} · {formatCount(travellers.children, "child", "children")} · {formatCount(travellers.pets, "pet")}
                </p>
                <p>
                  {formatCount(travellers.rooms, "bedroom")} · {formatCount(travellers.beds, "bed")}
                </p>
              </SummaryItem>

              <SummaryItem number={3} title="Budget">
                <p>
                  Entered as {preferences.budget.mode === "total" ? "total trip budget" : "budget per traveller"}
                </p>
                <p>
                  {formatNumber(preferences.budget.total ?? 0)} {preferences.budget.currency} total
                </p>
                <p>
                  {formatNumber(preferences.budget.perTraveller ?? 0)} {preferences.budget.currency} per traveller
                </p>
              </SummaryItem>

              <SummaryItem number={4} title="Accommodation">
                <p>{preferences.accommodation.join(", ")}</p>
                {travellers.pets > 0 ? <p>Pet-friendly accommodation required</p> : null}
              </SummaryItem>

              <SummaryItem number={5} title="Meals">
                <p>{preferences.meals.join(", ")}</p>
              </SummaryItem>

              <SummaryItem number={6} title="When">
                {preferences.timing.mode === "exact" ? (
                  <p>{preferences.timing.departureDate} to {preferences.timing.returnDate}</p>
                ) : null}
                {preferences.timing.mode === "rough" ? (
                  <p>{preferences.timing.month} {preferences.timing.year}</p>
                ) : null}
                {preferences.timing.mode === "flexible" ? <p>Flexible dates</p> : null}
              </SummaryItem>

              <SummaryItem number={7} title="Duration">
                {hasExactDuration(preferences) ? (
                  <p>{formatCount(preferences.timing.exactNights ?? 0, "night")} (calculated from exact dates)</p>
                ) : (
                  <p>{selectedDuration?.label} — {selectedDuration?.description}</p>
                )}
              </SummaryItem>

              <SummaryItem number={8} title="Origin">
                {preferences.origin.mode === "manual" ? (
                  <p>{preferences.origin.manualLocation.trim()}</p>
                ) : (
                  <p>
                    Current location ({preferences.origin.latitude?.toFixed(5)}, {preferences.origin.longitude?.toFixed(5)})
                  </p>
                )}
              </SummaryItem>

              <SummaryItem number={9} title="Transport">
                <p>{preferences.transport.join(", ")}</p>
              </SummaryItem>
            </div>

            <p className="mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
              Next, TripMatch will use these preferences to evaluate realistic destinations and transport options.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(9)}
                className={secondaryButtonClasses}
              >
                Back
              </button>
              <button type="button" disabled className={primaryButtonClasses}>
                Continue to destination matching
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
