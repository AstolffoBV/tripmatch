import type {
  DurationPreference,
  TripPreferences,
} from "@/types/tripPreferences";

export type TripRhythmPhase =
  | "arrival"
  | "mainExperience"
  | "exploreFurther"
  | "flexibleTime"
  | "finalDay";

export type TripRhythmTime =
  | { kind: "day"; day: number }
  | { kind: "days"; start: number; end: number }
  | { kind: "midTrip" }
  | { kind: "laterDays" }
  | { kind: "finalDay" };

export type TripRhythmSegment = {
  phase: TripRhythmPhase;
  time: TripRhythmTime;
};

// Ranged Q7 choices use their upper boundary as a compact planning horizon.
// Exact-date trips use their actual number of calendar days instead.
const finiteDurationDays = {
  weekend: 3,
  short: 5,
  week: 8,
  long: 14,
  extended: 15,
} as const satisfies Record<DurationPreference, number>;

function createTimeRange(start: number, end: number): TripRhythmTime {
  return start === end
    ? { kind: "day", day: start }
    : { kind: "days", start, end };
}

function createPhaseTime(
  phase: TripRhythmPhase,
  start: number,
  end: number,
): TripRhythmTime {
  if (phase === "exploreFurther") {
    return { kind: "midTrip" };
  }

  if (phase === "flexibleTime") {
    return { kind: "laterDays" };
  }

  return createTimeRange(start, end);
}

function createFiniteRhythm(totalDays: number): TripRhythmSegment[] {
  const middleDayCount = Math.max(0, totalDays - 2);
  const middlePhases: TripRhythmPhase[] =
    middleDayCount === 0
      ? []
      : middleDayCount === 1
        ? ["mainExperience"]
        : totalDays <= 5
          ? ["mainExperience", "exploreFurther"]
          : ["mainExperience", "exploreFurther", "flexibleTime"];
  const segments: TripRhythmSegment[] = [
    { phase: "arrival", time: { kind: "day", day: 1 } },
  ];
  let nextDay = 2;
  let remainingDays = middleDayCount;

  middlePhases.forEach((phase, index) => {
    const remainingPhases = middlePhases.length - index;
    const phaseDayCount = Math.ceil(remainingDays / remainingPhases);
    const endDay = nextDay + phaseDayCount - 1;

    segments.push({ phase, time: createPhaseTime(phase, nextDay, endDay) });
    nextDay = endDay + 1;
    remainingDays -= phaseDayCount;
  });

  segments.push({ phase: "finalDay", time: { kind: "finalDay" } });
  return segments;
}

export function getTripPreviewDuration(
  preferences: Pick<TripPreferences, "duration" | "timing">,
): DurationPreference | null {
  const exactNights = preferences.timing.exactNights;

  if (preferences.timing.mode !== "exact") {
    return preferences.duration;
  }

  if (
    exactNights === null ||
    !Number.isSafeInteger(exactNights) ||
    exactNights < 1
  ) {
    return null;
  }

  if (exactNights <= 3) {
    return "weekend";
  }

  if (exactNights <= 5) {
    return "short";
  }

  if (exactNights <= 8) {
    return "week";
  }

  if (exactNights <= 14) {
    return "long";
  }

  return "extended";
}

export function getSuggestedTripRhythm(
  preferences: Pick<TripPreferences, "duration" | "timing">,
): TripRhythmSegment[] {
  const duration = getTripPreviewDuration(preferences);

  if (duration === null) {
    return [];
  }

  if (
  preferences.timing.mode === "exact" &&
  preferences.timing.exactNights !== null
) {
  return createFiniteRhythm(preferences.timing.exactNights + 1);
}

if (duration === "weekend") {
  return [
    {
      phase: "arrival",
      time: { kind: "day", day: 1 },
    },
    {
      phase: "mainExperience",
      time: { kind: "midTrip" },
    },
    {
      phase: "finalDay",
      time: { kind: "finalDay" },
    },
  ];
}

return createFiniteRhythm(finiteDurationDays[duration]);

}
