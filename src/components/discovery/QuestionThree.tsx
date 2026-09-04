import { budgetModeOptions, currencies } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import type {
  BudgetMode,
  BudgetPreferences,
  Currency,
} from "@/types/tripPreferences";

type QuestionThreeProps = {
  questionLabel: string;
  copy: Translation["discover"]["q3"];
  budget: BudgetPreferences;
  activeAmount: number | null;
  travellerLabel: string;
  equivalentText: string | null;
  onSelectMode: (mode: BudgetMode) => void;
  onChangeAmount: (value: string) => void;
  onChangeCurrency: (currency: Currency) => void;
};

function TravellerIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="size-4"
    >
      <circle cx="12" cy="7" r="3" fill="currentColor" />
      <path
        d="M6.5 19c.4-5.2 2.2-8 5.5-8s5.1 2.8 5.5 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

export default function QuestionThree({
  questionLabel,
  copy,
  budget,
  activeAmount,
  travellerLabel,
  equivalentText,
  onSelectMode,
  onChangeAmount,
  onChangeCurrency,
}: QuestionThreeProps) {
  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-3-title"
          className="mt-3 max-w-2xl text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>

        <span className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-[#bcd9d4] bg-[#e9f7f3]/80 px-3.5 py-1.5 text-sm font-semibold text-[#315b5f] shadow-sm backdrop-blur-sm dark:border-[#70aaa5]/25 dark:bg-white/7 dark:text-[#c9e3e0]">
          <TravellerIcon />
          {travellerLabel}
        </span>
      </header>

      <div className="mt-9 max-w-[50rem] space-y-8">
        <fieldset>
          <legend className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
            {copy.budgetType}
          </legend>
          <div className="grid grid-cols-2 gap-1.5 rounded-[1.15rem] border border-[#c6dcd8] bg-white/55 p-1.5 shadow-sm backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.055]">
            {budgetModeOptions.map((option) => {
              const selected = budget.mode === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectMode(option.value)}
                  className={`min-h-12 cursor-pointer rounded-[0.85rem] px-3 py-2.5 text-sm leading-5 font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transition-none sm:text-base dark:focus-visible:outline-[#83d9d2] ${
                    selected
                      ? "bg-[#123f46] text-[#f5fffd] shadow-[0_10px_28px_rgba(13,64,70,0.18)] hover:bg-[#0d343a] hover:shadow-[0_12px_30px_rgba(13,64,70,0.21)] dark:border-[#55c9c5] dark:bg-[#123f46] dark:text-[#f5fffd] dark:hover:bg-[#164b51] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
                      : "text-[#315b5f] hover:bg-white/85 hover:text-[#153e44] dark:text-[#c4dddd] dark:hover:bg-white/9 dark:hover:text-white"
                  }`}
                >
                  {copy.modes[option.value]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
            {copy.yourBudget}
          </p>

          <div className="grid min-h-[6.5rem] grid-cols-[minmax(0,1fr)_6.75rem] overflow-hidden rounded-[1.5rem] border border-[#bdd8d3] bg-white/72 shadow-[0_22px_55px_rgba(25,77,79,0.09)] backdrop-blur-sm transition duration-200 focus-within:border-[#4faaa6] focus-within:ring-3 focus-within:ring-[#71c8c1]/18 motion-reduce:transition-none dark:border-white/14 dark:bg-white/[0.065] dark:focus-within:border-[#70c5bf] dark:focus-within:ring-[#83d9d2]/14">
            <label className="flex min-w-0 items-center px-5 sm:px-7">
              <span className="sr-only">{copy.modes[budget.mode]}</span>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                value={activeAmount ?? ""}
                onChange={(event) => onChangeAmount(event.target.value)}
                aria-describedby={
                  equivalentText === null ? undefined : "budget-equivalent"
                }
                className="min-w-0 w-full appearance-none bg-transparent text-[2rem] leading-none font-bold tracking-[-0.04em] text-[#10343a] tabular-nums outline-none placeholder:text-[#8ca4a4] sm:text-[2.5rem] dark:text-[#f3fbfa] dark:placeholder:text-[#668082] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder={copy.amountPlaceholder}
              />
            </label>

            <label className="relative flex items-center border-l border-[#c9deda] px-3 transition-colors duration-200 hover:bg-[#f5fbf9]/70 motion-reduce:transition-none dark:border-white/12 dark:hover:bg-white/[0.04]">
              <span className="sr-only">{copy.currency}</span>
              <select
                value={budget.currency}
                onChange={(event) =>
                  onChangeCurrency(event.target.value as Currency)
                }
                className="h-full w-full cursor-pointer appearance-none bg-transparent pr-6 text-base font-bold text-[#17454a] outline-none focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] dark:text-[#e9f7f5] dark:focus-visible:outline-[#83d9d2]"
              >
                {currencies.map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                    className="bg-white text-[#17454a] dark:bg-[#102f35] dark:text-[#edf8f7]"
                  >
                    {currency}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="pointer-events-none absolute right-3 size-4 text-[#527276] dark:text-[#a9c4c3]"
              >
                <path
                  d="m6 8 4 4 4-4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </label>
          </div>

          {equivalentText !== null ? (
            <p
              id="budget-equivalent"
              aria-live="polite"
              className="mt-4 flex min-h-12 items-center rounded-2xl border border-[#c9e0dc] bg-[#eaf7f4]/68 px-4 py-3 text-sm font-medium text-[#365f63] shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.045] dark:text-[#c3dddd]"
            >
              {equivalentText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
