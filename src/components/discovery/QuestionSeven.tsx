import DurationCard from "@/components/discovery/DurationCard";
import { durationOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type { DurationPreference } from "@/types/tripPreferences";

type QuestionSevenProps = {
  questionLabel: string;
  copy: Translation["discover"]["q7"];
  selectedDuration: DurationPreference | null;
  contextLabel: string | null;
  onSelect: (duration: DurationPreference) => void;
};

const durationVisuals = {
  weekend: { dayRange: "2–3", indicatorLevel: 1 },
  short: { dayRange: "4–5", indicatorLevel: 2 },
  week: { dayRange: "6–8", indicatorLevel: 3 },
  long: { dayRange: "9–14", indicatorLevel: 4 },
  extended: { dayRange: "15+", indicatorLevel: 5 },
} as const satisfies Record<
  DurationPreference,
  { dayRange: string; indicatorLevel: number }
>;

function TimingContextChip({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#bddbd6] bg-[#e9f6f2]/78 px-3.5 py-2 text-sm font-semibold text-[#315e62] shadow-sm backdrop-blur-sm dark:border-[#63aaa4]/25 dark:bg-[#10383d]/62 dark:text-[#c9e4e1]">
      <span aria-hidden="true" className="flex items-center gap-0.5">
        <span className="size-1.5 rounded-full bg-[#3a8e8d] dark:bg-[#73d1ca]" />
        <span className="h-px w-4 bg-[#80b8b3] dark:bg-[#68aaa5]" />
        <span className="size-1.5 rounded-full border border-[#3a8e8d] dark:border-[#73d1ca]" />
      </span>
      {label}
    </div>
  );
}

export default function QuestionSeven({
  questionLabel,
  copy,
  selectedDuration,
  contextLabel,
  onSelect,
}: QuestionSevenProps) {
  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-7-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>

        {contextLabel !== null ? (
          <div className="mt-4">
            <TimingContextChip label={contextLabel} />
          </div>
        ) : null}
      </header>

      <fieldset className="mt-6">
        <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
          {copy.stayLength}
        </legend>

        <div className="mt-3 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {durationOptions.map((option) => {
            const translatedOption = copy.options[option.value];
            const visual = durationVisuals[option.value];

            return (
              <DurationCard
                key={option.value}
                label={translatedOption.label}
                description={translatedOption.description}
                dayRange={visual.dayRange}
                daysLabel={copy.daysLabel}
                indicatorLevel={visual.indicatorLevel}
                selected={selectedDuration === option.value}
                onClick={() => onSelect(option.value)}
              />
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
