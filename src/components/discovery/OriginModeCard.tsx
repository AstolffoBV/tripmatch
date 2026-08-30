import type { OriginMode } from "@/types/tripPreferences";

type OriginModeCardProps = {
  mode: OriginMode;
  label: string;
  description: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

function OriginModeIcon({ mode }: { mode: OriginMode }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 56 56"
      className="size-10"
    >
      {mode === "currentLocation" ? (
        <>
          <circle cx="28" cy="28" r="13" {...sharedProps} />
          <circle cx="28" cy="28" r="4" {...sharedProps} />
          <path d="M28 8v7m0 26v7M8 28h7m26 0h7" {...sharedProps} />
          <path d="m37 19 6-6m-24 24-6 6" {...sharedProps} />
        </>
      ) : (
        <>
          <path d="m8 16 13-6 14 6 13-6v31l-13 6-14-6-13 6V16Z" {...sharedProps} />
          <path d="M21 10v31m14-25v31" {...sharedProps} />
          <path
            d="M35 19.5a7 7 0 0 0-7 7c0 5.5 7 12 7 12s7-6.5 7-12a7 7 0 0 0-7-7Z"
            {...sharedProps}
          />
          <circle cx="35" cy="26.5" r="2.25" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export default function OriginModeCard({
  mode,
  label,
  description,
  selected,
  disabled,
  onClick,
}: OriginModeCardProps) {
  return (
    <button
      type="button"
      aria-label={`${label}. ${description}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`group relative min-h-28 w-full overflow-hidden rounded-[1.45rem] border px-4 py-4 text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] sm:px-5 ${
        disabled
          ? "cursor-not-allowed border-[#d6e2df] bg-white/45 text-[#80918f] opacity-70 dark:border-white/8 dark:bg-white/[0.035] dark:text-[#738887]"
          : selected
            ? "cursor-pointer border-[#55c9c5] bg-[#123f46] text-[#f5fffd] shadow-[0_17px_40px_rgba(12,70,76,0.18)]"
            : "cursor-pointer border-[#c8ddd9] bg-white/72 text-[#14383d] motion-safe:hover:-translate-y-0.5 hover:border-[#72b8b3] hover:bg-white hover:shadow-[0_14px_32px_rgba(21,75,77,0.09)] dark:border-white/12 dark:bg-white/[0.065] dark:text-[#edf9f7] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-14 -right-10 size-36 rounded-full border transition-colors ${
          selected
            ? "border-white/14 bg-[#67d9d1]/9"
            : "border-[#52aaa5]/10 bg-[#8ddbd5]/7 dark:border-white/9"
        }`}
      />

      <span className="relative flex h-full items-center gap-4">
        <span
          className={`grid size-13 shrink-0 place-items-center rounded-[1.1rem] transition-colors ${
            selected
              ? "bg-white/10 text-[#a9eee8]"
              : disabled
                ? "bg-[#edf3f1] text-[#8da5a2] dark:bg-white/5 dark:text-[#718987]"
                : "bg-[#e8f5f2] text-[#28777b] dark:bg-white/8 dark:text-[#84cfca]"
          }`}
        >
          <OriginModeIcon mode={mode} />
        </span>

        <span className="min-w-0 flex-1 pr-8">
          <span className="block text-base font-bold tracking-[-0.02em] sm:text-lg">
            {label}
          </span>
          <span
            className={`mt-1 block text-sm leading-5 ${
              selected
                ? "text-[#c1ddda]"
                : disabled
                  ? "text-current"
                  : "text-[#4b666b] dark:text-[#aec6c6]"
            }`}
          >
            {description}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={`absolute top-0 right-0 grid size-6 place-items-center rounded-full border transition ${
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
