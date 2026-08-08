import type { LandingScene } from "@/data/landingTranslations";

import styles from "./LandingHero.module.css";

type SceneBackgroundProps = {
  activeScene: LandingScene;
  outgoingScene: LandingScene | null;
};

type SceneProps = {
  active: boolean;
  moving: boolean;
};

function BeachScene({ active, moving }: SceneProps) {
  return (
    <div
      className={`${styles.scene} ${styles.beachScene} ${
        active ? styles.activeScene : ""
      } ${
        moving ? styles.motionScene : ""
      }`}
    >
      <div className={styles.beachSun} />
      <div className={styles.beachHorizon} />
      <div className={styles.beachCoast} />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className={styles.ocean}
      >
        <path
          className={styles.waveBack}
          d="M-120 535 C160 490 340 575 610 530 C890 485 1070 565 1560 505 L1560 930 L-120 930 Z"
        />
        <path
          className={styles.waveMiddle}
          d="M-120 615 C170 550 390 665 690 598 C980 535 1210 640 1560 570 L1560 930 L-120 930 Z"
        />
        <path
          className={styles.waveFront}
          d="M-120 705 C180 625 435 750 760 675 C1040 610 1280 720 1560 650 L1560 930 L-120 930 Z"
        />
      </svg>
    </div>
  );
}

function MountainsScene({ active, moving }: SceneProps) {
  return (
    <div
      className={`${styles.scene} ${styles.mountainsScene} ${
        active ? styles.activeScene : ""
      } ${
        moving ? styles.motionScene : ""
      }`}
    >
      <div className={styles.mountainLight} />
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className={styles.mountainLandscape}
      >
        <path
          className={styles.mountainFar}
          d="M-80 730 250 350 430 565 665 240 930 555 1115 315 1520 715V940H-80Z"
        />
        <path
          className={styles.mountainMid}
          d="M-80 790 235 500 390 635 620 365 815 590 1020 425 1240 620 1520 475V940H-80Z"
        />
        <path
          className={styles.mountainFront}
          d="M-80 850 270 625 510 750 735 525 955 730 1195 570 1520 755V940H-80Z"
        />
      </svg>
      <div className={`${styles.mist} ${styles.mistOne}`} />
      <div className={`${styles.mist} ${styles.mistTwo}`} />
      <span className={`${styles.windStreak} ${styles.windStreakOne}`} />
      <span className={`${styles.windStreak} ${styles.windStreakTwo}`} />
      <span className={`${styles.windStreak} ${styles.windStreakThree}`} />
    </div>
  );
}

function CityScene({ active, moving }: SceneProps) {
  return (
    <div
      className={`${styles.scene} ${styles.cityScene} ${
        active ? styles.activeScene : ""
      } ${
        moving ? styles.motionScene : ""
      }`}
    >
      <div className={styles.citySun} />
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className={styles.citySkyline}
      >
        <g className={styles.cityFarBuildings}>
          <rect x="0" y="505" width="135" height="330" />
          <rect x="150" y="430" width="170" height="405" />
          <rect x="340" y="535" width="120" height="300" />
          <rect x="480" y="385" width="185" height="450" />
          <rect x="690" y="485" width="145" height="350" />
          <rect x="855" y="405" width="215" height="430" />
          <rect x="1095" y="525" width="125" height="310" />
          <rect x="1240" y="450" width="200" height="385" />
        </g>
        <g className={styles.cityMidBuildings}>
          <path d="M0 665h215V480l108-86 107 86v185h170V535h255v130h150V445h180v220h255v235H0Z" />
        </g>
        <g className={styles.cityWindows}>
          <rect x="184" y="485" width="18" height="10" />
          <rect x="236" y="485" width="18" height="10" />
          <rect x="515" y="448" width="20" height="11" />
          <rect x="565" y="448" width="20" height="11" />
          <rect x="615" y="448" width="20" height="11" />
          <rect x="905" y="470" width="20" height="11" />
          <rect x="958" y="470" width="20" height="11" />
          <rect x="1012" y="470" width="20" height="11" />
          <rect x="1280" y="505" width="20" height="11" />
          <rect x="1330" y="505" width="20" height="11" />
        </g>
        <path className={styles.cityRoad} d="M0 780h1440v120H0Z" />
      </svg>

      <div className={styles.cityLane} />
      <div className={styles.cyclist}>
        <svg viewBox="0 0 190 107" fill="none">
          <ellipse
            className={styles.cyclistShadow}
            cx="95"
            cy="105"
            rx="72"
            ry="2"
          />

          <g className={styles.bicycleWheels}>
            <circle cx="42" cy="80" r="26" />
            <circle cx="149" cy="80" r="26" />
          </g>
          <g className={styles.bicycleSpokes}>
            <path d="M42 54v52M16 80h52M149 54v52M123 80h52" />
          </g>
          <g className={styles.bicycleFrame}>
            <path d="M42 80 75 44 92 78 42 80ZM75 44l46 4 7 17-36 13Z" />
            <path d="M128 65l21 15M121 48l7-13 11-1M134 34h10M67 41c5 1 12 1 17 0" />
          </g>
          <g className={styles.bicycleDetails}>
            <circle cx="42" cy="80" r="2.5" />
            <circle cx="149" cy="80" r="2.5" />
            <circle cx="92" cy="78" r="4" />
            <path d="M92 78 102 71M92 78 82 85M98 71h12M78 85h12" />
          </g>

          <g className={styles.cyclistRider}>
            <circle className={styles.riderHead} cx="82" cy="10" r="7.25" />
            <path
              className={styles.riderTorso}
              d="M77 16c5-2 11 0 15 5l5 6-7 6c-4 3-7 6-10 10l-10-3c3-11 4-19 7-24Z"
            />
            <path
              className={styles.riderArm}
              d="M89 23c9 2 15 6 20 12l25-1M93 25c10 2 18 7 22 13l24-4"
            />
            <path
              className={styles.riderLeg}
              d="M79 41 103 49 102 71M74 41 63 63 82 85"
            />
            <path className={styles.riderFoot} d="m102 71 10 1M82 85l10 1" />
          </g>
        </svg>
      </div>
      <span className={`${styles.cityLight} ${styles.cityLightOne}`} />
      <span className={`${styles.cityLight} ${styles.cityLightTwo}`} />
      <span className={`${styles.cityLight} ${styles.cityLightThree}`} />
    </div>
  );
}

