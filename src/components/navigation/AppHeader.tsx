"use client";

import Link from "next/link";

import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";

import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  appearance?: "themed" | "neutral";
  reserveSpace?: boolean;
};

export default function AppHeader({
  appearance = "neutral",
  reserveSpace = false,
}: AppHeaderProps) {
  const { language, copy, setLanguage } = useLanguage();
  const commonCopy = copy.common;

  return (
    <div
      className={`${styles.host} ${
        reserveSpace ? styles.hostWithReservedSpace : ""
      }`}
    >
      <header
        className={`${styles.header} ${
          appearance === "themed" ? styles.themed : styles.neutral
        }`}
      >
        <Link
          href="/"
          aria-label={commonCopy.homeLabel}
          className={styles.wordmark}
        >
          <span className={styles.wordmarkTrip}>Trip</span>
          <span className={styles.wordmarkMatch}>Match</span>
        </Link>

        <div className={styles.controls}>
          <LanguageSelector
            value={language}
            label={commonCopy.languageSelectorLabel}
            onChange={setLanguage}
            appearance={appearance}
          />
          <ThemeToggle
            appearance={appearance}
            switchToLightLabel={commonCopy.switchToLightTheme}
            switchToDarkLabel={commonCopy.switchToDarkTheme}
          />
        </div>
      </header>
    </div>
  );
}
