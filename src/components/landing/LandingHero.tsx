"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";
import {
  landingSceneOrder,
  type LandingScene,
} from "@/data/translations";

import styles from "./LandingHero.module.css";
import SceneBackground from "./SceneBackground";

type LandingTheme = CSSProperties & {
  "--hero-text": string;
  "--hero-muted": string;
  "--control-background": string;
  "--control-border": string;
  "--cta-background": string;
  "--cta-text": string;
  "--focus-ring": string;
  "--button-shadow": string;
};

const sceneThemes: Record<LandingScene, LandingTheme> = {
  beach: {
    "--hero-text": "#082f3a",
    "--hero-muted": "#174b55",
    "--control-background": "rgba(255, 250, 235, 0.6)",
    "--control-border": "rgba(8, 47, 58, 0.3)",
    "--cta-background": "#073844",
    "--cta-text": "#fffaf0",
    "--focus-ring": "#073844",
    "--button-shadow": "rgba(8, 64, 74, 0.25)",
  },
  mountains: {
    "--hero-text": "#f3f8f7",
    "--hero-muted": "#d2e2e1",
    "--control-background": "rgba(14, 40, 52, 0.48)",
    "--control-border": "rgba(224, 241, 240, 0.34)",
    "--cta-background": "#eef7f5",
    "--cta-text": "#173b46",
    "--focus-ring": "#f3f8f7",
    "--button-shadow": "rgba(2, 14, 22, 0.32)",
  },
  city: {
    "--hero-text": "#17242e",
    "--hero-muted": "#33434d",
    "--control-background": "rgba(255, 245, 222, 0.56)",
    "--control-border": "rgba(23, 36, 46, 0.28)",
    "--cta-background": "#172c39",
    "--cta-text": "#fff7e7",
    "--focus-ring": "#172c39",
    "--button-shadow": "rgba(43, 39, 36, 0.28)",
  },
  concert: {
    "--hero-text": "#fbf7ff",
    "--hero-muted": "#ded4eb",
    "--control-background": "rgba(25, 17, 43, 0.54)",
    "--control-border": "rgba(239, 223, 255, 0.34)",
    "--cta-background": "#f6ecff",
    "--cta-text": "#2a163b",
    "--focus-ring": "#fbf7ff",
    "--button-shadow": "rgba(6, 2, 14, 0.42)",
  },
};

export default function LandingHero() {
  const [sceneState, setSceneState] = useState<{
    activeIndex: number;
    outgoingScene: LandingScene | null;
  }>({ activeIndex: 0, outgoingScene: null });
  const { language, copy: appCopy, setLanguage } = useLanguage();

  const activeScene = landingSceneOrder[sceneState.activeIndex];
  const copy = appCopy.landing;
  const sceneLabel = copy.scenes[activeScene];

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setSceneState((currentState) => ({
        activeIndex:
          (currentState.activeIndex + 1) % landingSceneOrder.length,
        outgoingScene: landingSceneOrder[currentState.activeIndex],
      }));
    }, 7000);

    return () => window.clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    if (sceneState.outgoingScene === null) {
      return;
    }

    const transitionTimer = window.setTimeout(() => {
      setSceneState((currentState) => ({
        ...currentState,
        outgoingScene: null,
      }));
    }, 1500);

    return () => window.clearTimeout(transitionTimer);
  }, [activeScene, sceneState.outgoingScene]);

  return (
    <div
      lang={language}
      style={sceneThemes[activeScene]}
      className={`${styles.hero} relative min-h-screen min-h-[100svh] overflow-hidden font-sans`}
    >
      <SceneBackground
        activeScene={activeScene}
        outgoingScene={sceneState.outgoingScene}
      />
      <div className={styles.readabilityOverlay} aria-hidden="true" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <span
          className={`${styles.themeText} text-lg font-semibold tracking-[-0.03em] sm:text-xl`}
        >
          {copy.brand}
        </span>

        <LanguageSelector
          value={language}
          label={appCopy.common.languageSelectorLabel}
          onChange={setLanguage}
          className={styles.languageSelect}
        />
      </header>

      <main className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center px-5 pt-24 pb-20 text-center sm:px-8 sm:pt-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          <p
            key={`${activeScene}-${language}`}
            className={`${styles.sceneLabel} rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm`}
          >
            {sceneLabel}
          </p>

          <h1
            className={`${styles.themeText} mt-6 text-[clamp(3.2rem,12vw,8.5rem)] leading-[0.82] font-semibold tracking-[-0.075em]`}
          >
            {copy.brand}
          </h1>

          <p
            className={`${styles.themeMuted} mt-7 max-w-2xl text-lg leading-relaxed font-medium text-balance sm:mt-9 sm:text-2xl sm:leading-relaxed`}
          >
            {copy.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <Link
            href="/discover"
            className={`${styles.cta} group mt-9 inline-flex items-center gap-3 rounded-full border border-transparent px-6 py-3.5 text-base font-semibold sm:mt-11 sm:px-7 sm:py-4`}
          >
            <span>{copy.cta}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className={`${styles.ctaArrow} size-4 transition-transform duration-300 group-hover:translate-x-0.5`}
            >
              <path
                d="M4 10h11m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
