import type {
  TripSubtype,
  TripSubtypeByType,
  TripType,
} from "@/types/tripPreferences";

export type TripThemePalette = {
  from: string;
  via: string;
  to: string;
  accent: string;
  foreground: string;
  muted: string;
};

type TripSubtypeOption<Type extends TripType> = {
  value: TripSubtypeByType[Type];
  palette?: Partial<TripThemePalette>;
};

type AnyTripSubtypeOption = {
  value: TripSubtype;
  palette?: Partial<TripThemePalette>;
};

type TripTypeThemeConfig = {
  [Type in TripType]: {
    slug: string;
    basePalette: TripThemePalette;
    subtypes: readonly TripSubtypeOption<Type>[];
  };
};

export const neutralTripTheme: TripThemePalette = {
  from: "#f5f1e8",
  via: "#dfe7e5",
  to: "#b8c8c8",
  accent: "#f6d7a7",
  foreground: "#fffdf8",
  muted: "#e8efed",
};

export const tripTypeThemes = {
  Beach: {
    slug: "beach",
    basePalette: {
      from: "#f2cc94",
      via: "#48bfc2",
      to: "#075c78",
      accent: "#ffe5a8",
      foreground: "#fffdf4",
      muted: "#d8f4ef",
    },
    subtypes: [
      {
        value: "beach-sandy",
        palette: {
          from: "#f4cd88",
          via: "#4ecbc3",
          to: "#087b97",
          accent: "#fff0b7",
        },
      },
      {
        value: "beach-rocky",
        palette: {
          from: "#a8aaa3",
          via: "#277b94",
          to: "#123d5d",
          accent: "#c7d1c9",
        },
      },
      {
        value: "beach-coves",
        palette: {
          from: "#b7a477",
          via: "#1c9b9a",
          to: "#064d68",
          accent: "#e8c98b",
        },
      },
      { value: "beach-any" },
    ],
  },
  Mountains: {
    slug: "mountains",
    basePalette: {
      from: "#9fb7b4",
      via: "#4d7477",
      to: "#173d49",
      accent: "#d7e8df",
      foreground: "#f7fbf9",
      muted: "#d7e5e3",
    },
    subtypes: [
      {
        value: "mountains-green",
        palette: {
          from: "#a9c69a",
          via: "#4f7d62",
          to: "#244e48",
          accent: "#d9e9b8",
        },
      },
      {
        value: "mountains-snowy",
        palette: {
          from: "#d9e7e9",
          via: "#6f91a1",
          to: "#294c62",
          accent: "#f4fbff",
        },
      },
      {
        value: "mountains-alpine-lakes",
        palette: {
          from: "#b7d3cc",
          via: "#3e8790",
          to: "#184d68",
          accent: "#c7f0e7",
        },
      },
      { value: "mountains-any" },
    ],
  },
  City: {
    slug: "city",
    basePalette: {
      from: "#dca778",
      via: "#8e6b67",
      to: "#364353",
      accent: "#ffd99b",
      foreground: "#fff8eb",
      muted: "#eddac9",
    },
    subtypes: [
      {
        value: "city-historic",
        palette: {
          from: "#d3a16f",
          via: "#9a6758",
          to: "#4e454b",
          accent: "#f2c789",
        },
      },
      {
        value: "city-modern",
        palette: {
          from: "#adc4ca",
          via: "#607d8e",
          to: "#283d52",
          accent: "#cde8ec",
        },
      },
      {
        value: "city-nightlife",
        palette: {
          from: "#d1796d",
          via: "#654d72",
          to: "#252a45",
          accent: "#ffc16f",
        },
      },
      { value: "city-any" },
    ],
  },
  Nature: {
    slug: "nature",
    basePalette: {
      from: "#9fbf8e",
      via: "#477461",
      to: "#183f3c",
      accent: "#d5dc9d",
      foreground: "#fbfff3",
      muted: "#dce9d6",
    },
    subtypes: [
      {
        value: "nature-camping",
        palette: {
          from: "#b9a871",
          via: "#54765c",
          to: "#1c443d",
          accent: "#f1c77e",
        },
      },
      {
        value: "nature-camper",
        palette: {
          from: "#c9ba93",
          via: "#668378",
          to: "#304f4e",
          accent: "#f0dbc0",
        },
      },
      {
        value: "nature-cabin",
        palette: {
          from: "#a88361",
          via: "#4d6b51",
          to: "#263f38",
          accent: "#e4b477",
        },
      },
      {
        value: "nature-hiking",
        palette: {
          from: "#c0c692",
          via: "#5b8260",
          to: "#244a40",
          accent: "#e9dc9d",
        },
      },
      { value: "nature-any" },
    ],
  },
  Culture: {
    slug: "culture",
    basePalette: {
      from: "#d6b48a",
      via: "#9f7163",
      to: "#543f4a",
      accent: "#f2cf98",
      foreground: "#fff9ef",
      muted: "#efddd1",
    },
    subtypes: [
      {
        value: "culture-art",
        palette: {
          from: "#d5b3a2",
          via: "#9e6877",
          to: "#4d3b56",
          accent: "#f1c6aa",
        },
      },
      {
        value: "culture-history",
        palette: {
          from: "#c9ae82",
          via: "#8b6858",
          to: "#4d4140",
          accent: "#e8c58b",
        },
      },
      {
        value: "culture-architecture",
        palette: {
          from: "#d7c0a3",
          via: "#8d766c",
          to: "#454c56",
          accent: "#f4debb",
        },
      },
      {
        value: "culture-traditions",
        palette: {
          from: "#cf9e76",
          via: "#98604d",
          to: "#543842",
          accent: "#f1c078",
        },
      },
      { value: "culture-any" },
    ],
  },
  Entertainment: {
    slug: "entertainment",
    basePalette: {
      from: "#dc9d7d",
      via: "#9b5f80",
      to: "#45365f",
      accent: "#ffd081",
      foreground: "#fff8f2",
      muted: "#edd8e7",
    },
    subtypes: [
      {
        value: "entertainment-theme-parks",
        palette: {
          from: "#e4ad78",
          via: "#a55e76",
          to: "#4c3c6b",
          accent: "#ffe08f",
        },
      },
      {
        value: "entertainment-nightlife",
        palette: {
          from: "#a45a86",
          via: "#65406f",
          to: "#25233f",
          accent: "#ffb65c",
        },
      },
      {
        value: "entertainment-shows",
        palette: {
          from: "#c9786c",
          via: "#85445d",
          to: "#3c2948",
          accent: "#ffd28a",
        },
      },
      {
        value: "entertainment-family",
        palette: {
          from: "#e2b27f",
          via: "#a56d83",
          to: "#53496c",
          accent: "#f8df9d",
        },
      },
      { value: "entertainment-any" },
    ],
  },
  "Concert / Event": {
    slug: "event",
    basePalette: {
      from: "#835c91",
      via: "#49365e",
      to: "#17172b",
      accent: "#e6b3ff",
      foreground: "#fff8ff",
      muted: "#dfd1e8",
    },
    subtypes: [
      {
        value: "event-concert",
        palette: {
          from: "#8b5796",
          via: "#4d315e",
          to: "#171629",
          accent: "#f0b5ff",
        },
      },
      {
        value: "event-festival",
        palette: {
          from: "#9a637f",
          via: "#514164",
          to: "#19223a",
          accent: "#ffc685",
        },
      },
      {
        value: "event-sport",
        palette: {
          from: "#55738f",
          via: "#384a68",
          to: "#182235",
          accent: "#a9d9e9",
        },
      },
      {
        value: "event-theatre",
        palette: {
          from: "#8d4e61",
          via: "#542b48",
          to: "#22172b",
          accent: "#efc17a",
        },
      },
      { value: "event-any" },
    ],
  },
} as const satisfies TripTypeThemeConfig;

export function getTripSubtypeOptions(
  tripType: TripType,
): readonly AnyTripSubtypeOption[] {
  return tripTypeThemes[tripType].subtypes;
}

export function isTripSubtypeForType<Type extends TripType>(
  tripType: Type,
  tripSubtype: TripSubtype | null,
): tripSubtype is TripSubtypeByType[Type] {
  if (tripSubtype === null) {
    return false;
  }

  return getTripSubtypeOptions(tripType).some(
    (option) => option.value === tripSubtype,
  );
}

export function getTripThemePalette(
  tripType: TripType,
  tripSubtype: TripSubtype | null,
): TripThemePalette {
  const config = tripTypeThemes[tripType];
  const subtype = (
    config.subtypes as readonly {
      value: TripSubtype;
      palette?: Partial<TripThemePalette>;
    }[]
  ).find((option) => option.value === tripSubtype);

  return {
    ...config.basePalette,
    ...subtype?.palette,
  };
}
