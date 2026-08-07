"use client";

import { useState } from "react";

const tripTypes = [
  "Beach",
  "Mountains",
  "City",
  "Nature",
  "Culture",
  "Entertainment",
] as const;

type TripType = (typeof tripTypes)[number];

export default function DiscoverPage() {
  const [selectedTripType, setSelectedTripType] =
    useState<TripType | null>(null);

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
          {tripTypes.map((tripType) => {
            const isSelected = selectedTripType === tripType;

            return (
              <button
                key={tripType}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedTripType(tripType)}
                className={`rounded-xl border px-6 py-8 text-lg font-semibold transition ${
                  isSelected
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-gray-300 hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900"
                }`}
              >
                {tripType}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={selectedTripType === null}
          className="mt-8 rounded-xl bg-black px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:bg-white dark:text-black dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
