import type { TravellerGroup } from "@/types/tripPreferences";

type TravellerGroupCardProps = {
  group: TravellerGroup;
  index: number;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

type Figure = {
  x: number;
  y: number;
  scale: number;
};

const groupFigures = {
  solo: [{ x: 80, y: 12, scale: 1.05 }],
  couple: [
    { x: 62, y: 14, scale: 0.98 },
    { x: 98, y: 14, scale: 0.98 },
  ],
  family: [
    { x: 50, y: 16, scale: 0.92 },
    { x: 82, y: 13, scale: 1 },
    { x: 112, y: 25, scale: 0.68 },
  ],
  friends: [
    { x: 48, y: 18, scale: 0.84 },
    { x: 80, y: 11, scale: 1 },
    { x: 113, y: 18, scale: 0.84 },
  ],
  other: [
    { x: 47, y: 23, scale: 0.7 },
    { x: 80, y: 12, scale: 1 },
    { x: 114, y: 18, scale: 0.82 },
  ],
} as const satisfies Record<TravellerGroup, readonly Figure[]>;

function PersonFigure({ x, y, scale }: Figure) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="8" r="7" fill="currentColor" />
      <path
        d="M-14 39c1-13 6-20 14-20s13 7 14 20v4h-28Z"
        fill="currentColor"
      />
      <path
        d="M-9 42v13M9 42v13"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </g>
  );
}

function GroupArtwork({ group }: { group: TravellerGroup }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 160 76"
      className="h-16 w-full"
    >
      <path
        d="M12 69c28-7 106-7 136 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
      <path
        d="M28 63c17 5 87 8 105-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.09"
        strokeWidth="7"
      />
      {groupFigures[group].map((figure, index) => (
        <PersonFigure key={`${figure.x}-${index}`} {...figure} />
      ))}
    </svg>
  );
}

export default function TravellerGroupCard({
  group,
  index,
  label,
  description,
  selected,
  onClick,
}: TravellerGroupCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative min-h-40 w-full cursor-pointer overflow-hidden rounded-[1.35rem] border p-4 text-left shadow-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b7c83] motion-safe:hover:-translate-y-1 ${
        selected
          ? "border-[#56c9c5] bg-[#123f46] text-[#f5fffd] shadow-[0_18px_40px_rgba(12,70,76,0.2)]"
          : "border-[#cfe0dc] bg-white/75 text-[#14383d] hover:border-[#73bdb8] hover:bg-white hover:shadow-[0_16px_34px_rgba(21,75,77,0.1)] dark:border-white/12 dark:bg-white/7 dark:text-[#edf9f7] dark:hover:border-[#58aaa8] dark:hover:bg-white/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -right-7 -top-8 size-24 rounded-full border transition-colors ${
          selected
            ? "border-white/15 bg-[#67d9d1]/10"
            : "border-[#52aaa5]/12 bg-[#8ddbd5]/8 dark:border-white/10"
        }`}
      />

      <span className="relative flex items-start justify-between gap-3">
        <span
          className={`text-[0.65rem] font-bold tracking-[0.2em] ${
            selected ? "text-[#c1ddda]" : "text-[#4b666b] dark:text-[#aac4c4]"
          }`}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className={`grid size-6 place-items-center rounded-full border transition ${
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

      <span className="relative mt-1 block text-[#257077] transition-colors group-aria-pressed:text-[#bff7f1] dark:text-[#7dc9c5]">
        <GroupArtwork group={group} />
      </span>

      <span className="relative mt-1 block text-base font-bold tracking-[-0.02em]">
        {label}
      </span>
      <span
        className={`relative mt-0.5 block text-xs leading-5 ${
          selected ? "text-[#c1ddda]" : "text-[#4b666b] dark:text-[#aec6c6]"
        }`}
      >
        {description}
      </span>
    </button>
  );
}
