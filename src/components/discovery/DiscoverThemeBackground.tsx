import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type {
  TripSubtype,
  TripType,
} from "@/types/tripPreferences";

import styles from "./DiscoverThemeBackground.module.css";

type DiscoverThemeBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function DiscoverThemeBackground({
  tripType,
  tripSubtype,
}: DiscoverThemeBackgroundProps) {
  if (
    tripType === null ||
    !isTripSubtypeForType(tripType, tripSubtype)
  ) {
    return null;
  }

  const palette = getTripThemePalette(tripType, tripSubtype);

  return (
    <div
      aria-hidden="true"
      className={styles.background}
      style={
        {
          "--ambience-from": palette.from,
          "--ambience-via": palette.via,
          "--ambience-to": palette.to,
          "--ambience-accent": palette.accent,
        } as CSSProperties
      }
    />
  );
}
