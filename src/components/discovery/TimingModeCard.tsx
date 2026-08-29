import type { TimingMode } from "@/types/tripPreferences";

type TimingModeCardProps = {
  mode: TimingMode;
  label: string;
  description: string;
  accessibleLabel: string;
  selected: boolean;
  onClick: () => void;
};

function TimingModeIcon({ mode }: { mode: TimingMode }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.1,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 56 56"
      className="size-10"
    >
      {mode === "exact" ? (
        <>
          <rect x="10" y="14" width="36" height="33" rx="5" {...sharedProps} />
          <path d="M10 24h36M19 10v8m18-8v8" {...sharedProps} />
          <path d="m20 34 5 5 11-12" {...sharedProps} />
        </>
      ) : null}

      {mode === "rough" ? (
        <>
          <rect x="10" y="14" width="36" height="33" rx="5" {...sharedProps} />
          <path d="M10 24h36M19 10v8m18-8v8" {...sharedProps} />
          <circle cx="20" cy="32" r="2" fill="currentColor" />
          <circle cx="28" cy="32" r="2" fill="currentColor" />
          <circle cx="36" cy="32" r="2" fill="currentColor" />
          <path d="M17 40h22" {...sharedProps} />
        </>
      ) : null}

      {mode === "flexible" ? (
        <>
          <rect x="12" y="15" width="32" height="30" rx="5" {...sharedProps} />
          <path d="M12 24h32M20 11v8m16-8v8" {...sharedProps} />
          <path d="M8 34c3 9 13 15 23 13m17-25C45 13 35 8 25 10" {...sharedProps} />
          <path d="m8 34 1-7m-1 7 7 1m33-13-1 7m1-7-7-1" {...sharedProps} />
        </>
      ) : null}
    </svg>
  );
}

export default function TimingModeCard({
  mode,
  label,
  description,
  accessibleLabel,
  selected,
  onClick,
}: TimingModeCardProps) {
  return (
    <button
      type="button"
      aria-label={accessibleLabel}
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative min-h-24 w-full cursor-pointer overflow-hidden rounded-[1.35rem] border px-3.5 py-3 text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 sm:px-4 ${
        selected
          ? "border-[#55c9c5] bg-[#123f46] text-[#f5fffd] shadow-[0_16px_38px_rgba(12,70,76,0.18)]"
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

      <span className="relative flex h-full items-center gap-3.5">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-colors ${
            selected
              ? "bg-white/10 text-[#a9eee8]"
              : "bg-[#e8f5f2] text-[#28777b] dark:bg-white/8 dark:text-[#84cfca]"
          }`}
        >
          <TimingModeIcon mode={mode} />
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
