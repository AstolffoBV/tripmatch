import DestinationArtwork from "@/components/discovery/results/DestinationArtwork";
import type { DestinationId, DestinationVisual } from "@/types/destination";

type DestinationCardProps = {
  id: DestinationId;
  city: string;
  country: string;
  description: string;
  visual: DestinationVisual;
  matchLabel: string;
  distanceLabel: string | null;
  distanceAccessibleLabel: string | null;
  tags: readonly string[];
  reasons: readonly string[];
  whyLabel: string;
  viewTripLabel: string;
  hideTripLabel: string;
  detailPrototype: string;
  expanded: boolean;
  onToggleExpanded: () => void;
};

export default function DestinationCard({
  id,
  city,
  country,
  description,
  visual,
  matchLabel,
  distanceLabel,
  distanceAccessibleLabel,
  tags,
  reasons,
  whyLabel,
  viewTripLabel,
  hideTripLabel,
  detailPrototype,
  expanded,
  onToggleExpanded,
}: DestinationCardProps) {
  const titleId = `destination-${id}-title`;
  const detailId = `destination-${id}-prototype-detail`;

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.7rem] border border-[#c5dbd7] bg-white/76 shadow-[0_18px_46px_rgba(18,67,70,0.08)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-[#79b3ae] hover:shadow-[0_22px_52px_rgba(18,67,70,0.12)] motion-reduce:transition-none dark:border-white/12 dark:bg-white/[0.06] dark:hover:border-[#71bbb5]/55"
    >
      <DestinationArtwork visual={visual} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <header className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#5e7b7f] dark:text-[#a8c3c1]">
              {country}
            </p>
            <h3
              id={titleId}
              className="mt-1 text-[1.75rem] leading-tight font-bold tracking-[-0.04em] text-[#10363c] dark:text-[#f2fbf9]"
            >
              {city}
            </h3>
          </div>

          <span className="shrink-0 rounded-full border border-[#66bbb5]/45 bg-[#123f46] px-3 py-1.5 text-sm font-bold whitespace-nowrap text-white shadow-sm dark:bg-[#72d0c9] dark:text-[#092e33]">
            {matchLabel}
          </span>
        </header>

        <p className="mt-3 text-sm leading-6 text-[#4b686c] dark:text-[#b7cecc]">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#c9dfdb] bg-[#eaf6f3]/88 px-2.5 py-1 text-xs font-semibold text-[#315e62] dark:border-white/10 dark:bg-white/[0.07] dark:text-[#b9d9d6]"
            >
              {tag}
            </li>
          ))}
        </ul>

        {distanceLabel !== null && distanceAccessibleLabel !== null ? (
          <p
            aria-label={distanceAccessibleLabel}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#315e62] dark:text-[#b9d9d6]"
          >
            <span aria-hidden="true" className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[#3a8e8d] dark:bg-[#73d1ca]" />
              <span className="h-px w-5 bg-[#80b8b3] dark:bg-[#68aaa5]" />
              <span className="size-1.5 rounded-full border border-[#3a8e8d] dark:border-[#73d1ca]" />
            </span>
            <span aria-hidden="true">{distanceLabel}</span>
          </p>
        ) : null}

        <div className="mt-5 border-t border-[#d3e3df] pt-5 dark:border-white/10">
          <h4 className="text-sm font-bold tracking-[-0.01em] text-[#153e43] dark:text-[#eef9f7]">
            {whyLabel}
          </h4>
          <ul className="mt-3 space-y-2.5">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-2.5 text-sm leading-5 text-[#4a686b] dark:text-[#bad0ce]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-[#75b9b4] text-[#28777b] dark:border-[#69bcb5]/60 dark:text-[#82d9d2]"
                >
                  <svg viewBox="0 0 12 12" fill="none" className="size-2.5">
                    <path
                      d="m2.25 6 2.1 2.1 5.4-5.15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </svg>
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-5">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={detailId}
            onClick={onToggleExpanded}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#123f46] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-0.5 hover:bg-[#0d343a] hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none dark:bg-[#72d0c9] dark:text-[#092e33] dark:hover:bg-[#8bddd6]"
          >
            {expanded ? hideTripLabel : viewTripLabel}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className={`size-4 transition-transform motion-reduce:transition-none ${
                expanded ? "rotate-90" : ""
              }`}
            >
              <path
                d="m6 3.5 4.5 4.5L6 12.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>

          {expanded ? (
            <div
              id={detailId}
              role="region"
              aria-live="polite"
              className="mt-3 rounded-xl border border-[#c9dfdb] bg-[#eef8f5]/86 p-3.5 text-sm leading-5 text-[#44666a] dark:border-white/10 dark:bg-white/[0.055] dark:text-[#bdd3d1]"
            >
              {detailPrototype}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
