import { months, transportOptions } from "@/data/discoveryOptions";
import {
  languageLocales,
  type LanguageCode,
  type Translation,
} from "@/data/translations";
import type {
  TravelMonth,
  TripPreferences,
} from "@/types/tripPreferences";
import {
  getSuggestedTripRhythm,
  type TripRhythmTime,
} from "@/utils/tripPreview";
import { formatCount, formatMessage } from "@/utils/translations";

type DestinationTripPreviewProps = {
  destinationName: string;
  preferences: TripPreferences;
  language: LanguageCode;
  copy: Translation;
  tags: readonly string[];
};

type SetupItem = {
  id: "stay" | "meals" | "transport" | "budget" | "origin";
  label: string;
  value: string;
};

type MonthAndYear = {
  month: TravelMonth;
  year: number;
};

function parseMonthAndYear(value: string): MonthAndYear | null {
  const match = /^(\d{4})-(\d{2})-\d{2}$/.exec(value);

  if (match === null) {
    return null;
  }

  const year = Number(match[1]);
  const month = months[Number(match[2]) - 1];

  return Number.isInteger(year) && month !== undefined ? { month, year } : null;
}

function formatMonthAndYear(
  value: MonthAndYear,
  copy: Translation,
) {
  return `${copy.discover.q6.months[value.month]} ${value.year}`;
}

function getTimingLabel(preferences: TripPreferences, copy: Translation) {
  const timing = preferences.timing;

  if (timing.mode === "rough" && timing.month !== null) {
    return `${copy.discover.q6.months[timing.month]} ${timing.year ?? ""}`.trim();
  }

  if (timing.mode === "flexible") {
    return copy.discover.q6.flexibleDates;
  }

  if (timing.mode !== "exact") {
    return null;
  }

  const departure = parseMonthAndYear(timing.departureDate);
  const returnDate = parseMonthAndYear(timing.returnDate);

  if (departure === null) {
    return null;
  }

  const departureLabel = formatMonthAndYear(departure, copy);

  if (returnDate === null) {
    return departureLabel;
  }

  const returnLabel = formatMonthAndYear(returnDate, copy);

  return departureLabel === returnLabel
    ? departureLabel
    : `${departureLabel} – ${returnLabel}`;
}

function getDurationLabel(preferences: TripPreferences, copy: Translation) {
  const exactNights = preferences.timing.exactNights;

  if (
    preferences.timing.mode === "exact" &&
    exactNights !== null &&
    exactNights > 0
  ) {
    return formatCount(exactNights, copy.common.nouns.night);
  }

  return preferences.duration === null
    ? null
    : copy.discover.q7.options[preferences.duration].description;
}

