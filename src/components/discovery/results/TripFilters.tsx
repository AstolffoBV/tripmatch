"use client";

import { useId, useRef, useState } from "react";

import {
  languageLocales,
  type LanguageCode,
  type Translation,
} from "@/data/translations";
import type {
  QuestionNumber,
  TripPreferences,
} from "@/types/tripPreferences";
import { formatCount, formatMessage } from "@/utils/translations";

type TripFiltersProps = {
  preferences: TripPreferences;
  language: LanguageCode;
  copy: Translation;
  onEditQuestion: (question: QuestionNumber) => void;
};

type FilterItem = {
  question: QuestionNumber;
  value: string;
  fullValue?: string;
};

function formatDate(value: string, locale: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function summarizeValues(
  values: readonly string[],
  moreTemplate: string,
  visibleCount = 2,
) {
  const visible = values.slice(0, visibleCount).join(" + ");
  const remaining = values.length - visibleCount;

  return remaining > 0
    ? `${visible} ${formatMessage(moreTemplate, { count: remaining })}`
    : visible;
}

export default function TripFilters({
  preferences,
  language,
  copy,
  onEditQuestion,
}: TripFiltersProps) {
  const [showAllOnMobile, setShowAllOnMobile] = useState(false);
  const filterListId = useId();
  const firstFilterButtonRef = useRef<HTMLButtonElement>(null);
  const resultsCopy = copy.discover.results;
  const locale = languageLocales[language];
  const travellerCount =
    preferences.travellers.adults + preferences.travellers.children;
  const tripLabels = [
    preferences.tripType === null
      ? copy.common.notSelected
      : copy.discover.q1.options[preferences.tripType],
    preferences.tripType !== null && preferences.tripSubtype !== null
      ? copy.discover.q1.subtypes[preferences.tripSubtype]
      : null,
  ].filter((value): value is string => value !== null);
  const travellerLabels = [
    preferences.travellers.groupType === null
      ? copy.common.notSelected
      : copy.discover.q2.groups[preferences.travellers.groupType],
    formatCount(travellerCount, copy.common.nouns.traveller),
    preferences.travellers.pets > 0
      ? formatCount(preferences.travellers.pets, copy.common.nouns.pet)
      : null,
  ].filter((value): value is string => value !== null);
  const budgetAmount =
    preferences.budget.mode === "total"
      ? preferences.budget.total
      : preferences.budget.perTraveller;
  const budgetTemplate =
    preferences.budget.mode === "total"
      ? resultsCopy.filters.totalBudget
      : resultsCopy.filters.perTravellerBudget;
  const budgetLabel = formatMessage(budgetTemplate, {
    amount: new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(budgetAmount ?? 0),
    currency: preferences.budget.currency,
  });
  const accommodationLabels = preferences.accommodation.map(
    (option) => copy.discover.q4.options[option],
  );
  const mealLabels = preferences.meals.map(
    (option) => copy.discover.q5.options[option],
  );
  const transportLabels = preferences.transport.map(
    (option) => copy.discover.q9.options[option],
  );

  let timingLabel = copy.common.notSelected;

  if (preferences.timing.mode === "exact") {
    timingLabel = `${formatDate(
      preferences.timing.departureDate,
      locale,
    )} – ${formatDate(preferences.timing.returnDate, locale)}`;
  } else if (
    preferences.timing.mode === "rough" &&
    preferences.timing.month !== null
  ) {
    timingLabel = `${copy.discover.q6.months[preferences.timing.month]} ${
      preferences.timing.year ?? ""
    }`.trim();
  } else if (preferences.timing.mode === "flexible") {
    timingLabel = copy.discover.q6.flexibleDates;
  }

  const durationLabel =
    preferences.timing.mode === "exact" &&
    preferences.timing.exactNights !== null
      ? formatCount(
          preferences.timing.exactNights,
          copy.common.nouns.night,
        )
      : preferences.duration === null
        ? copy.common.notSelected
        : `${copy.discover.q7.options[preferences.duration].label} · ${
            copy.discover.q7.options[preferences.duration].description
          }`;
  const origin = preferences.origin.resolvedLocation.trim();
  const originLabel = formatMessage(resultsCopy.filters.from, {
    location: origin || copy.common.notSelected,
  });
  const filters: FilterItem[] = [
    { question: 1, value: tripLabels.join(" · ") },
    { question: 2, value: travellerLabels.join(" · ") },
    { question: 3, value: budgetLabel },
    {
      question: 4,
      value: summarizeValues(
        accommodationLabels,
        resultsCopy.filters.more,
      ),
      fullValue: accommodationLabels.join(", "),
    },
    {
      question: 5,
      value: summarizeValues(mealLabels, resultsCopy.filters.more),
      fullValue: mealLabels.join(", "),
    },
    { question: 6, value: timingLabel },
    { question: 7, value: durationLabel },
    { question: 8, value: originLabel, fullValue: originLabel },
    {
      question: 9,
      value: summarizeValues(transportLabels, resultsCopy.filters.more),
      fullValue: transportLabels.join(", "),
    },
  ];

  return (
    <aside
      aria-labelledby="trip-filters-title"
      className="mt-7 min-w-0 rounded-[1.5rem] border border-[#c4dcd8] bg-white/68 p-4 shadow-[0_16px_42px_rgba(18,70,72,0.08)] backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.055] sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#537075] dark:text-[#aac5c4]">
            {resultsCopy.filters.regionLabel}
          </p>
          <h2
            id="trip-filters-title"
            className="mt-1 break-words text-xl font-bold tracking-[-0.03em] text-[#12383e] dark:text-[#f0faf8]"
          >
            {resultsCopy.filters.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
              setShowAllOnMobile(true);

              window.requestAnimationFrame(() => {
              firstFilterButtonRef.current?.focus();
            });
          }}
          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#bfd3cf] bg-white/58 px-4 py-2.5 text-center text-sm leading-5 font-semibold text-[#173d42] shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 hover:border-[#72aaa5] hover:bg-white motion-reduce:transform-none motion-reduce:transition-none dark:border-white/15 dark:bg-white/6 dark:text-[#eaf7f5] dark:hover:border-[#71bbb5] dark:hover:bg-white/10 dark:focus-visible:outline-[#83d9d2] sm:w-auto"
        >
          {resultsCopy.filters.editPreferences}
        </button>
      </div>

      <ul id={filterListId} className="mt-4 flex min-w-0 flex-wrap gap-2">
        {filters.map((filter, index) => {
          const category = resultsCopy.filters.categories[filter.question];
          const fullValue = filter.fullValue ?? filter.value;
          const mobileVisibility =
            index < 3 || showAllOnMobile ? "inline-flex" : "hidden sm:inline-flex";

          return (
            <li
              key={filter.question}
              className={`${mobileVisibility} max-w-full min-w-0`}
            >
              <button
                ref={index === 0 ? firstFilterButtonRef : undefined}
                type="button"
                title={fullValue}
                aria-label={`${resultsCopy.filters.editPreferences}: ${category}: ${fullValue}`}
                onClick={() => onEditQuestion(filter.question)}
                className="inline-flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#c7dcd8] bg-[#f8fcfb]/88 px-3 py-2 text-sm text-[#244e52] shadow-[0_4px_14px_rgba(26,77,79,0.04)] transition hover:-translate-y-0.5 hover:border-[#72aaa5] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transform-none motion-reduce:transition-none dark:border-white/12 dark:bg-white/[0.06] dark:text-[#dceceb] dark:hover:border-[#71bbb5] dark:hover:bg-white/[0.09] dark:focus-visible:outline-[#83d9d2] sm:min-h-10"
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-[#388786] dark:bg-[#74d1ca]"
              />

              <span className="shrink-0 text-[0.64rem] font-bold uppercase tracking-[0.13em] text-[#628084] dark:text-[#a7c3c1]">
                {category}
              </span>

              <span aria-hidden="true" className="text-[#8ca8a5]">
                ·
              </span>

              <span className="min-w-0 truncate font-semibold">
                {filter.value}
              </span>

              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-0.5 size-3.5 shrink-0 text-[#5f8888]"
              >
                <path
                  d="m6 3.5 4.5 4.5L6 12.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </button>
          </li>
        );
        })}
      </ul>

      <button
        type="button"
        aria-expanded={showAllOnMobile}
        aria-controls={filterListId}
        onClick={() => setShowAllOnMobile((current) => !current)}
        className="mt-3 inline-flex min-h-11 max-w-full cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-left text-sm font-semibold text-[#286a6d] transition hover:text-[#123f46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transition-none dark:text-[#83d5cf] dark:hover:text-[#b2eee9] dark:focus-visible:outline-[#83d9d2] sm:hidden"
      >
        <span
          aria-hidden="true"
          className={`text-lg leading-none transition-transform motion-reduce:transition-none ${
            showAllOnMobile ? "rotate-45" : ""
          }`}
        >
          +
        </span>
        {showAllOnMobile
          ? resultsCopy.filters.hide
          : formatMessage(resultsCopy.filters.showAll, {
              count: filters.length,
            })}
      </button>
    </aside>
  );
}
