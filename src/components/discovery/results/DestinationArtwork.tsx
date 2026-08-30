import type { CSSProperties } from "react";

import type { DestinationVisual } from "@/types/destination";

type DestinationArtworkProps = {
  visual: DestinationVisual;
};

const visualPalettes = {
  alpine: ["#c8ddd8", "#789d96", "#284d50"],
  coastal: ["#f0d49e", "#60c4bd", "#17677a"],
  heritage: ["#e5c9a6", "#b17d6a", "#554a51"],
  city: ["#c8d7d8", "#718d93", "#344c58"],
  lake: ["#c7ded6", "#5da8a1", "#285b69"],
  nightlife: ["#d49587", "#735a7d", "#27334d"],
} as const satisfies Record<DestinationVisual, readonly [string, string, string]>;

export default function DestinationArtwork({ visual }: DestinationArtworkProps) {
  const [from, via, to] = visualPalettes[visual];

  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden border-b border-white/25 sm:h-36"
      style={
        {
          background: `linear-gradient(145deg, ${from}, ${via} 58%, ${to})`,
          "--art-from": from,
          "--art-via": via,
          "--art-to": to,
        } as CSSProperties
      }
    >
      <span className="absolute -top-14 -right-9 size-40 rounded-full border border-white/25 bg-white/10 shadow-[0_0_0_3rem_rgba(255,255,255,0.035)]" />
      <span className="absolute top-4 left-5 h-px w-20 bg-white/35" />

      <svg
        focusable="false"
        viewBox="0 0 640 180"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full text-[#133d45]"
      >
        {visual === "alpine" ? (
          <>
            <path d="M0 180 0 143 122 61l63 61 69-87 122 124 87-95 177 116Z" fill="rgba(240,249,246,.33)" />
            <path d="m122 61 28 27 35 34 22-28 47-59 35 36 87 88 44-48 43-47 39 25 138 91H0Z" fill="rgba(22,67,68,.23)" />
            <path d="m226 70 28-35 35 36-17-8-12 15-13-12Z" fill="rgba(255,255,255,.6)" />
          </>
        ) : null}

        {visual === "coastal" ? (
          <>
            <circle cx="492" cy="45" r="23" fill="rgba(255,244,199,.72)" />
            <path d="M0 116c95-15 166 17 254 4 101-15 166-4 243 9 52 9 91 5 143-7v58H0Z" fill="rgba(19,90,105,.25)" />
            <path d="M0 137c89-11 145 14 233 4 109-13 187 12 282 7 48-3 82-10 125-18" fill="none" stroke="rgba(242,255,252,.7)" strokeWidth="2" />
            <path d="M0 92h640" stroke="rgba(255,255,255,.32)" />
          </>
        ) : null}

        {visual === "heritage" ? (
          <>
            <path d="M0 180V111h94V75h81v105m32 0V55h112v125m31 0V91h82v89m34 0V66h112v114m26 0v-53h36v53Z" fill="rgba(54,52,57,.25)" />
            <path d="M236 180v-77c0-29 18-48 27-48s27 19 27 48v77m211 0v-71c0-26 15-43 21-43s21 17 21 43v71" fill="none" stroke="rgba(255,247,229,.58)" strokeWidth="3" />
            <path d="M0 126h640" stroke="rgba(255,255,255,.2)" />
          </>
        ) : null}

        {visual === "city" ? (
          <>
            <path d="M0 180v-45h51V88h58v92h29V59h76v121h33V103h46v77h37V72h80v108h35v-55h55v55h34V91h73v89h53" fill="rgba(23,55,65,.28)" />
            <g fill="rgba(236,250,247,.5)">
              <path d="M66 105h8v8h-8zm19 0h8v8h-8zm70-24h9v9h-9zm23 0h9v9h-9zm174 14h9v9h-9zm25 0h9v9h-9zm173 17h9v9h-9z" />
            </g>
          </>
        ) : null}

        {visual === "lake" ? (
          <>
            <path d="M0 123 105 65l58 39 76-76 104 92 81-70 132 73 84-45v102H0Z" fill="rgba(239,250,246,.33)" />
            <path d="M0 124c107 9 174-7 268 0 111 9 206-5 372 2v54H0Z" fill="rgba(24,85,96,.25)" />
            <path d="M68 143h504m-443 17h375" stroke="rgba(238,255,252,.46)" strokeWidth="2" />
          </>
        ) : null}

        {visual === "nightlife" ? (
          <>
            <path d="m115 0 92 180H76L91 0Zm323 0-47 180h142L462 0Z" fill="rgba(252,221,185,.14)" />
            <path d="M0 180v-36h87v-33h68v69h40v-51h92v51h51v-70h90v70h44v-46h95v46h73" fill="rgba(25,34,57,.38)" />
            <circle cx="207" cy="54" r="7" fill="rgba(255,220,177,.72)" />
            <circle cx="391" cy="76" r="5" fill="rgba(223,211,255,.68)" />
          </>
        ) : null}
      </svg>

      <span className="absolute right-5 bottom-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-white/75" />
        <span className="h-px w-8 bg-white/55" />
        <span className="size-1.5 rounded-full border border-white/75" />
      </span>
    </div>
  );
}
