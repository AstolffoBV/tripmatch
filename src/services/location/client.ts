import type { LanguageCode } from "@/data/translations";
import type { LocationResult } from "@/types/location";

const SEARCH_CACHE_LIMIT = 60;
const REVERSE_CACHE_LIMIT = 120;

const searchCache = new Map<string, LocationResult[]>();
const reverseCache = new Map<string, LocationResult | null>();

type JsonObject = Record<string, unknown>;

export class LocationServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocationServiceError";
  }
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isLocationResult(value: unknown): value is LocationResult {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.primaryLabel === "string" &&
    isNullableString(value.secondaryLabel) &&
    isNullableString(value.street) &&
    isNullableString(value.houseNumber) &&
    isNullableString(value.city) &&
    isNullableString(value.region) &&
    isNullableString(value.country) &&
    typeof value.latitude === "number" &&
    Number.isFinite(value.latitude) &&
    typeof value.longitude === "number" &&
    Number.isFinite(value.longitude)
  );
}

function rememberCompleted<K, V>(
  cache: Map<K, V>,
  key: K,
  value: V,
  limit: number,
) {
  if (cache.has(key)) {
    cache.delete(key);
  }

  cache.set(key, value);

  while (cache.size > limit) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey === undefined) {
      break;
    }

    cache.delete(oldestKey);
  }
}

async function postLocationRequest(
  body: JsonObject,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetch("/api/location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new LocationServiceError("The location service returned no data.");
  }

  if (!response.ok) {
    const message =
      isObject(payload) && typeof payload.error === "string"
        ? payload.error
        : "The location service is temporarily unavailable.";

    throw new LocationServiceError(message);
  }

  return payload;
}

export async function searchLocations(
  query: string,
  language: LanguageCode,
  signal?: AbortSignal,
): Promise<LocationResult[]> {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 3) {
    return [];
  }

  if (normalizedQuery.length > 120) {
    throw new RangeError("Location searches cannot exceed 120 characters.");
  }

  const cacheKey = `${language}:${normalizedQuery.toLocaleLowerCase()}`;
  const cachedResult = searchCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const payload = await postLocationRequest(
    {
      mode: "search",
      query: normalizedQuery,
      language,
    },
    signal,
  );

  if (
    !isObject(payload) ||
    !Array.isArray(payload.results) ||
    !payload.results.every(isLocationResult)
  ) {
    throw new LocationServiceError("The location service returned invalid data.");
  }

  rememberCompleted(searchCache, cacheKey, payload.results, SEARCH_CACHE_LIMIT);
  return payload.results;
}

export async function reverseGeocodeLocation(
  latitude: number,
  longitude: number,
  language: LanguageCode,
  signal?: AbortSignal,
): Promise<LocationResult | null> {
  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new RangeError("Location coordinates are outside the valid range.");
  }

  const cacheKey = `${language}:${latitude.toFixed(5)}:${longitude.toFixed(5)}`;

  if (reverseCache.has(cacheKey)) {
    const cachedResult = reverseCache.get(cacheKey) ?? null;

    return cachedResult === null
      ? null
      : { ...cachedResult, latitude, longitude };
  }

  const payload = await postLocationRequest(
    {
      mode: "reverse",
      latitude,
      longitude,
      language,
    },
    signal,
  );

  if (
    !isObject(payload) ||
    !(payload.result === null || isLocationResult(payload.result))
  ) {
    throw new LocationServiceError("The location service returned invalid data.");
  }

  rememberCompleted(
    reverseCache,
    cacheKey,
    payload.result,
    REVERSE_CACHE_LIMIT,
  );
  return payload.result;
}
