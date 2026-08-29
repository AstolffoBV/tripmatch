import AccommodationCard from "@/components/discovery/AccommodationCard";
import { accommodationOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type { AccommodationType } from "@/types/tripPreferences";

type QuestionFourProps = {
  questionLabel: string;
  copy: Translation["discover"]["q4"];
  selectedAccommodations: AccommodationType[];
  bedroomLabel: string;
  bedLabel: string;
  petFriendlyRequired: boolean;
  onToggle: (option: AccommodationType) => void;
};

const concreteAccommodationOptions = accommodationOptions.filter(
  (option) => option !== "No preference",
);

function BedIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      className="size-6"
    >
      <path
        d="M5 22V11m0 8h22v8M9 19v-6h8c4 0 6 2 6 6M5 24h22"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      className="size-6"
    >
      <ellipse cx="16" cy="20" rx="7" ry="6" fill="currentColor" />
      <ellipse cx="8" cy="13" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="14" cy="9" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="21" cy="10" rx="3" ry="4" fill="currentColor" />
      <ellipse cx="25" cy="15" rx="3" ry="4" fill="currentColor" />
    </svg>
  );
}

export default function QuestionFour({
  questionLabel,
  copy,
  selectedAccommodations,
  bedroomLabel,
  bedLabel,
  petFriendlyRequired,
  onToggle,
}: QuestionFourProps) {
  const noPreferenceSelected = selectedAccommodations.includes("No preference");

  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-4-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>
      </header>

      <aside className="mt-6 rounded-[1.45rem] border border-[#c6dfda] bg-[#eaf7f3]/72 px-4 py-4 shadow-[0_16px_38px_rgba(27,81,81,0.07)] backdrop-blur-sm sm:px-5 dark:border-white/12 dark:bg-white/[0.055]">
        <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
              {copy.requirementsLabel}
            </p>
            <p className="mt-1 text-sm text-[#4b666b] dark:text-[#b7cdcc]">
              {copy.groupNeeds}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="inline-flex min-h-11 items-center gap-3 rounded-2xl border border-[#b9d7d1] bg-white/70 px-3.5 py-2 text-[#245f64] shadow-sm dark:border-white/12 dark:bg-white/7 dark:text-[#c7e1df]">
              <BedIcon />
              <span className="text-sm font-bold">
                {bedroomLabel} · {bedLabel}
              </span>
            </div>

            {petFriendlyRequired ? (
              <div className="inline-flex min-h-11 items-center gap-2.5 rounded-2xl border border-[#b9d7d1] bg-white/70 px-3.5 py-2 text-[#245f64] shadow-sm dark:border-white/12 dark:bg-white/7 dark:text-[#c7e1df]">
                <PawIcon />
                <span className="max-w-52 text-sm font-semibold">
                  {copy.petFriendlyRequired}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </aside>

      <fieldset className="mt-6">
        <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
          {copy.stayOptions}
        </legend>
        <p className="mt-1 text-sm text-[#4b666b] dark:text-[#b7cdcc]">
          {copy.selectionHint}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concreteAccommodationOptions.map((option) => (
            <AccommodationCard
              key={option}
              option={option}
              label={copy.options[option]}
              description={copy.optionDescriptions[option]}
              selected={selectedAccommodations.includes(option)}
              onClick={() => onToggle(option)}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="my-4 flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#587378] dark:text-[#a6c0c1]"
        >
          <span className="h-px flex-1 bg-[#c9deda] dark:bg-white/10" />
          <span>{copy.orLabel}</span>
          <span className="h-px flex-1 bg-[#c9deda] dark:bg-white/10" />
        </div>

        <AccommodationCard
          option="No preference"
          label={copy.options["No preference"]}
          description={copy.optionDescriptions["No preference"]}
          selected={noPreferenceSelected}
          onClick={() => onToggle("No preference")}
          appearance="flexible"
        />
      </fieldset>
    </div>
  );
}
