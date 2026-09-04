type DurationCardProps = {
  label: string;
  description: string;
  dayRange: string;
  daysLabel: string;
  indicatorLevel: number;
  selected: boolean;
  onClick: () => void;
};

const indicatorSegments = [1, 2, 3, 4, 5] as const;

export default function DurationCard({
  label,
  description,
  dayRange,
  daysLabel,
  indicatorLevel,
  selected,
  onClick,
}: DurationCardProps) {
  return (
    <button
      type="button"
      aria-label={`${label}: ${description}`}
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative flex min-h-[9.75rem] w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[1.35rem] border p-4 text-left shadow-[0_14px_36px_rgba(24,75,77,0.07)] transition-[transform,border-color,background-color,box-shadow,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[10.25rem] dark:focus-visible:outline-[#83d9d2] ${
        selected
          ? "border-[#55c9c5] bg-[#123f46] text-white shadow-[0_18px_42px_rgba(12,70,76,0.2)] hover:border-[#76ddd7] hover:shadow-[0_19px_44px_rgba(12,70,76,0.22)]"
          : "border-[#cbdeda] bg-white/72 text-[#143a3f] backdrop-blur-sm hover:border-[#72b8b3] hover:bg-white/92 hover:shadow-[0_18px_42px_rgba(24,75,77,0.12)] dark:border-white/12 dark:bg-white/[0.065] dark:text-[#eff9f8] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-3.5 right-3.5 grid size-6 place-items-center rounded-full border transition-[opacity,transform,background-color] duration-200 ${
          selected
            ? "scale-100 border-[#7de0da]/70 bg-[#67c9c4]/18 text-[#9aeae4] opacity-100"
            : "scale-90 border-transparent bg-transparent text-transparent opacity-0"
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
        className={`min-h-8 pr-7 text-[0.64rem] leading-4 font-bold tracking-[0.14em] uppercase ${
          selected
            ? "text-[#c9eeeb]"
            : "text-[#4d696d] dark:text-[#aec7c6]"
        }`}
      >
        {label}
      </span>

      <span className="mt-2 flex items-end gap-1.5">
        <span className="text-[2.55rem] leading-none font-bold tracking-[-0.065em] sm:text-[2.8rem]">
          {dayRange}
        </span>
        <span
          className={`mb-1 text-xs font-semibold ${
            selected
              ? "text-[#a9dcd8]"
              : "text-[#577377] dark:text-[#aac2c1]"
          }`}
        >
          {daysLabel}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="mt-auto flex items-center gap-1.5 pt-4"
      >
        {indicatorSegments.map((segment) => {
          const active = segment <= indicatorLevel;

          return (
            <span
              key={segment}
              className={`h-1.5 min-w-0 flex-1 rounded-full transition-colors duration-200 ${
                active
                  ? selected
                    ? "bg-[#7ee0da]"
                    : "bg-[#28777b] dark:bg-[#67c7c1]"
                  : selected
                    ? "bg-white/16"
                    : "bg-[#dceae7] dark:bg-white/10"
              }`}
            />
          );
        })}
      </span>
    </button>
  );
}
