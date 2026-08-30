import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionEightBackground.module.css";

type QuestionEightBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionEightBackground({
  tripType,
  tripSubtype,
}: QuestionEightBackgroundProps) {
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
          "--origin-accent": palette.accent,
          "--origin-from": palette.from,
          "--origin-via": palette.via,
          "--origin-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.grid} />
      <span className={`${styles.contour} ${styles.contourOne}`} />
      <span className={`${styles.contour} ${styles.contourTwo}`} />
      <span className={styles.route}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
