import type { TransportMode } from "@/types/tripPreferences";

type TransportCardProps = {
  mode: TransportMode;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

function TransportIcon({ mode }: { mode: TransportMode }) {
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
      className="size-11"
    >
      {mode === "Car" ? (
        <>
          <path d="M8 37h5l4-10h22l7 10h2v7h-5" {...sharedProps} />
          <path d="M13 44H9v-7h39v7h-5M24 44h9" {...sharedProps} />
          <path d="m20 27 4-8h10l5 8M24 27h15" {...sharedProps} />
          <circle cx="19" cy="44" r="4" {...sharedProps} />
          <circle cx="38" cy="44" r="4" {...sharedProps} />
        </>
      ) : null}

      {mode === "Plane" ? (
        <>
          <path
            d="M7 33h16l10-20h5l-5 20h13c2.5 0 4.5 1.5 5 4H32l-5 10h-4l2-10H10l-3-4Z"
            {...sharedProps}
          />
          <path d="m18 33-6-9h4l10 9" {...sharedProps} />
        </>
      ) : null}

      {mode === "Train" ? (
        <>
          <path d="M15 13c0-3 3-5 6-5h14c3 0 6 2 6 5v25c0 4-3 7-7 7H22c-4 0-7-3-7-7V13Z" {...sharedProps} />
          <path d="M20 15h16v12H20V15Zm-3 18h22M22 45l-5 5m17-5 5 5M19 50h18" {...sharedProps} />
          <circle cx="21" cy="36" r="2" {...sharedProps} />
          <circle cx="35" cy="36" r="2" {...sharedProps} />
        </>
      ) : null}

      {mode === "Coach" ? (
        <>
          <path d="M8 16h34c4 0 7 3 7 7v20H8V16Z" {...sharedProps} />
          <path d="M13 22h26v11H13V22Zm26 0h5v11h-5M13 37h31" {...sharedProps} />
          <circle cx="17" cy="43" r="4" {...sharedProps} />
          <circle cx="40" cy="43" r="4" {...sharedProps} />
          <path d="M8 28H5m44 0h3" {...sharedProps} />
        </>
      ) : null}

      {mode === "Ferry" ? (
        <>
          <path d="M8 35h40l-6 10H18L8 35Z" {...sharedProps} />
          <path d="M17 35V24h23v11M22 24v-8h12v8M28 16V9m0 0 7 4" {...sharedProps} />
          <path d="M6 49c4-2.5 8-2.5 12 0s8 2.5 12 0 8-2.5 12 0 8 2.5 12 0" {...sharedProps} />
          <path d="M21 29h4m6 0h4" {...sharedProps} />
        </>
      ) : null}
    </svg>
  );
}

export default function TransportCard({
  mode,
  label,
  description,
  selected,
  onClick,
}: TransportCardProps) {
  return (
    <button
      type="button"
      aria-label={`${label}. ${description}`}
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative flex min-h-[11.25rem] w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[1.35rem] border p-4 text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] dark:focus-visible:outline-[#83d9d2] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${
        selected
          ? "border-[#55c9c5] bg-[#123f46] text-[#f5fffd] shadow-[0_16px_38px_rgba(12,70,76,0.18)] hover:border-[#76ddd7] hover:shadow-[0_18px_40px_rgba(12,70,76,0.21)]"
          : "border-[#cbdeda] bg-white/72 text-[#14383d] hover:border-[#72b8b3] hover:bg-white hover:shadow-[0_14px_32px_rgba(21,75,77,0.09)] dark:border-white/12 dark:bg-white/[0.065] dark:text-[#edf9f7] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-14 -right-11 size-36 rounded-full border transition-colors motion-reduce:transition-none ${
          selected
            ? "border-white/14 bg-[#67d9d1]/9"
            : "border-[#52aaa5]/10 bg-[#8ddbd5]/7 dark:border-white/9"
        }`}
      />

      <span
        aria-hidden="true"
        className={`absolute top-3.5 right-3.5 grid size-6 place-items-center rounded-full border transition motion-reduce:transition-none ${
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

      <span
        aria-hidden="true"
        className={`relative grid size-12 shrink-0 place-items-center rounded-[1rem] transition-colors motion-reduce:transition-none ${
          selected
            ? "bg-white/10 text-[#a9eee8]"
            : "bg-[#e8f5f2] text-[#28777b] dark:bg-white/8 dark:text-[#84cfca]"
        }`}
      >
        <TransportIcon mode={mode} />
      </span>

      <span className="relative mt-4 block pr-5 font-bold tracking-[-0.025em]">
        {label}
      </span>
      <span
        className={`relative mt-1 block text-xs leading-5 ${
          selected
            ? "text-[#c1ddda]"
            : "text-[#4b666b] dark:text-[#aec6c6]"
        }`}
      >
        {description}
      </span>

      <span
        aria-hidden="true"
        className="relative mt-auto block w-9 pt-4"
      >
        <span
          className={`block h-px w-full ${
            selected ? "bg-[#7edbd5]/65" : "bg-[#78aaa6]/45"
          }`}
        />
      </span>
    </button>
  );
}