function ConcertScene({ active, moving }: SceneProps) {
  return (
    <div
      className={`${styles.scene} ${styles.concertScene} ${
        active ? styles.activeScene : ""
      } ${
        moving ? styles.motionScene : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        className={styles.concertStage}
      >
        <g transform="translate(720 127) scale(1.1) translate(-720 -127)">
          <g className={styles.stageBeams}>
          <path
            className={`${styles.stageBeam} ${styles.stageBeamLeft}`}
            d="M500 321 420 135h160Z"
          />
          <path
            className={`${styles.stageBeam} ${styles.stageBeamCenter}`}
            d="M720 321 640 128h170Z"
          />
          <path
            className={`${styles.stageBeam} ${styles.stageBeamRight}`}
            d="M1080 321 1000 145h160Z"
          />
          </g>

          <g className={styles.stageBacklights}>
            <circle className={styles.backlightOuter} cx="720" cy="225" r="112" />
            <circle className={styles.backlightInner} cx="720" cy="225" r="76" />
          </g>

          <g className={styles.stageArchitecture}>
            <path d="M390 321V135h38v186M1012 321V135h38v186M390 135h660M390 165h660" />
          </g>
          <g className={styles.stageFixtures}>
            <circle cx="500" cy="153" r="7" />
            <circle cx="660" cy="153" r="7" />
            <circle cx="820" cy="153" r="7" />
            <circle cx="980" cy="153" r="7" />
          </g>

          <path
            className={styles.stagePlatformTop}
            d="M350 321h740l-40 20H390Z"
          />
          <path className={styles.stagePlatformFront} d="M390 328h660v32H390Z" />

          <g className={styles.microphoneStand}>
            <path d="M790 176v145M771 321h38M790 176l-22-12" />
            <ellipse
              className={styles.microphone}
              cx="763"
              cy="162"
              rx="10"
              ry="5"
              transform="rotate(18 763 162)"
            />
          </g>

          <g className={styles.performerSilhouette}>
            <circle className={styles.performerBody} cx="720" cy="147" r="20" />
            <path
              className={styles.performerBody}
              d="M712 164h16v15c14 3 24 12 28 25l-8 62c-18 8-38 8-56 0l-8-62c4-13 14-22 28-25Z"
            />
            <path
              className={styles.performerArm}
              d="M694 198 676 229 686 256M746 198 766 218 790 176"
            />
            <path
              className={styles.performerLeg}
              d="M707 264 704 288 700 319M733 264 738 288 746 319"
            />
            <path className={styles.performerFoot} d="M694 321h16M740 321h17" />
          </g>
        </g>

        <path
          className={styles.concertAudience}
          d="M0 360v-7c100-10 190-7 285 0 105-11 205-8 300 0 110-11 215-8 310 0 105-10 205-7 300 0 90-9 170-7 245 0v7Z"
        />
      </svg>
    </div>
  );
}

export default function SceneBackground({
  activeScene,
  outgoingScene,
}: SceneBackgroundProps) {
  return (
    <div className={styles.sceneStack} aria-hidden="true">
      <BeachScene
        active={activeScene === "beach"}
        moving={activeScene === "beach" || outgoingScene === "beach"}
      />
      <MountainsScene
        active={activeScene === "mountains"}
        moving={activeScene === "mountains" || outgoingScene === "mountains"}
      />
      <CityScene
        active={activeScene === "city"}
        moving={activeScene === "city" || outgoingScene === "city"}
      />
      <ConcertScene
        active={activeScene === "concert"}
        moving={activeScene === "concert" || outgoingScene === "concert"}
      />
    </div>
  );
}
