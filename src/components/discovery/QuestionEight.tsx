"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import OriginModeCard from "@/components/discovery/OriginModeCard";
import type { Translation } from "@/data/translations";
import {
  reverseGeocodeLocation,
  searchLocations,
} from "@/services/location/client";
import type { LanguageCode } from "@/data/translations";
import type { LocationResult } from "@/types/location";
import type {
  OriginMode,
  OriginPreferences,
} from "@/types/tripPreferences";
import { formatMessage } from "@/utils/translations";

const LocationMap = dynamic(
  () => import("@/components/discovery/LocationMap"),
  { ssr: false },
);

const originModes = ["currentLocation", "manual"] as const satisfies readonly OriginMode[];

type SearchStatus = "idle" | "searching" | "ready" | "empty" | "error";

type QuestionEightProps = {
  questionLabel: string;
  copy: Translation["discover"]["q8"];
  language: LanguageCode;
  origin: OriginPreferences;
  localizedLocationError: string | null;
  onRequestCurrentLocation: () => void;
  onChooseManual: () => void;
  onSelectManualLocation: (location: LocationResult) => void;
  onManualMapMoveStart: (latitude: number, longitude: number) => void;
  onManualMapMoveError: () => void;
};

function LoadingSpinner() {
  return (
    <span
      aria-hidden="true"
      className="size-5 animate-spin rounded-full border-2 border-[#79c8c1]/35 border-t-[#2b8585] motion-reduce:animate-none dark:border-[#7bd2ca]/25 dark:border-t-[#83d9d2]"
    />
  );
}

