"use client";

import { useMemo, useState } from "react";

import DestinationCard from "@/components/discovery/results/DestinationCard";
import TripFilters from "@/components/discovery/results/TripFilters";
import { demoDestinations } from "@/data/destinations";
import {
  languageLocales,
  type LanguageCode,
  type Translation,
} from "@/data/translations";
import type {
  DestinationId,
  DestinationMatch,
  DestinationSort,
  MatchReason,
} from "@/types/destination";
import type { TripPreferences } from "@/types/tripPreferences";
import {
  matchDestinations,
  sortDestinationMatches,
} from "@/utils/destinationMatching";
import { formatCount, formatMessage } from "@/utils/translations";

type DestinationResultsProps = {
  preferences: TripPreferences;
  language: LanguageCode;
  copy: Translation;
  onBack: () => void;
  onEditQuestion: (question: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => void;
};

function localizeReason(
  reason: MatchReason,
  copy: Translation,
) {
  const reasonTemplate = copy.discover.results.reasons[reason.code];

  switch (reason.code) {
    case "tripType":
      return formatMessage(reasonTemplate, {
        tripType: copy.discover.q1.options[reason.tripType],
      });
    case "tripSubtype":
      return formatMessage(reasonTemplate, {
        tripSubtype: copy.discover.q1.subtypes[reason.tripSubtype],
      });
    case "duration": {
      const duration =
        reason.exactNights === null
          ? copy.discover.q7.options[reason.duration].description
          : formatCount(reason.exactNights, copy.common.nouns.night);

      return formatMessage(reasonTemplate, { duration });
    }
    case "transport":
      return formatMessage(reasonTemplate, {
        transport: reason.transportModes
          .map((mode) => copy.discover.q9.options[mode])
          .join(", "),
      });
    case "travellerGroup":
      return formatMessage(reasonTemplate, {
        group: copy.discover.q2.groups[reason.travellerGroup],
      });
    default:
      return reasonTemplate;
  }
}

function strongestReasons(match: DestinationMatch, copy: Translation) {
  return [...match.reasons]
    .sort((left, right) => right.points - left.points)
    .slice(0, 4)
    .map((reason) => localizeReason(reason, copy));
}

export default function DestinationResults({
  preferences,
  language,
  copy,
  onBack,
  onEditQuestion,
}: DestinationResultsProps) {
  const [sort, setSort] = useState<DestinationSort>("bestMatch");
  const [expandedDestination, setExpandedDestination] =
    useState<DestinationId | null>(null);
  const matchResults = useMemo(
    () => matchDestinations(preferences, demoDestinations),
    [preferences],
  );
  const hasDistance = matchResults.matches.some(
    (match) => match.distanceKm !== null,
  );
  const effectiveSort = hasDistance ? sort : "bestMatch";
  const sortedMatches = useMemo(
    () => sortDestinationMatches(matchResults.matches, effectiveSort),
    [effectiveSort, matchResults.matches],
  );
  const resultsCopy = copy.discover.results;
  const countForms = matchResults.usedFallback
    ? resultsCopy.alternativeCount
    : resultsCopy.resultCount;
  const resultCountLabel = formatMessage(
    sortedMatches.length === 1 ? countForms.one : countForms.other,
    { count: sortedMatches.length },
  );
  const distanceFormatter = new Intl.NumberFormat(languageLocales[language], {
    maximumFractionDigits: 0,
  });

  return (
    <div className="relative min-w-0 text-[#102f35] dark:text-[#edf8f7]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <header className="max-w-[58rem]">
          <h1
            id="results-title"
            className="max-w-[58rem] break-words text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.5rem] dark:text-[#f4fbfa]"
          >
            {resultsCopy.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
            {resultsCopy.subtitle}
          </p>
          <p className="mt-4 inline-flex max-w-full rounded-full border border-[#bddbd6] bg-[#e9f6f2]/78 px-3.5 py-2 text-sm leading-5 font-semibold break-words text-[#315e62] shadow-sm backdrop-blur-sm dark:border-[#63aaa4]/25 dark:bg-[#10383d]/62 dark:text-[#c9e4e1]">
            {resultCountLabel}
          </p>
        </header>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#bfd3cf] bg-white/55 px-4 py-2.5 text-sm font-semibold text-[#173d42] shadow-sm backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 hover:border-[#72aaa5] hover:bg-white motion-reduce:transform-none motion-reduce:transition-none dark:border-white/15 dark:bg-white/6 dark:text-[#eaf7f5] dark:hover:border-[#71bbb5] dark:hover:bg-white/10 dark:focus-visible:outline-[#83d9d2] sm:w-fit"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4">
            <path
              d="M10 3.5 5.5 8l4.5 4.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
          {copy.common.back}
        </button>
      </div>

      <TripFilters
        preferences={preferences}
        language={language}
        copy={copy}
        onEditQuestion={onEditQuestion}
      />

      {matchResults.usedFallback ? (
        <div
          role="status"
          className="mt-5 rounded-[1.2rem] border border-[#c7dcd8] bg-[#edf7f4]/82 px-4 py-3 text-sm leading-6 text-[#416368] dark:border-white/12 dark:bg-white/[0.055] dark:text-[#bdd2d0]"
        >
          <span className="font-semibold text-[#173f44] dark:text-[#e8f6f4]">
            {resultsCopy.noExactMatches}
          </span>
        </div>
      ) : null}

      <section aria-labelledby="recommended-destinations-title" className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2
              id="recommended-destinations-title"
              className="break-words text-2xl font-bold tracking-[-0.035em] text-[#12383e] dark:text-[#f0faf8]"
            >
              {resultsCopy.recommendedDestinations}
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-[#607b7f] dark:text-[#9eb9b7]">
              {resultsCopy.prototypeNote}
            </p>
          </div>

          <label className="flex w-full flex-col gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-[#537075] dark:text-[#aac5c4] sm:w-auto">
            {resultsCopy.sort.label}
            <span className="relative block">
              <select
                value={effectiveSort}
                onChange={(event) =>
                  setSort(event.target.value as DestinationSort)
                }
                className="min-h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#bfd3cf] bg-white/75 py-2.5 pr-10 pl-4 text-sm font-semibold normal-case tracking-normal text-[#173d42] shadow-sm transition hover:border-[#72aaa5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transition-none dark:border-white/15 dark:bg-[#123238]/85 dark:text-[#eaf7f5] dark:focus-visible:outline-[#83d9d2] sm:min-w-44"
              >
                <option
                  value="bestMatch"
                  className="bg-white text-[#173d42] dark:bg-[#102f35] dark:text-[#edf8f7]"
                >
                  {resultsCopy.sort.bestMatch}
                </option>
                {hasDistance ? (
                  <option
                    value="closest"
                    className="bg-white text-[#173d42] dark:bg-[#102f35] dark:text-[#edf8f7]"
                  >
                    {resultsCopy.sort.closest}
                  </option>
                ) : null}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#4c7475] dark:text-[#b9d2cf]"
              >
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
          </label>
        </div>

        <ol className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {sortedMatches.map((match) => {
            const destinationCopy = resultsCopy.destinations[match.destination.id];
            const country = resultsCopy.countries[match.destination.countryCode];
            const distance =
              match.distanceKm === null
                ? null
                : distanceFormatter.format(Math.round(match.distanceKm));
            const distanceLabel =
              distance === null
                ? null
                : formatMessage(resultsCopy.card.distance, { distance });
            const distanceAccessibleLabel =
              distance === null
                ? null
                : formatMessage(resultsCopy.card.distanceAccessible, {
                    distance,
                  });
            const matchLabel = formatMessage(resultsCopy.card.match, {
              score: match.matchScore,
            });
            const tags = match.destination.tags
              .slice(0, 4)
              .map((tag) => resultsCopy.tags[tag]);

            return (
              <li key={match.destination.id} className="min-w-0">
                <DestinationCard
                  id={match.destination.id}
                  city={destinationCopy.city}
                  country={country}
                  description={destinationCopy.description}
                  visual={match.destination.visual}
                  matchLabel={matchLabel}
                  distanceLabel={distanceLabel}
                  distanceAccessibleLabel={distanceAccessibleLabel}
                  tags={tags}
                  reasons={strongestReasons(match, copy)}
                  whyLabel={resultsCopy.card.why}
                  viewTripLabel={resultsCopy.card.viewTrip}
                  hideTripLabel={resultsCopy.card.hideTrip}
                  detailPrototype={resultsCopy.card.detailPrototype}
                  expanded={expandedDestination === match.destination.id}
                  onToggleExpanded={() =>
                    setExpandedDestination((current) =>
                      current === match.destination.id
                        ? null
                        : match.destination.id,
                    )
                  }
                />
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
