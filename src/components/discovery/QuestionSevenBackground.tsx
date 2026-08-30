import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionSevenBackground.module.css";

type QuestionSevenBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionSevenBackground({
  tripType,
  tripSubtype,
}: QuestionSevenBackgroundProps) {
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
          "--duration-accent": palette.accent,
          "--duration-from": palette.from,
          "--duration-via": palette.via,
          "--duration-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.arc} />
      <span className={styles.timeline} />
      <span className={styles.progression}>
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
