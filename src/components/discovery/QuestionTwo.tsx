import Counter from "@/components/discovery/Counter";
import TravellerGroupCard from "@/components/discovery/TravellerGroupCard";
import { travellerGroupOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type {
  TravellerGroup,
  TravellerPreferences,
} from "@/types/tripPreferences";

type CounterLabels = {
  automaticLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
};

type QuestionTwoProps = {
  questionLabel: string;
  copy: Translation["discover"]["q2"];
  travellers: TravellerPreferences;
  groupType: TravellerGroup | null;
  adultsAreFixed: boolean;
  childrenAreFixed: boolean;
  roomsAndBedsAreFixed: boolean;
  counterLabels: (label: string) => CounterLabels;
  onSelectGroup: (group: TravellerGroup) => void;
  onChangeTraveller: (
    field: "adults" | "children" | "pets" | "rooms" | "beds",
    value: number,
  ) => void;
};

function SetupArtwork() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 64"
      className="size-10"
    >
      <path
        d="M11 43V24m0 12h42v15M17 36V25h15c7 0 10 4 10 11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M11 45h42"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d="M18 26h9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export default function QuestionTwo({
  questionLabel,
  copy,
  travellers,
  groupType,
  adultsAreFixed,
  childrenAreFixed,
  roomsAndBedsAreFixed,
  counterLabels,
  onSelectGroup,
  onChangeTraveller,
}: QuestionTwoProps) {
  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-2-title"
          className="mt-3 max-w-2xl text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {travellerGroupOptions.map((option, index) => (
          <div
            key={option.value}
            className={
              index === travellerGroupOptions.length - 1
                ? "col-span-2 mx-auto w-[48%] sm:col-span-1 sm:mx-0 sm:w-auto"
                : ""
            }
          >
            <TravellerGroupCard
              group={option.value}
              index={index + 1}
              label={copy.groups[option.value]}
              description={copy.groupDescriptions[option.value]}
              selected={groupType === option.value}
              onClick={() => onSelectGroup(option.value)}
            />
          </div>
        ))}
      </div>

      {groupType !== null ? (
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <section
            aria-labelledby="traveller-configuration-heading"
            className="overflow-hidden rounded-[1.6rem] border border-[#d1e2de] bg-white/78 shadow-[0_20px_55px_rgba(31,83,83,0.08)] backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.065]"
          >
            <header className="flex items-end justify-between gap-4 border-b border-[#dce9e6] px-4 py-4 sm:px-5 dark:border-white/10">
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
                  {copy.yourGroup}
                </p>
                <h2
                  id="traveller-configuration-heading"
                  className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#13373c] dark:text-[#f2fbf9]"
                >
                  {copy.groups[groupType]}
                </h2>
              </div>
              <span
                aria-hidden="true"
                className="mb-1 h-px w-16 bg-gradient-to-r from-transparent to-[#68bdb8]/70"
              />
            </header>

            <div className="divide-y divide-[#e1ece9] dark:divide-white/10">
              <Counter
                appearance="row"
                label={copy.adults}
                {...counterLabels(copy.adults)}
                value={travellers.adults}
                min={groupType === "friends" ? 2 : 0}
                fixed={adultsAreFixed}
                onChange={(value) => onChangeTraveller("adults", value)}
              />
              <Counter
                appearance="row"
                label={copy.children}
                {...counterLabels(copy.children)}
                value={travellers.children}
                min={groupType === "family" ? 1 : 0}
                fixed={childrenAreFixed}
                onChange={(value) => onChangeTraveller("children", value)}
              />
              <Counter
                appearance="row"
                label={copy.pets}
                {...counterLabels(copy.pets)}
                value={travellers.pets}
                onChange={(value) => onChangeTraveller("pets", value)}
              />
              <Counter
                appearance="row"
                label={
                  groupType === "family"
                    ? copy.suggestedBedrooms
                    : copy.rooms
                }
                {...counterLabels(
                  groupType === "family"
                    ? copy.suggestedBedrooms
                    : copy.rooms,
                )}
                value={travellers.rooms}
                min={1}
                fixed={roomsAndBedsAreFixed}
                onChange={(value) => onChangeTraveller("rooms", value)}
              />
              <Counter
                appearance="row"
                label={copy.beds}
                {...counterLabels(copy.beds)}
                value={travellers.beds}
                min={1}
                fixed={roomsAndBedsAreFixed}
                onChange={(value) => onChangeTraveller("beds", value)}
              />
            </div>

            {groupType === "family" || groupType === "other" ? (
              <p className="border-t border-[#dce9e6] bg-[#f0f8f6]/80 px-4 py-3 text-xs leading-5 text-[#4b666b] sm:px-5 dark:border-white/10 dark:bg-white/[0.035] dark:text-[#adc5c5]">
                {copy.underEighteen}
              </p>
            ) : null}
          </section>

          {groupType === "couple" || groupType === "family" ? (
            <aside className="rounded-[1.6rem] border border-[#b8dcd6] bg-[#e9f7f3]/88 p-5 text-[#154147] shadow-[0_18px_45px_rgba(33,107,103,0.1)] backdrop-blur-sm dark:border-[#66aaa4]/25 dark:bg-[#10383d]/80 dark:text-[#e9faf7]">
              <div className="flex items-start gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/70 text-[#277d7e] shadow-sm dark:bg-white/10 dark:text-[#84d4cd]">
                  <SetupArtwork />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#aed0cd]">
                    {copy.yourSetup}
                  </p>
                  <h2 className="mt-1 font-bold tracking-[-0.02em]">
                    {copy.sleepingSetup}
                  </h2>
                </div>
              </div>

              <div className="mt-5 border-t border-[#91c9c1]/45 pt-4 text-sm leading-6 text-[#426a6d] dark:border-white/12 dark:text-[#c2dad8]">
                <p>1 × {copy.doubleBed.one}</p>
                {groupType === "family" ? (
                  <p>
                    {travellers.children} × {travellers.children === 1
                      ? copy.singleBed.one
                      : copy.singleBed.other}
                  </p>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
