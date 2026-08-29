import type {
  AccommodationType,
  BudgetMode,
  Currency,
  DateFlexibilityDays,
  DurationPreference,
  MealPreference,
  OriginMode,
  TimingMode,
  TransportMode,
  TravelMonth,
  TravellerGroup,
  TripType,
} from "@/types/tripPreferences";

type LabeledOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export const tripTypeOptions = [
  "Beach",
  "Mountains",
  "City",
  "Nature",
  "Culture",
  "Entertainment",
  "Concert / Event",
] as const satisfies readonly TripType[];

export const travellerGroupOptions = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "other", label: "Other" },
] as const satisfies readonly LabeledOption<TravellerGroup>[];

export const budgetModeOptions = [
  { value: "total", label: "Total trip budget" },
  { value: "perTraveller", label: "Budget per traveller" },
] as const satisfies readonly LabeledOption<BudgetMode>[];

export const currencies = ["RON", "EUR", "USD", "GBP"] as const satisfies readonly Currency[];

export const accommodationOptions = [
  "Hotel",
  "Resort",
  "Apartment",
  "Villa / Holiday home",
  "Hostel",
  "Camping",
  "No preference",
] as const satisfies readonly AccommodationType[];

export const mealOptions = [
  "All inclusive",
  "Half board",
  "Breakfast included",
  "Mostly eat at restaurants",
  "Self-catering / cook myself",
  "No preference",
] as const satisfies readonly MealPreference[];

export const timingModeOptions = [
  { value: "exact", label: "I know my exact dates" },
  { value: "rough", label: "I know roughly when" },
  { value: "flexible", label: "I'm flexible" },
] as const satisfies readonly LabeledOption<TimingMode>[];

export const dateFlexibilityOptions = [
  0,
  1,
  2,
  3,
  7,
] as const satisfies readonly DateFlexibilityDays[];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const satisfies readonly TravelMonth[];

export const durationOptions = [
  { value: "weekend", label: "Weekend", description: "2–3 days" },
  { value: "short", label: "Short trip", description: "4–5 days" },
  { value: "week", label: "About a week", description: "6–8 days" },
  { value: "long", label: "Long holiday", description: "9–14 days" },
  { value: "extended", label: "Extended trip", description: "15+ days" },
] as const satisfies readonly LabeledOption<DurationPreference>[];

export const originModeOptions = [
  { value: "currentLocation", label: "Use my current location" },
  { value: "manual", label: "Enter a city manually" },
] as const satisfies readonly LabeledOption<OriginMode>[];

export const transportOptions = [
  "Car",
  "Plane",
  "Train",
  "Coach",
  "Ferry",
] as const satisfies readonly TransportMode[];
