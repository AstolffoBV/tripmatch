import TimingModeCard from "@/components/discovery/TimingModeCard";
import DatePicker from "@/components/forms/DatePicker";
import SelectDropdown from "@/components/forms/SelectDropdown";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  dateFlexibilityOptions,
  months,
  timingModeOptions,
} from "@/data/discoveryOptions";
import { languageLocales, type Translation } from "@/data/translations";
import type {
  DateFlexibilityDays,
  TimingMode,
  TimingPreferences,
} from "@/types/tripPreferences";
import { formatMessage } from "@/utils/translations";

type QuestionSixProps = {
  questionLabel: string;
  copy: Translation["discover"]["q6"];
  timing: TimingPreferences;
  availableYears: readonly number[];
  minimumReturnDate?: string;
  exactDatesAreInvalid: boolean;
  exactNightsLabel: string | null;
  onSelectMode: (mode: TimingMode) => void;
  onChangeExactDate: (
    field: "departureDate" | "returnDate",
    value: string,
  ) => void;
  onChangeDateFlexibility: (days: DateFlexibilityDays) => void;
  onChangeMonth: (value: string) => void;
  onChangeYear: (value: string) => void;
};

function FlexibleDatesIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 56 56"
      className="size-11"
    >
      <rect
        x="13"
        y="14"
        width="30"
        height="29"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M13 23h30M21 10v8m14-8v8M7 34c3 9 13 14 23 12m19-23C46 14 36 9 26 11m-19 23 1-7m-1 7 7 1m35-12-1 7m1-7-7-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default function QuestionSix({
  questionLabel,
  copy,
  timing,
  availableYears,
  minimumReturnDate,
  exactDatesAreInvalid,
  exactNightsLabel,
  onSelectMode,
  onChangeExactDate,
  onChangeDateFlexibility,
  onChangeMonth,
  onChangeYear,
}: QuestionSixProps) {
  const { language } = useLanguage();
  const flexibilitySummary =
    exactNightsLabel === null
      ? null
      : timing.dateFlexibilityDays === 0
        ? formatMessage(copy.flexibilitySummary.fixed, {
            nights: exactNightsLabel,
          })
        : formatMessage(
            timing.dateFlexibilityDays === 1
              ? copy.flexibilitySummary.one
              : copy.flexibilitySummary.other,
            {
              nights: exactNightsLabel,
              days: timing.dateFlexibilityDays,
            },
          );

  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-6-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
      </header>

      <fieldset className="mt-6">
        <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
          {copy.travelTiming}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {timingModeOptions.map((option) => (
            <TimingModeCard
              key={option.value}
              mode={option.value}
              label={copy.modeTitles[option.value]}
              description={copy.modeDescriptions[option.value]}
              accessibleLabel={`${copy.modes[option.value]}. ${copy.modeDescriptions[option.value]}`}
              selected={timing.mode === option.value}
              onClick={() => onSelectMode(option.value)}
            />
          ))}
        </div>
      </fieldset>

      {timing.mode === "exact" ? (
        <section className="mt-4 rounded-[1.6rem] border border-[#c6dfda] bg-white/68 p-4 shadow-[0_20px_50px_rgba(25,77,79,0.08)] backdrop-blur-sm sm:p-5 dark:border-white/12 dark:bg-white/[0.055]">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
            {copy.yourDates}
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <DatePicker
              label={copy.departureDate}
              value={timing.departureDate}
              locale={languageLocales[language]}
              copy={copy.calendar}
              onChange={(value) => onChangeExactDate("departureDate", value)}
            />
            <DatePicker
              label={copy.returnDate}
              value={timing.returnDate}
              min={minimumReturnDate}
              locale={languageLocales[language]}
              copy={copy.calendar}
              invalid={exactDatesAreInvalid}
              describedBy={exactDatesAreInvalid ? "return-date-error" : undefined}
              onChange={(value) => onChangeExactDate("returnDate", value)}
            />
          </div>

          {exactDatesAreInvalid ? (
            <p
              id="return-date-error"
              className="mt-3 rounded-xl border border-red-200 bg-red-50/80 px-3.5 py-2.5 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-400/8 dark:text-red-300"
              role="alert"
            >
              {copy.returnDateError}
            </p>
          ) : null}

          <fieldset className="mt-4 border-t border-[#d4e5e1] pt-4 dark:border-white/10">
            <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
              {copy.dateFlexibility}
            </legend>
            <p className="mt-1 text-sm text-[#4b666b] dark:text-[#b7cdcc]">
              {copy.dateFlexibilityHelper}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dateFlexibilityOptions.map((days) => {
                const selected = timing.dateFlexibilityDays === days;

                return (
                  <button
                    key={days}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChangeDateFlexibility(days)}
                    className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transition-none dark:focus-visible:outline-[#83d9d2] ${
                      selected
                        ? "border-[#55c9c5] bg-[#123f46] text-white shadow-[0_8px_20px_rgba(12,70,76,0.16)] hover:border-[#76ddd7]"
                        : "border-[#c5dcd8] bg-white/75 text-[#315b5f] hover:border-[#72b8b3] hover:bg-white dark:border-white/12 dark:bg-white/6 dark:text-[#c5dedd] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`size-3.5 transition-opacity ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <path
                        d="m3 8 3 3 7-7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    {copy.dateFlexibilityOptions[days]}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {flexibilitySummary !== null ? (
            <p
              aria-live="polite"
              className="mt-4 rounded-xl border border-[#c8dfdb] bg-[#eaf7f3]/72 px-3.5 py-2.5 text-sm font-semibold text-[#315f63] dark:border-white/10 dark:bg-white/[0.045] dark:text-[#c3dddd]"
            >
              {flexibilitySummary}
            </p>
          ) : null}
        </section>
      ) : null}

      {timing.mode === "rough" ? (
        <section className="mt-4 rounded-[1.6rem] border border-[#c6dfda] bg-white/68 p-4 shadow-[0_20px_50px_rgba(25,77,79,0.08)] backdrop-blur-sm sm:p-5 dark:border-white/12 dark:bg-white/[0.055]">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
            {copy.roughTiming}
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <SelectDropdown
              label={copy.month}
              value={timing.month ?? ""}
              options={[
                { value: "", label: copy.selectMonth },
                ...months.map((month) => ({
                  value: month,
                  label: copy.months[month],
                })),
              ]}
              onChange={onChangeMonth}
            />
            <SelectDropdown
              label={copy.year}
              value={timing.year?.toString() ?? ""}
              options={[
                { value: "", label: copy.selectYear },
                ...availableYears.map((year) => ({
                  value: year.toString(),
                  label: year.toString(),
                })),
              ]}
              onChange={onChangeYear}
            />
          </div>
        </section>
      ) : null}

      {timing.mode === "flexible" ? (
        <aside className="mt-4 rounded-[1.6rem] border border-[#bcdcd6] bg-[#e9f7f3]/78 p-4 text-[#16434a] shadow-[0_18px_45px_rgba(33,107,103,0.09)] backdrop-blur-sm sm:p-5 dark:border-[#66aaa4]/25 dark:bg-[#10383d]/72 dark:text-[#e9faf7]">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/72 text-[#277d7e] shadow-sm dark:bg-white/10 dark:text-[#84d4cd]">
              <FlexibleDatesIcon />
            </span>
            <div className="min-w-0">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#aed0cd]">
                {copy.flexibleDates}
              </p>
              <h2 className="mt-1 text-lg font-bold tracking-[-0.02em]">
                {copy.flexibleTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#466d70] dark:text-[#c2dad8]">
                {copy.flexibleHelper}
              </p>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
