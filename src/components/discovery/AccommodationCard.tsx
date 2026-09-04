import type { AccommodationType } from "@/types/tripPreferences";

type AccommodationCardProps = {
  option: AccommodationType;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  appearance?: "standard" | "flexible";
};

function AccommodationIcon({ option }: { option: AccommodationType }) {
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
      className="size-11"
    >
      {option === "Hotel" ? (
        <>
          <path d="M13 46V13h30v33M23 46V35h10v11" {...sharedProps} />
          <path d="M20 21h4m8 0h4m-16 7h4m8 0h4" {...sharedProps} />
          <path d="M9 46h38" {...sharedProps} />
        </>
      ) : null}

      {option === "Resort" ? (
        <>
          <circle cx="40" cy="14" r="5" {...sharedProps} />
          <path d="M10 28c8-12 20-12 28 0H10Zm14 0v16" {...sharedProps} />
          <path d="M7 44c5-3 9-3 14 0s9 3 14 0 9-3 14 0" {...sharedProps} />
        </>
      ) : null}

      {option === "Apartment" ? (
        <>
          <path d="M10 46V20h21v26m0-17h15v17M7 46h42" {...sharedProps} />
          <path d="M17 27h7m-7 7h7m-7 7h7m20-5h-6m6 5h-6" {...sharedProps} />
        </>
      ) : null}

      {option === "Villa / Holiday home" ? (
        <>
          <path d="m7 28 21-17 21 17M12 25v21h32V25" {...sharedProps} />
          <path d="M23 46V34h10v12m-15-15h5m10 0h5" {...sharedProps} />
        </>
      ) : null}

      {option === "Hostel" ? (
        <>
          <path d="M12 13v34m32-34v34M12 25h32M12 41h32" {...sharedProps} />
          <path d="M17 19h11m-11 16h11M16 25v-7m0 23v-7" {...sharedProps} />
          <circle cx="34" cy="19" r="3" {...sharedProps} />
          <circle cx="34" cy="35" r="3" {...sharedProps} />
        </>
      ) : null}

      {option === "Camping" ? (
        <>
          <path d="m8 45 20-33 20 33H8Z" {...sharedProps} />
          <path d="m28 12 8 33M28 12 20 45m2 0 6-11 7 11" {...sharedProps} />
          <path d="M5 45h46" {...sharedProps} />
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

export default function AccommodationCard({
  option,
  label,
  description,
  selected,
  onClick,
  appearance = "standard",
}: AccommodationCardProps) {
  const isFlexible = appearance === "flexible";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-[1.35rem] border text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:outline-[#83d9d2] ${
        isFlexible
          ? "min-h-[4.75rem] px-4 py-3.5 sm:px-5"
          : "min-h-32 p-4"
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
        className={`relative flex ${
          isFlexible ? "items-center gap-4" : "h-full flex-col"
        }`}
      >
        <span
          className={`grid shrink-0 place-items-center rounded-2xl transition-colors ${
            isFlexible ? "size-12" : "size-11"
          } ${
            selected
              ? "bg-white/10 text-[#a9eee8]"
              : "bg-[#e8f5f2] text-[#28777b] dark:bg-white/8 dark:text-[#84cfca]"
          }`}
        >
          <AccommodationIcon option={option} />
        </span>

        <span className={isFlexible ? "min-w-0 flex-1" : "mt-3 block"}>
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