function getBudgetLabel(
  preferences: TripPreferences,
  language: LanguageCode,
  copy: Translation,
) {
  const budget = preferences.budget;
  const amount = budget.mode === "total" ? budget.total : budget.perTraveller;

  if (amount === null || !Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  const amountLabel = new Intl.NumberFormat(languageLocales[language], {
    maximumFractionDigits: 0,
  }).format(amount);
  const template =
    budget.mode === "total"
      ? copy.discover.results.filters.totalBudget
      : copy.discover.results.filters.perTravellerBudget;

  return formatMessage(template, {
    amount: amountLabel,
    currency: budget.currency,
  });
}

function getTripStyle(preferences: TripPreferences, copy: Translation) {
  const subtype = preferences.tripSubtype;

  if (subtype !== null && !subtype.endsWith("-any")) {
    return copy.discover.q1.subtypes[subtype];
  }

  return preferences.tripType === null
    ? copy.common.notSelected
    : copy.discover.q1.options[preferences.tripType];
}

function formatRhythmTime(
  time: TripRhythmTime,
  copy: Translation,
) {
  const timeCopy = copy.discover.results.tripPreview.time;

  switch (time.kind) {
    case "day":
      return formatMessage(timeCopy.day, { day: time.day });
    case "days":
      return formatMessage(timeCopy.days, {
        start: time.start,
        end: time.end,
      });
    case "midTrip":
      return timeCopy.midTrip;
    case "laterDays":
      return timeCopy.laterDays;
    case "finalDay":
      return timeCopy.finalDay;
  }
}

export default function DestinationTripPreview({
  destinationName,
  preferences,
  language,
  copy,
  tags,
}: DestinationTripPreviewProps) {
  const resultsCopy = copy.discover.results;
  const previewCopy = resultsCopy.tripPreview;
  const groupLabel =
    preferences.travellers.groupType === null
      ? null
      : copy.discover.q2.groups[preferences.travellers.groupType];
  const snapshotDetails = [
    getDurationLabel(preferences, copy),
    groupLabel,
    getTimingLabel(preferences, copy),
  ].filter((value): value is string => value !== null && value.length > 0);
  const accommodationLabel = preferences.accommodation
    .map((option) => copy.discover.q4.options[option])
    .join(" · ");
  const mealLabel = preferences.meals
    .map((option) => copy.discover.q5.options[option])
    .join(" · ");
  const acceptsEveryTransport = transportOptions.every((option) =>
    preferences.transport.includes(option),
  );
  const transportLabel = acceptsEveryTransport
    ? copy.discover.q9.openToAnything
    : preferences.transport
        .map((option) => copy.discover.q9.options[option])
        .join(" · ");
  const budgetLabel = getBudgetLabel(preferences, language, copy);
  const originLabel = preferences.origin.resolvedLocation.trim();
  const setupCandidates: Array<SetupItem | null> = [
    {
      id: "stay",
      label: resultsCopy.filters.categories[4],
      value: accommodationLabel,
    },
    {
      id: "meals",
      label: resultsCopy.filters.categories[5],
      value: mealLabel,
    },
    {
      id: "transport",
      label: resultsCopy.filters.categories[9],
      value: transportLabel,
    },
    budgetLabel === null
      ? null
      : {
          id: "budget",
          label: resultsCopy.filters.categories[3],
          value: budgetLabel,
        },
    originLabel.length === 0
      ? null
      : {
          id: "origin",
          label: resultsCopy.filters.categories[8],
          value: originLabel,
        },
  ];
  const setupItems = setupCandidates.filter(
    (item): item is SetupItem => item !== null && item.value.length > 0,
  );
  const tripStyle = getTripStyle(preferences, copy);
  const rhythm = getSuggestedTripRhythm(preferences);
  const fitTags = tags.slice(0, 3);

  return (
    <div className="min-w-0">
      <header className="border-b border-[#c9dfdb] pb-4 dark:border-white/10">
        <h4 className="text-lg leading-6 font-bold tracking-[-0.025em] text-[#153e43] dark:text-[#eef9f7]">
          {formatMessage(previewCopy.heading, {
            destination: destinationName,
          })}
        </h4>

        {snapshotDetails.length > 0 ? (
          <ul className="mt-2 flex min-w-0 flex-wrap gap-x-2 gap-y-1 text-xs font-semibold text-[#527276] dark:text-[#adcbca]">
            {snapshotDetails.map((detail, index) => (
              <li
                key={`${detail}-${index}`}
                className="flex min-w-0 items-center gap-2"
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 rounded-full bg-[#73aaa6] dark:bg-[#75c9c3]"
                  />
                ) : null}
                <span className="min-w-0 break-words">{detail}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {setupItems.length > 0 ? (
        <section className="mt-4">
          <h5 className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#537075] dark:text-[#a9c6c4]">
            {previewCopy.setupTitle}
          </h5>
          <dl className="mt-2.5 space-y-2">
            {setupItems.map((item) => (
              <div
                key={item.id}
                className="min-w-0 rounded-xl border border-[#cfe1de] bg-white/55 px-3 py-2.5 sm:grid sm:grid-cols-[8.75rem_minmax(0,1fr)] sm:gap-3 dark:border-white/9 dark:bg-white/[0.035]"
              >
                <dt className="text-[0.63rem] font-bold uppercase tracking-[0.13em] text-[#638083] dark:text-[#9fbab8]">
                  {item.label}
                </dt>
                <dd className="mt-1 min-w-0 font-semibold break-words text-[#294f53] sm:mt-0 dark:text-[#d7e9e7]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {rhythm.length > 0 ? (
        <section className="mt-5">
          <h5 className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#537075] dark:text-[#a9c6c4]">
            {previewCopy.rhythmTitle}
          </h5>
          <ol className="mt-3 ml-1.5 space-y-3 border-l border-[#9dc6c1] dark:border-[#5d9692]/55">
            {rhythm.map((segment) => {
              const phaseCopy = previewCopy.phases[segment.phase];

              return (
                <li key={segment.phase} className="relative min-w-0 pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[0.3rem] size-2.5 rounded-full border-2 border-[#edf8f5] bg-[#3f8989] dark:border-[#18373c] dark:bg-[#77cec7]"
                  />
                  <p className="text-[0.6rem] leading-4 font-bold uppercase tracking-[0.14em] text-[#438081] dark:text-[#82c9c4]">
                    {formatRhythmTime(segment.time, copy)}
                  </p>
                  <h6 className="font-bold text-[#21494e] dark:text-[#e5f3f1]">
                    {phaseCopy.title}
                  </h6>
                  <p className="mt-0.5 break-words text-xs leading-5 text-[#5b777a] dark:text-[#aac3c1]">
                    {formatMessage(phaseCopy.description, {
                      destination: destinationName,
                      tripStyle,
                    })}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {fitTags.length > 0 ? (
        <section className="mt-5 border-t border-[#c9dfdb] pt-4 dark:border-white/10">
          <h5 className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#537075] dark:text-[#a9c6c4]">
            {previewCopy.focusTitle}
          </h5>

          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {fitTags.map((tag) => (
              <li
                key={tag}
                className="max-w-full rounded-full border border-[#bed9d5] bg-[#e3f2ef]/75 px-2.5 py-1 text-[0.68rem] font-semibold break-words text-[#315f63] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#bee0dc]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p
        role="note"
        className="mt-5 rounded-xl border border-[#c9dfdb] bg-[#e5f2ef]/64 px-3 py-2.5 text-xs leading-5 text-[#587477] dark:border-white/9 dark:bg-white/[0.04] dark:text-[#a8c0be]"
      >
        {previewCopy.disclaimer}
      </p>
    </div>
  );
}
