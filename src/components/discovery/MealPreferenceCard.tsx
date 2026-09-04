import type { MealPreference } from "@/types/tripPreferences";

type MealPreferenceCardProps = {
  option: MealPreference;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  appearance?: "standard" | "flexible";
};

function MealIcon({ option }: { option: MealPreference }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.2,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 56 56"
      className="size-10"
    >
      {option === "All inclusive" ? (
        <>
          <path d="M10 39h36M14 35c1-11 6-17 14-17s13 6 14 17H14Z" {...sharedProps} />
          <path d="M25 14h6m-3 0v4" {...sharedProps} />
          <path d="M44 13v6m-3-3h6" {...sharedProps} />
        </>
      ) : null}

      {option === "Half board" ? (
        <>
          <circle cx="28" cy="28" r="16" {...sharedProps} />
          <circle cx="28" cy="28" r="10" {...sharedProps} />
          <path d="M28 18v20M18 28h10" {...sharedProps} />
          <path d="M45 16v24M11 16v24m-3-24v8c0 3 6 3 6 0v-8" {...sharedProps} />
        </>
      ) : null}

      {option === "Breakfast included" ? (
        <>
          <path d="M13 24h25v9c0 6-4 10-11 10h-3c-7 0-11-4-11-10v-9Z" {...sharedProps} />
          <path d="M38 27h3c6 0 6 9 0 9h-4M10 45h32" {...sharedProps} />
          <circle cx="42" cy="14" r="4" {...sharedProps} />
          <path d="M20 19c-3-3 3-5 0-8m8 8c-3-3 3-5 0-8" {...sharedProps} />
        </>
      ) : null}

      {option === "Mostly eat at restaurants" ? (
        <>
          <circle cx="29" cy="29" r="12" {...sharedProps} />
          <circle cx="29" cy="29" r="6" {...sharedProps} />
          <path d="M10 13v29m-3-29v10c0 4 6 4 6 0V13m32 0v29M42 13v12h3" {...sharedProps} />
        </>
      ) : null}

      {option === "Self-catering / cook myself" ? (
        <>
          <path d="M13 24h30v15c0 4-3 7-7 7H20c-4 0-7-3-7-7V24Z" {...sharedProps} />
          <path d="M9 29h4m30 0h4M19 24c1-5 17-5 18 0M24 17h8" {...sharedProps} />
          <path d="M21 13c-3-3 3-5 0-8m11 8c-3-3 3-5 0-8" {...sharedProps} />
        </>
      ) : null}

      {option === "No preference" ? (
        <>
          <circle cx="28" cy="28" r="18" {...sharedProps} />
          <path d="m34 20-4 10-9 5 4-10 9-5Z" {...sharedProps} />
          <circle cx="28" cy="28" r="2" fill="currentColor" />
        </>
      ) : null}
    </svg>
  );
}

export default function MealPreferenceCard({
  option,
  label,
  description,
  selected,
  onClick,
  appearance = "standard",
}: MealPreferenceCardProps) {
  const isFlexible = appearance === "flexible";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-[1.35rem] border text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:outline-[#83d9d2] ${
        isFlexible
          ? "min-h-[4.25rem] px-4 py-3 sm:px-5"
          : "min-h-[5.5rem] px-3.5 py-3 sm:px-4"
      } ${
        selected
          ? "border-[#55c9c5] bg-[#123f46] text-[#f5fffd] shadow-[0_16px_38px_rgba(12,70,76,0.18)] hover:border-[#76ddd7] hover:shadow-[0_18px_40px_rgba(12,70,76,0.21)]"
          : "border-[#cbdeda] bg-white/72 text-[#14383d] hover:border-[#72b8b3] hover:bg-white hover:shadow-[0_14px_32px_rgba(21,75,77,0.09)] dark:border-white/12 dark:bg-white/[0.065] dark:text-[#edf9f7] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -right-9 -top-10 size-28 rounded-full border transition-colors ${
          selected
            ? "border-white/14 bg-[#67d9d1]/9"
            : "border-[#52aaa5]/10 bg-[#8ddbd5]/7 dark:border-white/9"
        }`}
      />

      <span
        className="relative flex h-full items-center gap-3.5 sm:gap-4"
      >
        <span
          className={`grid shrink-0 place-items-center rounded-2xl transition-colors ${
            isFlexible ? "size-11" : "size-10 sm:size-11"
          } ${
            selected
              ? "bg-white/10 text-[#a9eee8]"
              : "bg-[#e8f5f2] text-[#28777b] dark:bg-white/8 dark:text-[#84cfca]"
          }`}
        >
          <MealIcon option={option} />
        </span>

        <span className="min-w-0 flex-1 pr-7">
          <span className="block font-bold tracking-[-0.02em]">{label}</span>
          <span
            className={`mt-0.5 block text-xs leading-5 ${
              selected
                ? "text-[#c1ddda]"
                : "text-[#4b666b] dark:text-[#aec6c6]"
            }`}
          >
            {description}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={`absolute right-0 top-0 grid size-6 place-items-center rounded-full border transition ${
            selected
              ? "scale-100 border-[#74ddd5] bg-[#65cec8] text-[#092e33] opacity-100"
              : "scale-90 border-[#7ba9a6]/35 text-transparent opacity-0"
          }`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
            <path
              d="m3 8 3 3 7-7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
