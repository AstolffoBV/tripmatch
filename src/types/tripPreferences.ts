export type TripType =
  | "Beach"
  | "Mountains"
  | "City"
  | "Nature"
  | "Culture"
  | "Entertainment"
  | "Concert / Event";

export type TravellerGroup = "solo" | "couple" | "family" | "friends" | "other";

export interface TravellerPreferences {
  groupType: TravellerGroup | null;
  adults: number;
  children: number;
  pets: number;
  rooms: number;
  beds: number;
}

export type BudgetMode = "total" | "perTraveller";
export type Currency = "RON" | "EUR" | "USD" | "GBP";

export interface BudgetPreferences {
  mode: BudgetMode;
  currency: Currency;
  total: number | null;
  perTraveller: number | null;
}

export type AccommodationType =
  | "Hotel"
  | "Resort"
  | "Apartment"
  | "Villa / Holiday home"
  | "Hostel"
  | "Camping"
  | "No preference";

export type MealPreference =
  | "All inclusive"
  | "Half board"
  | "Breakfast included"
  | "Mostly eat at restaurants"
  | "Self-catering / cook myself"
  | "No preference";

export type TimingMode = "exact" | "rough" | "flexible";

export type TravelMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface TimingPreferences {
  mode: TimingMode | null;
  departureDate: string;
  returnDate: string;
  month: TravelMonth | null;
  year: number | null;
  exactNights: number | null;
}

export type DurationPreference =
  | "weekend"
  | "short"
  | "week"
  | "long"
  | "extended";

export type OriginMode = "currentLocation" | "manual";
export type LocationRequestStatus = "idle" | "requesting" | "success" | "error";

export interface OriginPreferences {
  mode: OriginMode | null;
  manualLocation: string;
  latitude: number | null;
  longitude: number | null;
  locationStatus: LocationRequestStatus;
  locationError: string | null;
}

export type TransportMode = "Car" | "Plane" | "Train" | "Coach" | "Ferry";

export type QuestionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DiscoveryStep = QuestionNumber | "summary";

export interface TripPreferences {
  tripType: TripType | null;
  travellers: TravellerPreferences;
  budget: BudgetPreferences;
  accommodation: AccommodationType[];
  meals: MealPreference[];
  timing: TimingPreferences;
  duration: DurationPreference | null;
  origin: OriginPreferences;
  transport: TransportMode[];
}
