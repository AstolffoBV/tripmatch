"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

import {
  applyTheme,
  getAppliedTheme,
  getPreferredTheme,
  setThemePreference,
  subscribeToTheme,
  type Theme,
} from "@/data/theme";

import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  appearance?: "themed" | "neutral";
  switchToLightLabel: string;
  switchToDarkLabel: string;
};

function getServerTheme(): Theme {
  return "light";
}

export default function ThemeToggle({
  appearance = "themed",
  switchToLightLabel,
  switchToDarkLabel,
}: ThemeToggleProps) {
  useLayoutEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  const theme = useSyncExternalStore(
    subscribeToTheme,
    getAppliedTheme,
    getServerTheme,
  );
  const isDark = theme === "dark";
  const accessibleLabel = isDark
    ? switchToLightLabel
    : switchToDarkLabel;

  function toggleTheme() {
    setThemePreference(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={accessibleLabel}
      onClick={toggleTheme}
      className={`${styles.toggle} ${
        appearance === "neutral" ? styles.neutral : ""
      }`}
    >
      <span className={styles.track} aria-hidden="true">
        <svg className={styles.sun} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M8 1.4v1.4M8 13.2v1.4M1.4 8h1.4M13.2 8h1.4M3.33 3.33l.99.99M11.68 11.68l.99.99M12.67 3.33l-.99.99M4.32 11.68l-.99.99"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>

        <svg className={styles.moon} viewBox="0 0 16 16" fill="none">
          <path
            d="M12.8 10.3A5.35 5.35 0 0 1 5.7 3.2a5.36 5.36 0 1 0 7.1 7.1Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className={styles.thumb} />
      </span>
    </button>
  );
}
