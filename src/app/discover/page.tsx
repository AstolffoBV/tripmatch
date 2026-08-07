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

const temperatureOptions = [
  { label: "Cool", description: "Below 18°C" },
  { label: "Mild", description: "18–23°C" },
  { label: "Warm", description: "24–29°C" },
  { label: "Hot", description: "30°C and above" },
] as const;

type Temperature = (typeof temperatureOptions)[number]["label"];
type DiscoveryStep = 1 | 2;

export default function DiscoverPage() {
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>(1);
  const [selectedTripType, setSelectedTripType] =
    useState<TripType | null>(null);
  const [selectedTemperature, setSelectedTemperature] =
    useState<Temperature | null>(null);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-sm font-medium text-gray-500">
          Step {currentStep} of 2
        </p>

        {currentStep === 1 ? (
          <section>
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
              onClick={() => setCurrentStep(2)}
              className="mt-8 rounded-xl bg-black px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:bg-white dark:text-black dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
            >
              Continue
            </button>
          </section>
        ) : (
          <section>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Question 2
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              What temperature do you prefer?
            </h1>

            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Choose the climate that feels best for your trip.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {temperatureOptions.map((temperature) => {
                const isSelected =
                  selectedTemperature === temperature.label;

                return (
                  <button
                    key={temperature.label}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedTemperature(temperature.label)
                    }
                    className={`rounded-xl border px-6 py-6 text-left transition ${
                      isSelected
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="block text-lg font-semibold">
                      {temperature.label}
                    </span>
                    <span className="mt-2 block text-sm opacity-75">
                      {temperature.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-900"
              >
                Back
              </button>

              <button
                type="button"
                disabled={selectedTemperature === null}
                className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:bg-white dark:text-black dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
              >
                Continue
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
