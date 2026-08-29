import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionFiveBackground.module.css";

type QuestionFiveBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionFiveBackground({
  tripType,
  tripSubtype,
}: QuestionFiveBackgroundProps) {
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
          "--meal-accent": palette.accent,
          "--meal-from": palette.from,
          "--meal-via": palette.via,
          "--meal-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.orb} />
      <span className={styles.plate} />
      <span className={styles.tableLine} />
    </div>
  );
}
