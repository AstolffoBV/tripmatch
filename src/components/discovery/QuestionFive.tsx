import MealPreferenceCard from "@/components/discovery/MealPreferenceCard";
import { mealOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type { MealPreference } from "@/types/tripPreferences";

type QuestionFiveProps = {
  questionLabel: string;
  copy: Translation["discover"]["q5"];
  selectedMeals: MealPreference[];
  onToggle: (option: MealPreference) => void;
};

const concreteMealOptions = mealOptions.filter(
  (option) => option !== "No preference",
);

export default function QuestionFive({
  questionLabel,
  copy,
  selectedMeals,
  onToggle,
}: QuestionFiveProps) {
  const noPreferenceSelected = selectedMeals.includes("No preference");

  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-5-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>
      </header>

      <fieldset className="mt-6">
        <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
          {copy.mealStyle}
        </legend>
        <p className="mt-1 text-sm text-[#4b666b] dark:text-[#b7cdcc]">
          {copy.selectionHint}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {concreteMealOptions.map((option, index) => (
            <div
              key={option}
              className={
                index < 3
                  ? "min-w-0 lg:col-span-2"
                  : index === concreteMealOptions.length - 1
                    ? "min-w-0 sm:col-span-2 lg:col-span-3"
                    : "min-w-0 lg:col-span-3"
              }
            >
              <MealPreferenceCard
                option={option}
                label={copy.options[option]}
                description={copy.optionDescriptions[option]}
                selected={selectedMeals.includes(option)}
                onClick={() => onToggle(option)}
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="my-3.5 flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#587378] dark:text-[#a6c0c1]"
        >
          <span className="h-px flex-1 bg-[#c9deda] dark:bg-white/10" />
          <span>{copy.orLabel}</span>
          <span className="h-px flex-1 bg-[#c9deda] dark:bg-white/10" />
        </div>

        <MealPreferenceCard
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
