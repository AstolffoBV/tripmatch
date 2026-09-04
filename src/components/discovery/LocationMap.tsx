"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useId, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

type LocationMapProps = {
  latitude: number;
  longitude: number;
  onCenterSettled: (latitude: number, longitude: number) => void;
  accessibleLabel: string;
  centerPinLabel: string;
  loadingLabel: string;
  errorLabel: string;
};

// Public tiles are suitable for this early concept. Keep these constants isolated
// so production can move to a dedicated, policy-appropriate tile provider later.
const OPENSTREETMAP_TILE_URL =
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OPENSTREETMAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_ZOOM = 14;
const MOVE_SETTLE_DELAY_MS = 700;
const COORDINATE_EPSILON = 0.000001;

function coordinatesMatch(
  firstLatitude: number,
  firstLongitude: number,
  secondLatitude: number,
  secondLongitude: number,
) {
  return (
    Math.abs(firstLatitude - secondLatitude) < COORDINATE_EPSILON &&
    Math.abs(firstLongitude - secondLongitude) < COORDINATE_EPSILON
  );
}

export default function LocationMap({
  latitude,
  longitude,
  onCenterSettled,
  accessibleLabel,
  centerPinLabel,
  loadingLabel,
  errorLabel,
}: LocationMapProps) {
  const centerPinDescriptionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticCenterRef = useRef<[number, number] | null>(null);
  const latestPositionRef = useRef({ latitude, longitude });
  const onCenterSettledRef = useRef(onCenterSettled);
  const [ready, setReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);

  useEffect(() => {
    latestPositionRef.current = { latitude, longitude };
  }, [latitude, longitude]);

  useEffect(() => {
    onCenterSettledRef.current = onCenterSettled;
  }, [onCenterSettled]);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    if (container === null) {
      return;
    }

    async function createMap() {
      let map: LeafletMap | null = null;

      try {
        const leafletModule = await import("leaflet");

        if (cancelled || containerRef.current === null) {
          return;
        }

        const leaflet = leafletModule.default;
        const initialPosition = latestPositionRef.current;
        map = leaflet.map(containerRef.current, {
          center: [initialPosition.latitude, initialPosition.longitude],
          zoom: DEFAULT_ZOOM,
          attributionControl: true,
          keyboard: true,
          scrollWheelZoom: true,
          touchZoom: true,
          zoomControl: true,
        });

        leaflet
          .tileLayer(OPENSTREETMAP_TILE_URL, {
            attribution: OPENSTREETMAP_ATTRIBUTION,
            maxZoom: 19,
          })
          .addTo(map);

        const activeMap = map;
        const handleMoveEnd = () => {
          const center = activeMap.getCenter();
          const programmaticCenter = programmaticCenterRef.current;

          if (
            programmaticCenter !== null &&
            coordinatesMatch(
              center.lat,
              center.lng,
              programmaticCenter[0],
              programmaticCenter[1],
            )
          ) {
            programmaticCenterRef.current = null;
            return;
          }

          programmaticCenterRef.current = null;

          if (settleTimerRef.current !== null) {
            clearTimeout(settleTimerRef.current);
          }

          settleTimerRef.current = setTimeout(() => {
            onCenterSettledRef.current(center.lat, center.lng);
          }, MOVE_SETTLE_DELAY_MS);
        };

        map.on("moveend", handleMoveEnd);
        mapRef.current = map;
        setReady(true);

        requestAnimationFrame(() => {
          if (!cancelled) {
            activeMap.invalidateSize();
          }
        });
      } catch {
        map?.remove();

        if (!cancelled) {
          mapRef.current = null;
          setMapFailed(true);
        }
      }
    }

    void createMap();

    return () => {
      cancelled = true;

      if (settleTimerRef.current !== null) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }

      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (map === null) {
      return;
    }

    const currentCenter = map.getCenter();

    if (
      coordinatesMatch(
        currentCenter.lat,
        currentCenter.lng,
        latitude,
        longitude,
      )
    ) {
      return;
    }

    if (settleTimerRef.current !== null) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    programmaticCenterRef.current = [latitude, longitude];
    map.setView([latitude, longitude], map.getZoom(), { animate: false });
  }, [latitude, longitude]);

  return (
    <div className="relative h-72 min-h-72 overflow-hidden rounded-[1.5rem] border border-[#bdd8d3] bg-[#deebe7] shadow-[0_20px_50px_rgba(25,77,79,0.12)] transition duration-200 focus-within:border-[#4faaa6] focus-within:ring-3 focus-within:ring-[#71c8c1]/18 motion-reduce:transition-none sm:h-80 sm:min-h-80 dark:border-white/12 dark:bg-[#102e33] dark:focus-within:border-[#70c5bf] dark:focus-within:ring-[#83d9d2]/14">
      <div
        ref={containerRef}
        role="region"
        aria-label={accessibleLabel}
        aria-describedby={centerPinDescriptionId}
        aria-busy={!ready && !mapFailed}
        tabIndex={0}
        className="size-full outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[#35a6a2] dark:focus-visible:ring-[#83d9d2]"
      />

      <span id={centerPinDescriptionId} className="sr-only">
        {centerPinLabel}
      </span>

      {!ready && !mapFailed ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute inset-0 z-400 grid place-items-center bg-[#edf6f3]/92 text-sm font-semibold text-[#3e6669] dark:bg-[#102e33]/92 dark:text-[#c6ddda]"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#c5dcd8] bg-white/80 px-4 py-2 shadow-sm dark:border-white/12 dark:bg-white/8">
            <span className="size-2 animate-pulse rounded-full bg-[#318c8b] motion-reduce:animate-none" />
            {loadingLabel}
          </span>
        </div>
      ) : null}

      {mapFailed ? (
        <div
          role="alert"
          className="absolute inset-0 z-400 grid place-items-center bg-[#edf6f3]/96 px-6 text-center text-sm font-semibold leading-6 text-[#3e6669] dark:bg-[#102e33]/96 dark:text-[#c6ddda]"
        >
          <span className="max-w-sm rounded-2xl border border-[#c5dcd8] bg-white/82 px-5 py-4 shadow-sm dark:border-white/12 dark:bg-white/8">
            {errorLabel}
          </span>
        </div>
      ) : null}

      {ready ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-500 -translate-x-1/2 -translate-y-full drop-shadow-[0_7px_8px_rgba(5,45,50,0.28)]"
        >
          <svg viewBox="0 0 44 56" className="h-14 w-11 overflow-visible">
            <path
              d="M22 2C11.5 2 3 10.5 3 21c0 14.3 19 32 19 32s19-17.7 19-32C41 10.5 32.5 2 22 2Z"
              fill="#123f46"
              stroke="#73d8d1"
              strokeWidth="2"
            />
            <circle cx="22" cy="21" r="7" fill="#a9eee8" />
            <circle cx="22" cy="21" r="2.5" fill="#123f46" />
          </svg>
        </div>
      ) : null}

      {ready ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-400 h-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#092e33]/20 blur-[2px]"
        />
      ) : null}
    </div>
  );
}