function LocationSummary({
  eyebrow,
  location,
  helper,
}: {
  eyebrow: string;
  location: string;
  helper: string;
}) {
  return (
    <aside className="rounded-[1.35rem] border border-[#bcdad5] bg-[#e9f6f2]/82 p-4 shadow-[0_16px_38px_rgba(26,91,91,0.09)] backdrop-blur-sm dark:border-[#67aaa4]/25 dark:bg-[#10383d]/72 sm:p-5">
      <div className="flex items-start gap-3.5">
        <span className="relative mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-white/78 text-[#216e72] shadow-sm dark:bg-white/10 dark:text-[#83d5cf]">
          <span className="size-3 rounded-full border-2 border-current" />
          <span className="absolute bottom-2 h-2.5 w-px bg-current/45" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#527075] dark:text-[#aac5c4]">
            {eyebrow}
          </p>
          <p className="mt-1 text-lg leading-6 font-bold tracking-[-0.02em] text-[#12383e] dark:text-[#eff9f8]">
            {location}
          </p>
          <p className="mt-1.5 text-sm text-[#567377] dark:text-[#b9d1cf]">
            {helper}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function QuestionEight({
  questionLabel,
  copy,
  language,
  origin,
  localizedLocationError,
  onRequestCurrentLocation,
  onChooseManual,
  onSelectManualLocation,
  onManualMapMoveStart,
  onManualMapMoveError,
}: QuestionEightProps) {
  const listboxId = useId();
  const [searchQuery, setSearchQuery] = useState(origin.manualLocation);
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [isResolvingMap, setIsResolvingMap] = useState(false);
  const confirmedSearchRef = useRef(origin.manualLocation);
  const mapRequestIdRef = useRef(0);
  const mapAbortRef = useRef<AbortController | null>(null);
  const activeModeRef = useRef(origin.mode);

  useEffect(() => {
    activeModeRef.current = origin.mode;
  }, [origin.mode]);

  useEffect(() => {
    if (origin.mode !== "manual") {
      return;
    }

    const query = searchQuery.trim();

    if (query.length < 3 || query === confirmedSearchRef.current) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setSearchStatus("searching");

      try {
        const results = await searchLocations(query, language, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setSearchResults(results);
        setActiveResultIndex(results.length > 0 ? 0 : -1);
        setSearchStatus(results.length > 0 ? "ready" : "empty");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSearchResults([]);
        setActiveResultIndex(-1);
        setSearchStatus("error");
      }
    }, 550);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [language, origin.mode, searchQuery]);

  useEffect(() => {
    return () => {
      mapAbortRef.current?.abort();
    };
  }, []);

  function selectSearchResult(result: LocationResult) {
    confirmedSearchRef.current = result.label;
    setSearchQuery(result.label);
    setSearchResults([]);
    setSearchStatus("idle");
    setActiveResultIndex(-1);
    onSelectManualLocation(result);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setSearchResults([]);
    setActiveResultIndex(-1);
    setSearchStatus("idle");
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (searchResults.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResultIndex((current) =>
        current >= searchResults.length - 1 ? 0 : current + 1,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResultIndex((current) =>
        current <= 0 ? searchResults.length - 1 : current - 1,
      );
    } else if (event.key === "Enter" && activeResultIndex >= 0) {
      event.preventDefault();
      selectSearchResult(searchResults[activeResultIndex]);
    } else if (event.key === "Escape") {
      setSearchResults([]);
      setSearchStatus("idle");
      setActiveResultIndex(-1);
    }
  }

  const handleMapCenterSettled = useCallback(
    async (latitude: number, longitude: number) => {
      const requestId = mapRequestIdRef.current + 1;
      mapRequestIdRef.current = requestId;
      mapAbortRef.current?.abort();

      const controller = new AbortController();
      mapAbortRef.current = controller;
      setIsResolvingMap(true);
      onManualMapMoveStart(latitude, longitude);

      try {
        const result = await reverseGeocodeLocation(
          latitude,
          longitude,
          language,
          controller.signal,
        );

        if (result === null) {
          throw new Error("No location was returned for the selected point.");
        }

        if (
          controller.signal.aborted ||
          requestId !== mapRequestIdRef.current ||
          activeModeRef.current !== "manual"
        ) {
          return;
        }

        confirmedSearchRef.current = result.label;
        setSearchQuery(result.label);
        onSelectManualLocation(result);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (
          requestId === mapRequestIdRef.current &&
          activeModeRef.current === "manual"
        ) {
          onManualMapMoveError();
        }
      } finally {
        if (requestId === mapRequestIdRef.current) {
          setIsResolvingMap(false);
        }
      }
    }, [language, onManualMapMoveError, onManualMapMoveStart, onSelectManualLocation],
  );

  const activeDescendant =
    activeResultIndex >= 0
      ? `${listboxId}-option-${activeResultIndex}`
      : undefined;
  const hasManualCoordinates =
    origin.latitude !== null && origin.longitude !== null;
  const hasResolvedManualLocation =
    origin.resolvedLocation.trim().length > 0;
  const isConfirmedManualQuery =
    hasResolvedManualLocation &&
    searchQuery.trim() === confirmedSearchRef.current.trim();

  return (
    <div className="relative text-[#102f35] dark:text-[#edf8f7]">
      <header className="max-w-[54rem]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b666b] dark:text-[#a9c2c3]">
          {questionLabel}
        </p>
        <h1
          id="question-8-title"
          className="mt-3 max-w-[54rem] text-[2.5rem] leading-[1.04] font-bold tracking-[-0.045em] text-[#0f3036] sm:text-[3.25rem] dark:text-[#f4fbfa]"
        >
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b666b] sm:text-lg dark:text-[#b4cbca]">
          {copy.subtitle}
        </p>
      </header>

      <fieldset className="mt-6">
        <legend className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
          {copy.startingPoint}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {originModes.map((mode) => (
            <OriginModeCard
              key={mode}
              mode={mode}
              label={copy.modes[mode].label}
              description={copy.modes[mode].description}
              selected={origin.mode === mode}
              disabled={
                mode === "currentLocation" &&
                origin.locationStatus === "requesting" &&
                origin.mode === "currentLocation"
              }
              onClick={
                mode === "currentLocation"
                  ? onRequestCurrentLocation
                  : onChooseManual
              }
            />
          ))}
        </div>
      </fieldset>

      {origin.mode === "currentLocation" ? (
        <section className="mt-4" aria-live="polite">
          {origin.locationStatus === "requesting" ? (
            <div className="flex items-center gap-3.5 rounded-[1.35rem] border border-[#c4dcd8] bg-white/68 p-4 shadow-[0_14px_34px_rgba(25,77,79,0.07)] backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.055] sm:p-5">
              <LoadingSpinner />
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#527075] dark:text-[#aac5c4]">
                  {copy.current.locatingLabel}
                </p>
                <p className="mt-1 text-sm text-[#4f7074] dark:text-[#bed3d1]">
                  {copy.current.locating}
                </p>
              </div>
            </div>
          ) : null}

          {origin.locationStatus === "success" &&
          origin.resolvedLocation.trim().length > 0 ? (
            <>
              <span className="sr-only">{copy.current.resolvedStatus}</span>
              <LocationSummary
                eyebrow={copy.current.selectedLabel}
                location={origin.resolvedLocation}
                helper={copy.current.approximate}
              />
            </>
          ) : null}

          {origin.locationStatus === "error" ? (
            <div
              role="alert"
              className="rounded-[1.35rem] border border-[#dfc7be] bg-[#fff8f3]/88 p-4 text-[#70483d] shadow-sm dark:border-[#d99d87]/25 dark:bg-[#3a2523]/72 dark:text-[#f1cec1] sm:p-5"
            >
              <p className="font-semibold">{localizedLocationError}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={onRequestCurrentLocation}
                  aria-label={copy.accessibility.retryCurrent}
                  className="min-h-10 cursor-pointer rounded-xl border border-[#cba99c] bg-white/65 px-4 py-2 text-sm font-semibold transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] dark:border-white/20 dark:bg-white/8 dark:hover:bg-white/12"
                >
                  {copy.current.retry}
                </button>
                <button
                  type="button"
                  onClick={onChooseManual}
                  aria-label={copy.accessibility.chooseManual}
                  className="min-h-10 cursor-pointer rounded-xl bg-[#123f46] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d343a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] dark:bg-[#72d0c9] dark:text-[#092e33]"
                >
                  {copy.current.chooseManual}
                </button>
              </div>
            </div>
          ) : null}

          {origin.locationStatus === "idle" ? (
            <p className="rounded-[1.2rem] border border-[#cbdeda] bg-white/58 px-4 py-3 text-sm text-[#557074] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.045] dark:text-[#b8cfcd]">
              {copy.current.permissionHelper}
            </p>
          ) : null}
        </section>
      ) : null}

      {origin.mode === "manual" ? (
        <section className="mt-4 rounded-[1.6rem] border border-[#c5dcd8] bg-white/62 p-4 shadow-[0_18px_46px_rgba(25,77,79,0.08)] backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.05] sm:p-5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b666b] dark:text-[#a9c2c3]">
            {copy.manual.heading}
          </p>

          <div className="relative z-[2000] mt-3">
            <label htmlFor={`${listboxId}-input`} className="sr-only">
              {copy.manual.searchLabel}
            </label>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#4f777a] dark:text-[#9ec6c3]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            </span>
            <input
              id={`${listboxId}-input`}
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={searchResults.length > 0}
              aria-controls={listboxId}
              aria-activedescendant={activeDescendant}
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={copy.manual.searchPlaceholder}
              autoComplete="off"
              className="min-h-14 w-full rounded-[1.15rem] border border-[#bdd7d3] bg-[#fbfdfa]/90 py-3 pr-12 pl-12 text-base font-semibold text-[#153d42] shadow-sm outline-none transition placeholder:font-normal placeholder:text-[#77908f] focus:border-[#4faaa6] focus:ring-3 focus:ring-[#71c8c1]/18 dark:border-white/12 dark:bg-white/[0.06] dark:text-[#eff9f8] dark:placeholder:text-[#799b99] dark:focus:border-[#70c5bf]"
            />
            {searchStatus === "searching" ? (
              <span className="absolute top-1/2 right-4 -translate-y-1/2">
                <LoadingSpinner />
              </span>
            ) : null}

            {searchResults.length > 0 ? (
              <ul
                id={listboxId}
                role="listbox"
                aria-label={copy.manual.resultsLabel}
                className="absolute z-[2100] mt-2 max-h-72 w-full overflow-y-auto rounded-[1.15rem] border border-[#bdd7d3] bg-[#fbfdfa] p-1.5 shadow-[0_24px_60px_rgba(15,65,68,0.24)] dark:border-white/15 dark:bg-[#102a2f]"
              >
                {searchResults.map((result, index) => (
                  <li key={result.id} role="presentation">
                    <button
                      id={`${listboxId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={activeResultIndex === index}
                      aria-label={formatMessage(copy.accessibility.selectSuggestion, {
                        location: result.label,
                      })}
                      onMouseEnter={() => setActiveResultIndex(index)}
                      onClick={() => selectSearchResult(result)}
                      className={`w-full cursor-pointer rounded-xl px-3.5 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1b7c83] ${
                        activeResultIndex === index
                          ? "bg-[#e5f3ef] dark:bg-white/10"
                          : "hover:bg-[#edf7f4] dark:hover:bg-white/7"
                      }`}
                    >
                      <span className="block font-semibold text-[#173d42] dark:text-[#eff9f8]">
                        {result.primaryLabel}
                      </span>
                      {result.secondaryLabel !== null ? (
                        <span className="mt-0.5 block text-sm text-[#607a7d] dark:text-[#a9c3c1]">
                          {result.secondaryLabel}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {!isConfirmedManualQuery ? (
          <div
            aria-live="polite"
            className="mt-2 min-h-5 text-sm text-[#617b7e] dark:text-[#abc3c2]"
          >
            {searchStatus === "searching"
              ? copy.manual.searching
              : searchStatus === "empty"
                ? copy.manual.noResults
                : searchStatus === "error"
                  ? copy.errors.search
                  : searchQuery.trim().length > 0 &&
                      searchQuery.trim().length < 3
                    ? copy.manual.queryTooShort
                    : copy.manual.searchHint}
          </div>
          ) : null}

          {hasManualCoordinates ? (
            <div
              className={`relative z-0 mt-4 ${
                searchResults.length > 0 ? "pointer-events-none" : ""
                }`}>
              <LocationMap
                latitude={origin.latitude ?? 0}
                longitude={origin.longitude ?? 0}
                onCenterSettled={handleMapCenterSettled}
                accessibleLabel={copy.accessibility.map}
                centerPinLabel={copy.accessibility.centerPin}
                loadingLabel={copy.manual.mapLoading}
                errorLabel={copy.errors.map}
              />

              {isResolvingMap || origin.locationStatus === "requesting" ? (
                <p
                  role="status"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#3d6f72] dark:text-[#abd1ce]"
                >
                  <LoadingSpinner />
                  {copy.manual.resolving}
                </p>
              ) : null}

              {origin.locationStatus === "error" &&
              localizedLocationError !== null ? (
                <p
                  role="alert"
                  className="mt-3 rounded-xl border border-[#dfc7be] bg-[#fff8f3]/88 px-3.5 py-3 text-sm font-semibold text-[#70483d] dark:border-[#d99d87]/25 dark:bg-[#3a2523]/72 dark:text-[#f1cec1]"
                >
                  {localizedLocationError}
                </p>
              ) : null}

              {hasResolvedManualLocation ? (
                <div className="mt-3">
                  <LocationSummary
                    eyebrow={copy.manual.selectedLabel}
                    location={origin.resolvedLocation}
                    helper={copy.manual.mapHelper}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
