import type { CSSProperties } from "react";

import { getTripThemePalette, isTripSubtypeForType } from "@/data/tripTypeThemes";
import type { TripSubtype, TripType } from "@/types/tripPreferences";

import styles from "./QuestionNineBackground.module.css";

type QuestionNineBackgroundProps = {
  tripType: TripType | null;
  tripSubtype: TripSubtype | null;
};

export default function QuestionNineBackground({
  tripType,
  tripSubtype,
}: QuestionNineBackgroundProps) {
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
          "--transport-accent": palette.accent,
          "--transport-from": palette.from,
          "--transport-via": palette.via,
          "--transport-to": palette.to,
        } as CSSProperties
      }
    >
      <span className={styles.orb} />
      <svg
        focusable="false"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className={styles.network}
      >
        <path
          className={styles.route}
          d="M-80 590C150 500 220 240 465 292s270 278 520 164c100-46 173-125 295-176"
        />
        <path
          className={styles.secondaryRoute}
          d="M-35 165c210 10 330 150 510 115 198-39 236-176 430-141 115 21 192 101 330 91"
        />

        <g className={styles.nodes}>
          <circle cx="108" cy="509" r="9" />
          <circle cx="374" cy="288" r="7" />
          <circle cx="621" cy="390" r="8" />
          <circle cx="895" cy="478" r="7" />
          <circle cx="1110" cy="365" r="11" />
        </g>
        <g className={styles.nodeCores}>
          <circle cx="108" cy="509" r="2.5" />
          <circle cx="374" cy="288" r="2" />
          <circle cx="621" cy="390" r="2.25" />
          <circle cx="895" cy="478" r="2" />
          <circle cx="1110" cy="365" r="3" />
        </g>

        <g className={styles.directions}>
          <path d="m250 380 9 2-5 8" />
          <path d="m755 461 9 2-5 8" />
          <path d="m789 165 8-4 3 9" />
        </g>
      </svg>
      <span className={styles.terminalRing} />
    </div>
  );
}
