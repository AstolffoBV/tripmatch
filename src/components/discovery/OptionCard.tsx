type OptionCardProps = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function OptionCard({
  label,
  description,
  selected,
  onClick,
  disabled = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl border px-6 py-6 text-left transition enabled:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:outline-white ${
        selected
          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
          : "border-gray-300 hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900"
      }`}
    >
      <span className="block text-lg font-semibold">{label}</span>
      {description ? (
        <span className="mt-2 block text-sm opacity-75">{description}</span>
      ) : null}
    </button>
  );
}
