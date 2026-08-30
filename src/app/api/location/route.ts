import {
  reversePhotonLocation,
  searchPhotonLocations,
} from "@/services/location/photon";
import {
  locationLanguages,
  type LocationLanguage,
} from "@/types/location";

export const runtime = "nodejs";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocationLanguage(value: unknown): value is LocationLanguage {
  return (
    typeof value === "string" &&
    (locationLanguages as readonly string[]).includes(value)
  );
}

function isCoordinate(
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

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("A valid JSON request body is required.", 400);
  }

  if (!isObject(body) || !isLocationLanguage(body.language)) {
    return errorResponse("The location request is invalid.", 400);
  }

  try {
    if (body.mode === "search") {
      if (typeof body.query !== "string") {
        return errorResponse("A location search query is required.", 400);
      }

      const query = body.query.trim();

      if (query.length < 3 || query.length > 120) {
        return errorResponse(
          "Location searches must contain between 3 and 120 characters.",
          400,
        );
      }

      const results = await searchPhotonLocations(
        query,
        body.language,
        request.signal,
      );
      return Response.json({ results });
    }

    if (body.mode === "reverse") {
      if (
        !isCoordinate(body.latitude, -90, 90) ||
        !isCoordinate(body.longitude, -180, 180)
      ) {
        return errorResponse("Valid location coordinates are required.", 400);
      }

      const result = await reversePhotonLocation(
        body.latitude,
        body.longitude,
        body.language,
        request.signal,
      );
      return Response.json({ result });
    }

    return errorResponse("The location request mode is invalid.", 400);
  } catch {
    return errorResponse(
      "The location service is temporarily unavailable. Please try again.",
      502,
    );
  }
}
