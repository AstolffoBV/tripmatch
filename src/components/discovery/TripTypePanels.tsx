"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { tripTypeOptions } from "@/data/discoveryOptions";
import type { Translation } from "@/data/translations";
import {
  getTripSubtypeOptions,
  getTripThemePalette,
  isTripSubtypeForType,
  neutralTripTheme,
  tripTypeThemes,
  type TripThemePalette,
} from "@/data/tripTypeThemes";
import type {
  TripSubtype,
  TripSubtypeByType,
  TripType,
} from "@/types/tripPreferences";
import { formatMessage } from "@/utils/translations";

import TripPanelArtwork from "./TripPanelArtwork";
import styles from "./TripTypePanels.module.css";

const visiblePanelCount = 3;
const maximumWindowStart = tripTypeOptions.length - visiblePanelCount;

type ThemePreview = {
  tripType: TripType;
  tripSubtype: TripSubtype | null;
};

type ThemeStyle = CSSProperties & {
  "--theme-from": string;
  "--theme-via": string;
  "--theme-to": string;
  "--theme-accent": string;
  "--theme-foreground": string;
  "--theme-muted": string;
};

type TripTypePanelsProps = {
  questionLabel: string;
  copy: Translation["discover"]["q1"];
  shellHeader: ReactNode;
  shellProgress: ReactNode;
  shellActions: ReactNode;
  selectedTripType: TripType | null;
  selectedTripSubtype: TripSubtype | null;
  onSelect: <Type extends TripType>(
    tripType: Type,
    tripSubtype: TripSubtypeByType[Type],
  ) => void;
};

function getThemeStyle(palette: TripThemePalette): ThemeStyle {
  return {
    "--theme-from": palette.from,
    "--theme-via": palette.via,
    "--theme-to": palette.to,
    "--theme-accent": palette.accent,
    "--theme-foreground": palette.foreground,
    "--theme-muted": palette.muted,
  };
}

function getInitialWindowStart(selectedTripType: TripType | null) {
  if (selectedTripType === null) {
    return 0;
  }

  const selectedIndex = tripTypeOptions.indexOf(selectedTripType);
  return Math.min(
    maximumWindowStart,
    Math.max(0, selectedIndex - 1),
  );
}

