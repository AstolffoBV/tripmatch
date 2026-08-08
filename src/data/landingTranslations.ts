export const landingLanguages = [
  { code: "en", name: "English", shortLabel: "EN" },
  { code: "ro", name: "Română", shortLabel: "RO" },
  { code: "es", name: "Español", shortLabel: "ES" },
  { code: "de", name: "Deutsch", shortLabel: "DE" },
  { code: "fr", name: "Français", shortLabel: "FR" },
] as const;

export type LandingLanguage = (typeof landingLanguages)[number]["code"];
export type LandingScene = "beach" | "mountains" | "city" | "concert";

export const landingSceneOrder = [
  "beach",
  "mountains",
  "city",
  "concert",
] as const satisfies readonly LandingScene[];

type LandingCopy = {
  brand: string;
  tagline: readonly [string, string];
  cta: string;
  sceneBeach: string;
  sceneMountains: string;
  sceneCity: string;
  sceneConcerts: string;
  languageSelectorLabel: string;
};

export const landingTranslations = {
  en: {
    brand: "TripMatch",
    tagline: [
      "Don't choose a destination.",
      "Let the destination choose you.",
    ],
    cta: "Find my destination",
    sceneBeach: "Beach",
    sceneMountains: "Mountains",
    sceneCity: "City",
    sceneConcerts: "Concerts",
    languageSelectorLabel: "Select language",
  },
  ro: {
    brand: "TripMatch",
    tagline: [
      "Nu alege o destinație.",
      "Lasă destinația să te aleagă.",
    ],
    cta: "Găsește-mi destinația",
    sceneBeach: "Plajă",
    sceneMountains: "Munți",
    sceneCity: "Oraș",
    sceneConcerts: "Concerte",
    languageSelectorLabel: "Selectează limba",
  },
  es: {
    brand: "TripMatch",
    tagline: [
      "No elijas un destino.",
      "Deja que el destino te elija a ti.",
    ],
    cta: "Encuentra mi destino",
    sceneBeach: "Playa",
    sceneMountains: "Montañas",
    sceneCity: "Ciudad",
    sceneConcerts: "Conciertos",
    languageSelectorLabel: "Seleccionar idioma",
  },
  de: {
    brand: "TripMatch",
    tagline: [
      "Wähle kein Reiseziel.",
      "Lass das Reiseziel dich wählen.",
    ],
    cta: "Finde mein Reiseziel",
    sceneBeach: "Strand",
    sceneMountains: "Berge",
    sceneCity: "Stadt",
    sceneConcerts: "Konzerte",
    languageSelectorLabel: "Sprache auswählen",
  },
  fr: {
    brand: "TripMatch",
    tagline: [
      "Ne choisissez pas une destination.",
      "Laissez la destination vous choisir.",
    ],
    cta: "Trouve ma destination",
    sceneBeach: "Plage",
    sceneMountains: "Montagnes",
    sceneCity: "Ville",
    sceneConcerts: "Concerts",
    languageSelectorLabel: "Choisir la langue",
  },
} satisfies Record<LandingLanguage, LandingCopy>;
