import type { LocationLanguage, LocationResult } from "@/types/location";

const DEFAULT_PHOTON_BASE_URL = "https://photon.komoot.io";
const DEFAULT_USER_AGENT = "TripMatch/0.1 (location picker)";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(object: JsonObject, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = object[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function readIdentifier(object: JsonObject, key: string): string | null {
  const value = object[key];

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

function isValidCoordinate(
  value: unknown,
  minimum: number,
  maximum: number,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= minimum &&
    value <= maximum
  );
}

function uniqueText(values: readonly (string | null)[]): string[] {
  const seen = new Set<string>();

  return values.filter((value): value is string => {
    if (!value) {
      return false;
    }

    const key = value.toLocaleLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function getSearchRank(result: LocationResult, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedPrimaryLabel = normalizeSearchText(result.primaryLabel);
  const normalizedLabel = normalizeSearchText(result.label);

  if (normalizedPrimaryLabel === normalizedQuery) {
    return 0;
  }

  if (normalizedPrimaryLabel.startsWith(normalizedQuery)) {
    return 1;
  }

  if (normalizedLabel.includes(normalizedQuery)) {
    return 2;
  }

  return 3;
}

function normalizeFeature(
  feature: unknown,
  index: number,
  mode: "search" | "reverse" = "search",
): LocationResult | null {
  if (!isObject(feature) || !isObject(feature.geometry)) {
    return null;
  }

  const coordinates = feature.geometry.coordinates;

  if (
    !Array.isArray(coordinates) ||
    !isValidCoordinate(coordinates[0], -180, 180) ||
    !isValidCoordinate(coordinates[1], -90, 90)
  ) {
    return null;
  }

  const properties = isObject(feature.properties) ? feature.properties : {};
  const longitude = coordinates[0];
  const latitude = coordinates[1];
  const name = readString(properties, ["name"]);
  const street = readString(properties, ["street"]);
  const houseNumber = readString(properties, ["housenumber", "house_number"]);
  const district = readString(properties, ["district"]);
  const city = readString(properties, [
    "city",
    "town",
    "village",
    "locality",
    "municipality",
  ]);
  const county = readString(properties, ["county"]);
  const state = readString(properties, ["state"]);
  const region = state ?? county;
  const country = readString(properties, ["country"]);
  const streetAddress = street
    ? uniqueText([street, houseNumber]).join(" ")
    : null;
  const primaryLabel =
    mode === "reverse"
    ? streetAddress ??
      city ??
      district ??
      region ??
      country ??
      name
    : (houseNumber ? streetAddress : null) ??
      name ??
      streetAddress ??
      city ??
      district ??
      region ??
      country;

  if (!primaryLabel) {
    return null;
  }

  const secondaryCandidates =
  mode === "reverse"
    ? streetAddress
      ? [city, country]
      : city
        ? [country]
        : [region, country]
    : [district, city, county, state, country];

  const secondaryParts = uniqueText(secondaryCandidates).filter(
    (part) => part.toLocaleLowerCase() !== primaryLabel.toLocaleLowerCase(),
  );
  const secondaryLabel = secondaryParts.length
    ? secondaryParts.join(", ")
    : null;
  const osmType = readIdentifier(properties, "osm_type");
  const osmId = readIdentifier(properties, "osm_id");
  const id = osmId
    ? `photon:${osmType ?? "osm"}:${osmId}`
    : `photon:${longitude}:${latitude}:${index}`;

  return {
    id,
    label: secondaryLabel
      ? `${primaryLabel}, ${secondaryLabel}`
      : primaryLabel,
    primaryLabel,
    secondaryLabel,
    street,
    houseNumber,
    city,
    region,
    country,
    latitude,
    longitude,
  };
}

function readFeatures(payload: unknown): unknown[] {
  if (!isObject(payload) || !Array.isArray(payload.features)) {
    throw new Error("The location provider returned an invalid response.");
  }

  return payload.features;
}

function getPhotonUrl(pathname: string): URL {
  const configuredBaseUrl = process.env.PHOTON_BASE_URL?.trim();
  const baseUrl = configuredBaseUrl || DEFAULT_PHOTON_BASE_URL;

  return new URL(pathname, baseUrl);
}

async function requestPhoton(
  url: URL,
  language: LocationLanguage,
  signal?: AbortSignal,
): Promise<unknown[]> {
  const configuredUserAgent =
    process.env.TRIPMATCH_GEOCODING_USER_AGENT?.trim();
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/geo+json, application/json",
      "Accept-Language": language,
      "User-Agent": configuredUserAgent || DEFAULT_USER_AGENT,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`The location provider returned ${response.status}.`);
  }

  const payload: unknown = await response.json();
  return readFeatures(payload);
}

// Photon is isolated behind this adapter so its public demo endpoint can be
// replaced by self-hosted or production geocoding infrastructure later.
export async function searchPhotonLocations(
  query: string,
  language: LocationLanguage,
  signal?: AbortSignal,
): Promise<LocationResult[]> {
  const url = getPhotonUrl("/api");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "5");
  url.searchParams.set("lang", language);

  const features = await requestPhoton(url, language, signal);
  const results = features
    .map((feature, index) => normalizeFeature(feature, index, "search"))
    .filter((result): result is LocationResult => result !== null)
    .sort((first, second) =>
      getSearchRank(first, query) - getSearchRank(second, query),
    );
  const uniqueResults = new Map<string, LocationResult>();

  for (const result of results) {
    if (!uniqueResults.has(result.id)) {
      uniqueResults.set(result.id, result);
    }
  }

  return [...uniqueResults.values()].slice(0, 5);
}

export async function reversePhotonLocation(
  latitude: number,
  longitude: number,
  language: LocationLanguage,
  signal?: AbortSignal,
): Promise<LocationResult | null> {
  const url = getPhotonUrl("/reverse");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("limit", "1");
  url.searchParams.set("lang", language);

  const features = await requestPhoton(url, language, signal);
  const result = normalizeFeature(features[0], 0, "reverse");

  // Photon returns the matched feature's point. Keep the coordinates the user
  // actually selected; reverse geocoding should enrich that point, not move it.
  return result ? { ...result, latitude, longitude } : null;
}
