import type { TripSubtype, TripType } from "@/types/tripPreferences";

type TripPanelArtworkProps = {
  tripType: TripType;
  tripSubtype: TripSubtype | null;
  className: string;
};

function BeachArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const rocky = tripSubtype === "beach-rocky";
  const coves = tripSubtype === "beach-coves";

  return (
    <>
      <circle cx="322" cy="105" r="45" fill="var(--theme-accent)" opacity="0.78" />
      <path d="M0 273C90 246 174 255 257 277s120 15 163 0v243H0Z" opacity="0.2" />
      <path
        d="M-20 325c73-27 123-25 181-2 70 27 135 27 279-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        opacity="0.42"
      />
      <path
        d="M-12 354c86-24 146-14 207 8 70 25 142 11 242-18"
        fill="none"
        stroke="var(--theme-accent)"
        strokeWidth="4"
        opacity="0.65"
      />
      {rocky ? (
        <path d="M0 407l56-49 43 19 38-28 57 72 50 99H0Z" opacity="0.46" />
      ) : null}
      {coves ? (
        <>
          <path d="M0 255l72 25 41 74-31 166H0Z" opacity="0.52" />
          <path d="M420 230l-67 40-35 96 36 154h66Z" opacity="0.58" />
        </>
      ) : null}
      {!rocky && !coves ? (
        <path d="M-5 417c105-39 210-28 430 22v81H-5Z" fill="var(--theme-accent)" opacity="0.4" />
      ) : null}
    </>
  );
}

function MountainsArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const snowy = tripSubtype === "mountains-snowy";
  const lake = tripSubtype === "mountains-alpine-lakes";

  return (
    <>
      <path d="M-30 374 109 169l68 84 65-129 207 250v146H-30Z" opacity="0.26" />
      <path d="m76 430 113-208 47 74 55-126 151 260v90H76Z" opacity="0.48" />
      {snowy ? (
        <>
          <path d="m189 222 22 35 25 39-22-11-16 13-17-13-16 10Z" fill="var(--theme-accent)" opacity="0.88" />
          <path d="m291 170 34 58 25 43-27-12-21 16-19-18-21 11Z" fill="var(--theme-accent)" opacity="0.9" />
        </>
      ) : null}
      {lake ? (
        <path d="M10 415c101-28 265-28 400 2v103H10Z" fill="var(--theme-accent)" opacity="0.32" />
      ) : (
        <path d="M-20 435c119-45 277-29 460 10v75H-20Z" opacity="0.35" />
      )}
      <path d="M-20 335c97-29 190-20 278 3 74 20 135 19 182 8" fill="none" stroke="currentColor" strokeWidth="12" opacity="0.11" />
    </>
  );
}

function CityArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const historic = tripSubtype === "city-historic";
  const modern = tripSubtype === "city-modern";
  const lively = tripSubtype === "city-nightlife";

  return (
    <>
      <path d="M0 450h420v70H0Z" opacity="0.35" />
      {historic ? (
        <>
          <path d="M23 297h84v153H23Zm100-55h91v208h-91Zm109 78h76v130h-76Zm93-47h78v177h-78Z" opacity="0.43" />
          <path d="m16 297 49-44 50 44m2-55 51-50 53 50m103 31 39-37 48 37" fill="none" stroke="currentColor" strokeWidth="15" opacity="0.43" />
          <path d="M171 192v-55m-13 0h26" stroke="var(--theme-accent)" strokeWidth="5" opacity="0.65" />
        </>
      ) : (
        <>
          <path d="M22 328h73v122H22Zm91-173h70v295h-70Zm88 93h75v202h-75Zm91-143h78v345h-78Zm92 213h51v132h-51Z" opacity={modern ? 0.5 : 0.42} />
          {modern ? <path d="m113 155 70 0-21-45h-31Z" fill="var(--theme-accent)" opacity="0.38" /> : null}
        </>
      )}
      <g fill="var(--theme-accent)" opacity={lively ? 0.82 : 0.35}>
        <rect x="132" y="201" width="10" height="14" rx="2" />
        <rect x="154" y="201" width="10" height="14" rx="2" />
        <rect x="221" y="286" width="10" height="14" rx="2" />
        <rect x="312" y="164" width="11" height="15" rx="2" />
        <rect x="339" y="198" width="11" height="15" rx="2" />
        <rect x="48" y="356" width="10" height="14" rx="2" />
      </g>
    </>
  );
}

function NatureArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  return (
    <>
      <path d="M-15 336c92-91 170-92 252 0 61-70 128-81 198-16v200H-15Z" opacity="0.27" />
      <g opacity="0.46">
        <path d="m33 426 42-116 42 116Zm265 4 49-142 49 142ZM0 454l34-91 33 91Z" />
      </g>
      {tripSubtype === "nature-camping" ? (
        <path d="m135 451 72-112 77 112Zm72-112v112" fill="var(--theme-accent)" opacity="0.68" stroke="currentColor" strokeWidth="4" />
      ) : null}
      {tripSubtype === "nature-camper" ? (
        <g opacity="0.72">
          <path d="M107 368h170l45 39v55H97v-78Z" fill="var(--theme-accent)" />
          <circle cx="150" cy="463" r="18" />
          <circle cx="277" cy="463" r="18" />
          <path d="M235 382h37l28 27h-65Z" opacity="0.55" />
        </g>
      ) : null}
      {tripSubtype === "nature-cabin" ? (
        <g opacity="0.72">
          <path d="M121 365h183v100H121Z" />
          <path d="m97 374 116-91 116 91Z" fill="var(--theme-accent)" />
          <rect x="194" y="405" width="38" height="60" fill="var(--theme-accent)" opacity="0.65" />
        </g>
      ) : null}
      {tripSubtype === "nature-hiking" ? (
        <path d="M197 520c-12-91 66-103 20-184 38 54 19 92 6 116-12 23-5 47 7 68Z" fill="var(--theme-accent)" opacity="0.66" />
      ) : null}
      {tripSubtype === null || tripSubtype === "nature-any" ? (
        <path d="M172 520c15-66 17-121 7-177 38 50 51 109 47 177Z" fill="var(--theme-accent)" opacity="0.38" />
      ) : null}
    </>
  );
}

function CultureArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const art = tripSubtype === "culture-art";
  const traditions = tripSubtype === "culture-traditions";

  return (
    <>
      <path d="M59 210h302v36H59Zm20 48h39v191H79Zm75 0h39v191h-39Zm74 0h39v191h-39Zm75 0h39v191h-39ZM53 449h314v32H53Z" opacity="0.42" />
      <path d="m43 210 167-95 167 95Z" fill="var(--theme-accent)" opacity="0.42" />
      {art ? (
        <>
          <rect x="147" y="286" width="126" height="112" rx="4" fill="none" stroke="var(--theme-accent)" strokeWidth="12" opacity="0.82" />
          <circle cx="211" cy="333" r="20" fill="var(--theme-accent)" opacity="0.58" />
          <path d="m162 384 36-39 25 25 29-44" fill="none" stroke="var(--theme-accent)" strokeWidth="7" opacity="0.65" />
        </>
      ) : (
        <path d="M183 449V330a28 28 0 0 1 56 0v119Z" fill="var(--theme-accent)" opacity="0.48" />
      )}
      {traditions ? (
        <g fill="none" stroke="var(--theme-accent)" strokeWidth="5" opacity="0.58">
          <circle cx="87" cy="168" r="25" />
          <circle cx="333" cy="168" r="25" />
          <path d="m69 168 18-18 18 18-18 18Zm246 0 18-18 18 18-18 18Z" />
        </g>
      ) : null}
    </>
  );
}

function EntertainmentArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const shows = tripSubtype === "entertainment-shows";
  const nightlife = tripSubtype === "entertainment-nightlife";

  return (
    <>
      {!shows ? (
        <g fill="none" stroke="currentColor" opacity="0.48">
          <circle cx="210" cy="303" r="119" strokeWidth="11" />
          <circle cx="210" cy="303" r="17" fill="var(--theme-accent)" strokeWidth="4" />
          <path d="M210 184v238M91 303h238M126 219l168 168m0-168L126 387" strokeWidth="6" />
          <path d="m151 520 59-98 58 98" strokeWidth="13" />
        </g>
      ) : (
        <>
          <path d="M55 208h310v242H55Z" opacity="0.35" />
          <path d="M62 217c65 39 105 76 148 156 42-80 84-117 148-156v233H62Z" fill="var(--theme-accent)" opacity="0.43" />
          <path d="M134 450c11-72 38-115 76-149 39 35 65 77 76 149Z" opacity="0.5" />
        </>
      )}
      {nightlife ? (
        <g fill="var(--theme-accent)" opacity="0.78">
          <circle cx="73" cy="173" r="8" />
          <circle cx="348" cy="207" r="6" />
          <circle cx="310" cy="130" r="9" />
          <circle cx="112" cy="244" r="5" />
        </g>
      ) : null}
    </>
  );
}

function EventArtwork({ tripSubtype }: { tripSubtype: TripSubtype | null }) {
  const sport = tripSubtype === "event-sport";
  const theatre = tripSubtype === "event-theatre";

  if (sport) {
    return (
      <>
        <ellipse cx="210" cy="337" rx="169" ry="111" fill="none" stroke="currentColor" strokeWidth="18" opacity="0.42" />
        <ellipse cx="210" cy="337" rx="112" ry="63" fill="var(--theme-accent)" opacity="0.35" />
        <path d="M41 337v105h338V337" fill="none" stroke="currentColor" strokeWidth="16" opacity="0.38" />
      </>
    );
  }

  return (
    <>
      <path d="M52 159h316v25H52Zm17 25h18v242H69Zm264 0h18v242h-18ZM38 426h344v49H38Z" opacity="0.48" />
      <path d="m99 184 76 242H53Zm222 0-76 242h122Z" fill="var(--theme-accent)" opacity="0.16" />
      {theatre ? (
        <>
          <path d="M68 184c16 93 61 127 142 166V184Zm284 0c-16 93-61 127-142 166V184Z" fill="var(--theme-accent)" opacity="0.5" />
          <path d="M154 426c5-78 23-120 56-150 34 30 51 72 56 150Z" opacity="0.5" />
        </>
      ) : (
        <g opacity="0.72">
          <circle cx="210" cy="263" r="24" fill="var(--theme-accent)" />
          <path d="M180 416c6-84 8-119 30-129 22 10 25 45 31 129Z" />
          <path d="m193 316-52 52m84-56 52 20" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
          <path d="M278 297v129m-18-129h36" fill="none" stroke="var(--theme-accent)" strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
    </>
  );
}

export default function TripPanelArtwork({
  tripType,
  tripSubtype,
  className,
}: TripPanelArtworkProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 420 520"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      {tripType === "Beach" ? <BeachArtwork tripSubtype={tripSubtype} /> : null}
      {tripType === "Mountains" ? (
        <MountainsArtwork tripSubtype={tripSubtype} />
      ) : null}
      {tripType === "City" ? <CityArtwork tripSubtype={tripSubtype} /> : null}
      {tripType === "Nature" ? <NatureArtwork tripSubtype={tripSubtype} /> : null}
      {tripType === "Culture" ? <CultureArtwork tripSubtype={tripSubtype} /> : null}
      {tripType === "Entertainment" ? (
        <EntertainmentArtwork tripSubtype={tripSubtype} />
      ) : null}
      {tripType === "Concert / Event" ? (
        <EventArtwork tripSubtype={tripSubtype} />
      ) : null}
    </svg>
  );
}