export default function TripTypePanels({
  questionLabel,
  copy,
  shellHeader,
  shellProgress,
  shellActions,
  selectedTripType,
  selectedTripSubtype,
  onSelect,
}: TripTypePanelsProps) {
  const [windowStart, setWindowStart] = useState(() =>
    getInitialWindowStart(selectedTripType),
  );
  const [openTripType, setOpenTripType] =
    useState<TripType | null>(selectedTripType);
  const [pointerPreview, setPointerPreview] =
    useState<ThemePreview | null>(null);
  const [focusPreview, setFocusPreview] =
    useState<ThemePreview | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const panelIdPrefix = useId();

  const selectedPairIsValid =
    selectedTripType !== null &&
    isTripSubtypeForType(selectedTripType, selectedTripSubtype);
  const selectedTheme: ThemePreview | null = selectedPairIsValid
    ? {
        tripType: selectedTripType,
        tripSubtype: selectedTripSubtype,
      }
    : null;
  const openTheme: ThemePreview | null =
    openTripType === null
      ? null
      : {
          tripType: openTripType,
          tripSubtype:
            selectedTheme?.tripType === openTripType
              ? selectedTheme.tripSubtype
              : null,
        };
  const effectiveTheme =
    pointerPreview ?? focusPreview ?? openTheme ?? selectedTheme;
  const atmospherePalette = effectiveTheme
    ? getTripThemePalette(
        effectiveTheme.tripType,
        effectiveTheme.tripSubtype,
      )
    : neutralTripTheme;
  const visibleTripTypes = tripTypeOptions.slice(
    windowStart,
    windowStart + visiblePanelCount,
  );
  const windowEnd = windowStart + visibleTripTypes.length;
  const activeTripType =
    pointerPreview?.tripType ??
    focusPreview?.tripType ??
    openTripType ??
    selectedTheme?.tripType ??
    null;

  useEffect(
    () => () => {
      if (pointerClearTimerRef.current !== null) {
        clearTimeout(pointerClearTimerRef.current);
      }
    },
    [],
  );

  function clearPointerTimer() {
    if (pointerClearTimerRef.current !== null) {
      clearTimeout(pointerClearTimerRef.current);
      pointerClearTimerRef.current = null;
    }
  }

  function getCategoryPreview(tripType: TripType): ThemePreview {
    return {
      tripType,
      tripSubtype:
        selectedTheme?.tripType === tripType
          ? selectedTheme.tripSubtype
          : null,
    };
  }

  function browseCategories(direction: -1 | 1) {
    setPointerPreview(null);
    setWindowStart((currentStart) =>
      Math.min(
        maximumWindowStart,
        Math.max(0, currentStart + direction),
      ),
    );
    viewportRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }

  function handlePanelBlur(event: FocusEvent<HTMLElement>) {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setFocusPreview(null);
  }

  function previewWithPointer(
    event: PointerEvent,
    preview: ThemePreview | null,
  ) {
    if (event.pointerType !== "touch") {
      clearPointerTimer();
      setPointerPreview(preview);
    }
  }

  function schedulePointerPreviewClear(event: PointerEvent) {
    if (event.pointerType === "touch") {
      return;
    }

    clearPointerTimer();
    pointerClearTimerRef.current = setTimeout(() => {
      setPointerPreview(null);
      pointerClearTimerRef.current = null;
    }, 180);
  }

  function openCategory(
    event: MouseEvent<HTMLButtonElement>,
    tripType: TripType,
  ) {
    setOpenTripType(tripType);
    const panel = event.currentTarget.closest("article");
    const viewport = viewportRef.current;

    if (panel && viewport) {
      const centeredPanelPosition =
        panel.offsetLeft - (viewport.clientWidth - panel.clientWidth) / 2;
      viewport.scrollTo({ left: centeredPanelPosition, behavior: "auto" });
    }
  }

  return (
    <div
      className={styles.browser}
      style={getThemeStyle(atmospherePalette)}
      onPointerLeave={(event) => previewWithPointer(event, null)}
    >
      <div className={styles.sceneCanvas} aria-hidden="true">
        <div
          className={styles.neutralScene}
          style={getThemeStyle(neutralTripTheme)}
        />
        {tripTypeOptions.map((sceneTripType) => {
          const sceneIsActive = effectiveTheme?.tripType === sceneTripType;
          const sceneSubtype = sceneIsActive
            ? effectiveTheme.tripSubtype
            : selectedTheme?.tripType === sceneTripType
              ? selectedTheme.tripSubtype
              : null;
          const scenePalette = getTripThemePalette(
            sceneTripType,
            sceneSubtype,
          );

          return (
            <div
              key={sceneTripType}
              className={`${styles.sceneLayer} ${
                sceneIsActive ? styles.sceneLayerActive : ""
              }`}
              style={getThemeStyle(scenePalette)}
              data-category={tripTypeThemes[sceneTripType].slug}
            >
              <TripPanelArtwork
                key={`${sceneTripType}-${sceneSubtype ?? "general"}`}
                tripType={sceneTripType}
                tripSubtype={sceneSubtype}
                className={styles.sceneArtwork}
              />
              <div className={styles.sceneLight} />
              <div className={styles.sceneVeil} />
            </div>
          );
        })}
        <div className={styles.shellVeil} />
      </div>

      <div className={styles.shellHeader}>{shellHeader}</div>

      <div className={styles.shellProgress}>{shellProgress}</div>

      <div className={styles.questionIntro}>
        <p className={styles.questionEyebrow}>{questionLabel}</p>
        <h1 id="question-1-title" className={styles.questionTitle}>
          {copy.heading}
        </h1>
        <p className={styles.questionSubtitle}>{copy.subtitle}</p>
      </div>

      <div
        role="region"
        aria-label={copy.browser.regionLabel}
        className={styles.selectorStage}
      >
        <div className={styles.browserHeader}>
          <div className={styles.windowStatus} aria-live="polite">
            <span aria-hidden="true">
              {windowStart + 1}–{windowEnd} / {tripTypeOptions.length}
            </span>
            <span className="sr-only">
              {formatMessage(copy.browser.showingCategories, {
                start: windowStart + 1,
                end: windowEnd,
                total: tripTypeOptions.length,
              })}
            </span>
          </div>

          <div className={styles.browserControls}>
            <button
              type="button"
              aria-label={copy.browser.previousCategories}
              disabled={windowStart === 0}
              onClick={() => browseCategories(-1)}
              className={styles.browserButton}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="m12.5 4.5-5 5.5 5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={copy.browser.nextCategories}
              disabled={windowStart === maximumWindowStart}
              onClick={() => browseCategories(1)}
              className={styles.browserButton}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="m7.5 4.5 5 5.5-5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={viewportRef} className={styles.viewport}>
          <div className={styles.panelRow} role="list">
            {visibleTripTypes.map((tripType, visibleIndex) => {
            const categoryLabel = copy.options[tripType];
            const isCategorySelected = selectedTripType === tripType;
            const isActive = activeTripType === tripType;
            const previewForPanel =
              effectiveTheme?.tripType === tripType
                ? effectiveTheme.tripSubtype
                : isCategorySelected && selectedPairIsValid
                  ? selectedTripSubtype
                  : null;
            const panelPalette = getTripThemePalette(
              tripType,
              previewForPanel,
            );
            const panelSlug = tripTypeThemes[tripType].slug;
            const subtypeOptions = getTripSubtypeOptions(tripType);
            const subtypePanelId = `${panelIdPrefix}-${panelSlug}`;
            const selectedSubtypeId = `${subtypePanelId}-selected`;
            const selectedSubtypeLabel =
              isCategorySelected && selectedPairIsValid
                ? copy.subtypes[selectedTripSubtype]
                : null;

            return (
              <article
                key={tripType}
                role="listitem"
                className={`${styles.panel} ${
                  isActive ? styles.panelActive : ""
                } ${isCategorySelected ? styles.panelSelected : ""}`}
                style={getThemeStyle(panelPalette)}
                onPointerEnter={(event) =>
                  previewWithPointer(event, getCategoryPreview(tripType))
                }
                onPointerLeave={schedulePointerPreviewClear}
                onBlur={handlePanelBlur}
              >
                <div className={styles.panelSurface} data-category={panelSlug}>
                  <TripPanelArtwork
                    tripType={tripType}
                    tripSubtype={previewForPanel}
                    className={styles.artwork}
                  />
                  <div className={styles.panelShade} aria-hidden="true" />

                  <button
                    type="button"
                    aria-label={formatMessage(copy.browser.openCategory, {
                      category: categoryLabel,
                    })}
                    aria-expanded={isActive}
                    aria-controls={isActive ? subtypePanelId : undefined}
                    aria-describedby={
                      selectedSubtypeLabel ? selectedSubtypeId : undefined
                    }
                    onClick={(event) => openCategory(event, tripType)}
                    onFocus={() => {
                      setPointerPreview(null);
                      setFocusPreview(getCategoryPreview(tripType));
                    }}
                    className={styles.categoryButton}
                  >
                    <span className={styles.categoryIndex} aria-hidden="true">
                      {String(windowStart + visibleIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.categoryName}>{categoryLabel}</span>
                    {selectedSubtypeLabel ? (
                      <span
                        id={selectedSubtypeId}
                        className={styles.selectedSubtype}
                      >
                        {selectedSubtypeLabel}
                      </span>
                    ) : null}
                  </button>
                </div>

                {isActive ? (
                  <div
                    id={subtypePanelId}
                    className={styles.subtypePanel}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") {
                        clearPointerTimer();
                      }
                    }}
                    onPointerLeave={(event) =>
                      previewWithPointer(event, null)
                    }
                  >
                    <p className={styles.overlayCategory}>{categoryLabel}</p>
                    <p className={styles.subtypePrompt}>
                      {copy.subtypePrompts[tripType]}
                    </p>
                    <div className={styles.subtypeOptions}>
                      {subtypeOptions.map((option) => {
                        const subtypeLabel = copy.subtypes[option.value];
                        const isSubtypeSelected =
                          isCategorySelected &&
                          selectedTripSubtype === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-label={formatMessage(
                              copy.browser.selectSubtype,
                              {
                                category: categoryLabel,
                                subtype: subtypeLabel,
                              },
                            )}
                            aria-pressed={isSubtypeSelected}
                            onClick={() => {
                              onSelect(tripType, option.value);
                              setOpenTripType(tripType);
                            }}
                            onPointerEnter={(event) =>
                              previewWithPointer(event, {
                                tripType,
                                tripSubtype: option.value,
                              })
                            }
                            onPointerLeave={(event) =>
                              previewWithPointer(
                                event,
                                getCategoryPreview(tripType),
                              )
                            }
                            onFocus={() => {
                              setPointerPreview(null);
                              setFocusPreview({
                                tripType,
                                tripSubtype: option.value,
                              });
                            }}
                            className={styles.subtypeButton}
                          >
                            {subtypeLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </article>
            );
            })}
          </div>
        </div>
      </div>

      <div className={styles.shellActions}>{shellActions}</div>
    </div>
  );
}
