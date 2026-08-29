import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionSixBackground.module.css";

type QuestionSixBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionSixBackground({
  tripType,
  tripSubtype,
}: QuestionSixBackgroundProps) {
  if (tripType === null || !isTripSubtypeForType(tripType, tripSubtype)) {
    return null;
  }

  const palette = getTripThemePalette(tripType, tripSubtype);

  return (
    <div
      aria-hidden="true"
      className={styles.background}
      style={
        {
          "--timing-accent": palette.accent,
          "--timing-from": palette.from,
          "--timing-via": palette.via,
          "--timing-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.orbit} />
      <span className={styles.calendar} />
      <span className={styles.timeline} />
    </div>
  );
}
