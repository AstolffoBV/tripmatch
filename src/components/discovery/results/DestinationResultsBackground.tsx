import type { CSSProperties } from "react";

import {
  getTripThemePalette,
  isTripSubtypeForType,
  neutralTripTheme,
} from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./DestinationResultsBackground.module.css";

type DestinationResultsBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function DestinationResultsBackground({
  tripType,
  tripSubtype,
}: DestinationResultsBackgroundProps) {
  const palette =
    tripType !== null && isTripSubtypeForType(tripType, tripSubtype)
      ? getTripThemePalette(tripType, tripSubtype)
      : neutralTripTheme;

  return (
    <div
      aria-hidden="true"
      className={styles.background}
      style={
        {
          "--results-accent": palette.accent,
          "--results-from": palette.from,
          "--results-via": palette.via,
          "--results-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.orb} />
      <span className={styles.destinationRing} />
      <svg
        focusable="false"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className={styles.network}
      >
        <path
          className={styles.routePrimary}
          d="M-90 688C173 656 235 371 489 404c167 22 212 211 390 208 198-4 286-235 648-287"
        />
        <path
          className={styles.routeSecondary}
          d="M-55 223c246-12 342 156 547 122 209-34 265-203 493-174 163 21 270 151 516 105"
        />
        <path
          className={styles.routeTertiary}
          d="M221 937c54-234 222-318 403-267 190 54 281 12 378-117 92-121 195-171 443-156"
        />

        <g className={styles.nodes}>
          <circle cx="109" cy="604" r="9" />
          <circle cx="378" cy="414" r="7" />
          <circle cx="659" cy="510" r="8" />
          <circle cx="932" cy="595" r="7" />
          <circle cx="1193" cy="434" r="10" />
          <circle cx="1287" cy="227" r="7" />
        </g>
        <g className={styles.nodeCores}>
          <circle cx="109" cy="604" r="2.5" />
          <circle cx="378" cy="414" r="2" />
          <circle cx="659" cy="510" r="2.25" />
          <circle cx="932" cy="595" r="2" />
          <circle cx="1193" cy="434" r="3" />
          <circle cx="1287" cy="227" r="2" />
        </g>
      </svg>
    </div>
  );
}
