export const locationLanguages = ["en", "ro", "es", "de", "fr"] as const;

export type LocationLanguage = (typeof locationLanguages)[number];

export type LocationResult = {
  id: string;
  label: string;
  primaryLabel: string;
  secondaryLabel: string | null;
  street: string | null;
  houseNumber: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
};
