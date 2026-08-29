import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionFourBackground.module.css";

type QuestionFourBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionFourBackground({
  tripType,
  tripSubtype,
}: QuestionFourBackgroundProps) {
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
          "--stay-accent": palette.accent,
          "--stay-from": palette.from,
          "--stay-via": palette.via,
          "--stay-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.sun} />
      <span className={styles.arch} />
      <span className={styles.horizon} />
    </div>
  );
}
