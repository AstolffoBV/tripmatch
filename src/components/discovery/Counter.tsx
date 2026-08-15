type CounterProps = {
  label: string;
  automaticLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  fixed?: boolean;
  appearance?: "card" | "row";
};

export default function Counter({
  label,
  automaticLabel,
  decreaseLabel,
  increaseLabel,
  value,
  onChange,
  min = 0,
  max,
  fixed = false,
  appearance = "card",
}: CounterProps) {
  const cannotDecrease = fixed || value <= min;
  const cannotIncrease = fixed || (max !== undefined && value >= max);
  const isRow = appearance === "row";
  const containerClasses = isRow
    ? "flex min-h-[4.5rem] items-center justify-between gap-4 px-4 py-3 sm:px-5"
    : "flex items-center justify-between gap-4 rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700";
  const labelClasses = isRow
    ? "font-semibold text-[#173b40] dark:text-[#edf9f7]"
    : "font-medium";
  const helperClasses = isRow
    ? "mt-0.5 text-xs text-[#4b666b] dark:text-[#a9c2c3]"
    : "text-xs text-gray-500";
  const buttonClasses = `flex items-center justify-center rounded-full border text-lg font-semibold transition enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-35 ${
    isRow
      ? "size-11 border-[#bfd5d1] bg-white/80 text-[#17464c] shadow-sm enabled:hover:border-[#55aaa7] enabled:hover:bg-[#e9f8f5] enabled:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] dark:border-white/15 dark:bg-white/8 dark:text-[#e9f8f5] dark:enabled:hover:border-[#64bbb6] dark:enabled:hover:bg-white/12"
      : "size-9 border-gray-300 hover:border-gray-500 dark:border-gray-700 dark:hover:border-gray-500"
  }`;
  const valueClasses = isRow
    ? "w-9 text-center text-xl font-bold tabular-nums text-[#12383e] dark:text-[#f3fcfa]"
    : "w-8 text-center text-lg font-semibold";

  return (
    <div className={containerClasses}>
      <div className="min-w-0">
        <p className={labelClasses}>{label}</p>
        {fixed ? (
          <p className={helperClasses}>{automaticLabel}</p>
        ) : null}
      </div>

      <div className={`flex shrink-0 items-center ${isRow ? "gap-2" : "gap-3"}`}>
        <button
          type="button"
          aria-label={decreaseLabel}
          disabled={cannotDecrease}
          onClick={() => onChange(value - 1)}
          className={buttonClasses}
        >
          −
        </button>

        <span
          className={valueClasses}
          aria-live="polite"
        >
          {value}
        </span>

        <button
          type="button"
          aria-label={increaseLabel}
          disabled={cannotIncrease}
          onClick={() => onChange(value + 1)}
          className={buttonClasses}
        >
          +
        </button>
      </div>
    </div>
  );
}
