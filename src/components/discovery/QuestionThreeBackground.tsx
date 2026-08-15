import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionThreeBackground.module.css";

type QuestionThreeBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionThreeBackground({
  tripType,
  tripSubtype,
}: QuestionThreeBackgroundProps) {
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
          "--budget-accent": palette.accent,
          "--budget-from": palette.from,
          "--budget-via": palette.via,
          "--budget-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.orbit} />
      <span className={styles.horizon} />
    </div>
  );
}
