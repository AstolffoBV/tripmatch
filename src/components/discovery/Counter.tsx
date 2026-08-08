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
}: CounterProps) {
  const cannotDecrease = fixed || value <= min;
  const cannotIncrease = fixed || (max !== undefined && value >= max);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700">
      <div>
        <p className="font-medium">{label}</p>
        {fixed ? (
          <p className="text-xs text-gray-500">{automaticLabel}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={decreaseLabel}
          disabled={cannotDecrease}
          onClick={() => onChange(value - 1)}
          className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-lg font-semibold transition enabled:cursor-pointer hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-35 dark:border-gray-700 dark:hover:border-gray-500"
        >
          −
        </button>

        <span className="w-8 text-center text-lg font-semibold" aria-live="polite">
          {value}
        </span>

        <button
          type="button"
          aria-label={increaseLabel}
          disabled={cannotIncrease}
          onClick={() => onChange(value + 1)}
          className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-lg font-semibold transition enabled:cursor-pointer hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-35 dark:border-gray-700 dark:hover:border-gray-500"
        >
          +
        </button>
      </div>
    </div>
  );
}
