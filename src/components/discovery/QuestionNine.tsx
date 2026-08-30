import TransportCard from "@/components/discovery/TransportCard";
import { transportOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type { TransportMode } from "@/types/tripPreferences";

type QuestionNineProps = {
  questionLabel: string;
  copy: Translation["discover"]["q9"];
  selectedTransports: TransportMode[];
  originLabel: string | null;
  onToggle: (transport: TransportMode) => void;
  onToggleAll: () => void;
};

function OriginContext({
  label,
  location,
}: {
  label: string;
  location: string;
}) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-[#bddbd6] bg-[#e9f6f2]/78 px-3.5 py-2 text-sm text-[#315e62] shadow-sm backdrop-blur-sm dark:border-[#63aaa4]/25 dark:bg-[#10383d]/62 dark:text-[#c9e4e1]">
      <span aria-hidden="true" className="flex shrink-0 items-center gap-0.5">
        <span className="size-1.5 rounded-full bg-[#3a8e8d] dark:bg-[#73d1ca]" />
        <span className="h-px w-3 bg-[#80b8b3] dark:bg-[#68aaa5]" />
        <span className="size-1.5 rounded-full border border-[#3a8e8d] dark:border-[#73d1ca]" />
      </span>
      <span className="shrink-0 font-medium">{label}</span>
      <span aria-hidden="true" className="text-[#77a19e] dark:text-[#78aaa6]">
        ·
      </span>
      <span className="min-w-0 truncate font-bold">{location}</span>
    </div>
  );
}

export default function QuestionNine({
  questionLabel,
  copy,
  selectedTransports,
  originLabel,
  onToggle,
  onToggleAll,
}: QuestionNineProps) {
  const allSelected = transportOptions.every((transport) =>
    selectedTransports.includes(transport),
  );
  const resolvedOrigin = originLabel?.trim() ?? "";

  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-9-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>

        {resolvedOrigin.length > 0 ? (
          <div className="mt-4">
            <OriginContext label={copy.startingFrom} location={resolvedOrigin} />
          </div>
        ) : null}
      </header>

      <fieldset className="mt-6">
        <legend className="sr-only">{copy.sectionLabel}</legend>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
              {copy.sectionLabel}
            </p>
            <p className="mt-1 text-sm text-[#5c777a] dark:text-[#adc5c4]">
              {copy.sectionHelper}
            </p>
          </div>

          <button
            type="button"
            aria-label={
              allSelected
                ? copy.accessibility.clearAll
                : copy.accessibility.selectAll
            }
            aria-pressed={allSelected}
            onClick={onToggleAll}
            className={`inline-flex min-h-10 w-fit cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${
              allSelected
                ? "border-[#55c9c5] bg-[#123f46] text-[#f4fffd] shadow-[0_10px_24px_rgba(12,70,76,0.16)]"
                : "border-[#bfd7d3] bg-white/64 text-[#28585c] hover:border-[#72aaa5] hover:bg-white dark:border-white/14 dark:bg-white/[0.06] dark:text-[#d7e9e7] dark:hover:border-[#71bbb5] dark:hover:bg-white/10"
            }`}
          >
            <span
              aria-hidden="true"
              className={`grid size-5 place-items-center rounded-full border ${
                allSelected
                  ? "border-[#75ddd6] bg-[#65cec8] text-[#092e33]"
                  : "border-[#7ea9a6]/55 text-[#4f8584] dark:text-[#8bc6c1]"
              }`}
            >
              {allSelected ? (
                <svg viewBox="0 0 16 16" fill="none" className="size-3">
                  <path
                    d="m3 8 3 3 7-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>
            {copy.openToAnything}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {transportOptions.map((transport) => (
            <TransportCard
              key={transport}
              mode={transport}
              label={copy.options[transport]}
              description={copy.descriptions[transport]}
              selected={selectedTransports.includes(transport)}
              onClick={() => onToggle(transport)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
