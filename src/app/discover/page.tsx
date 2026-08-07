const tripTypes = [
  "Beach",
  "Mountains",
  "City",
  "Nature",
  "Culture",
  "Entertainment",
];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Question 1
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          What kind of trip are you looking for?
        </h1>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Choose what matters most to you.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tripTypes.map((tripType) => (
            <button
              key={tripType}
              type="button"
              className="rounded-xl border border-gray-300 px-6 py-8 text-lg font-semibold transition hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900"
            >
              {tripType}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
