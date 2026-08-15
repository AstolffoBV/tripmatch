import type {
  AccommodationType,
  BudgetMode,
  DurationPreference,
  MealPreference,
  OriginMode,
  QuestionNumber,
  TimingMode,
  TransportMode,
  TripSubtype,
  TravellerGroup,
  TravelMonth,
  TripType,
} from "@/types/tripPreferences";

export const supportedLanguages = [
  { code: "en", name: "English", shortLabel: "EN" },
  { code: "ro", name: "Română", shortLabel: "RO" },
  { code: "es", name: "Español", shortLabel: "ES" },
  { code: "de", name: "Deutsch", shortLabel: "DE" },
  { code: "fr", name: "Français", shortLabel: "FR" },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]["code"];

export const LANGUAGE_COOKIE_NAME = "tripmatch-language";

export const languageLocales = {
  en: "en-US",
  ro: "ro-RO",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
} as const satisfies Record<LanguageCode, string>;

export type LandingScene = "beach" | "mountains" | "city" | "concert";

export const landingSceneOrder = [
  "beach",
  "mountains",
  "city",
  "concert",
] as const satisfies readonly LandingScene[];

type NounForms = {
  one: string;
  other: string;
};

type CommonTranslation = {
  languageSelectorLabel: string;
  homeLabel: string;
  back: string;
  continue: string;
  question: string;
  setAutomatically: string;
  decrease: string;
  increase: string;
  notSelected: string;
  nouns: {
    traveller: NounForms;
    adult: NounForms;
    child: NounForms;
    pet: NounForms;
    room: NounForms;
    bedroom: NounForms;
    bed: NounForms;
    night: NounForms;
  };
};

type LandingTranslation = {
  brand: string;
  tagline: readonly [string, string];
  cta: string;
  scenes: Record<LandingScene, string>;
};

type ProgressTranslation = {
  navigationLabel: string;
  questionOf: string;
  complete: string;
  allReached: string;
  reached: string;
  questionsReachedLabel: string;
  tooltip: string;
  derivedTooltip: string;
  currentQuestion: string;
  goToQuestion: string;
  derivedDurationNavigation: string;
  notVisited: string;
  labels: Record<QuestionNumber, string>;
};

type QuestionOneTranslation = {
  heading: string;
  subtitle: string;
  options: Record<TripType, string>;
  subtypePrompts: Record<TripType, string>;
  subtypes: Record<TripSubtype, string>;
  browser: {
    regionLabel: string;
    previousCategories: string;
    nextCategories: string;
    openCategory: string;
    selectSubtype: string;
    showingCategories: string;
  };
};

type QuestionTwoTranslation = {
  heading: string;
  subtitle: string;
  groups: Record<TravellerGroup, string>;
  groupDescriptions: Record<TravellerGroup, string>;
  yourGroup: string;
  yourSetup: string;
  adults: string;
  children: string;
  pets: string;
  rooms: string;
  suggestedBedrooms: string;
  beds: string;
  sleepingSetup: string;
  underEighteen: string;
  doubleBed: NounForms;
  singleBed: NounForms;
};

type QuestionThreeTranslation = {
  heading: string;
  subtitle: string;
  modes: Record<BudgetMode, string>;
  currency: string;
  amountPlaceholder: string;
  averagePerTraveller: string;
  estimatedTotal: string;
};

type QuestionFourTranslation = {
  heading: string;
  subtitle: string;
  options: Record<AccommodationType, string>;
  groupNeeds: string;
  petFriendlyRequired: string;
};

type QuestionFiveTranslation = {
  heading: string;
  subtitle: string;
  options: Record<MealPreference, string>;
};

type QuestionSixTranslation = {
  heading: string;
  modes: Record<TimingMode, string>;
  departureDate: string;
  returnDate: string;
  month: string;
  year: string;
  selectMonth: string;
  selectYear: string;
  returnDateError: string;
  flexibleHelper: string;
  months: Record<TravelMonth, string>;
};

type DurationOptionTranslation = {
  label: string;
  description: string;
};

type QuestionSevenTranslation = {
  heading: string;
  options: Record<DurationPreference, DurationOptionTranslation>;
};

type QuestionEightTranslation = {
  heading: string;
  subtitle: string;
  modes: Record<OriginMode, string>;
  cityAndCountry: string;
  manualPlaceholder: string;
  requestingLocation: string;
  currentLocationSelected: string;
  locationPermissionHelper: string;
  errors: {
    unavailableInBrowser: string;
    generic: string;
    permissionDenied: string;
    unavailable: string;
    timeout: string;
  };
};

type QuestionNineTranslation = {
  heading: string;
  subtitle: string;
  options: Record<TransportMode, string>;
};

type SummaryTranslation = {
  heading: string;
  categories: Record<QuestionNumber, string>;
  enteredAs: string;
  totalAmount: string;
  perTravellerAmount: string;
  petFriendlyRequired: string;
  dateRange: string;
  flexibleDates: string;
  calculatedFromExactDates: string;
  currentLocation: string;
  nextStepNote: string;
  continueToMatching: string;
};

export type Translation = {
  common: CommonTranslation;
  landing: LandingTranslation;
  discover: {
    progress: ProgressTranslation;
    q1: QuestionOneTranslation;
    q2: QuestionTwoTranslation;
    q3: QuestionThreeTranslation;
    q4: QuestionFourTranslation;
    q5: QuestionFiveTranslation;
    q6: QuestionSixTranslation;
    q7: QuestionSevenTranslation;
    q8: QuestionEightTranslation;
    q9: QuestionNineTranslation;
    summary: SummaryTranslation;
  };
};

export const translations = {
  en: {
    common: {
      languageSelectorLabel: "Select language",
      homeLabel: "TripMatch home",
      back: "Back",
      continue: "Continue",
      question: "Question {number}",
      setAutomatically: "Set automatically",
      decrease: "Decrease {label}",
      increase: "Increase {label}",
      notSelected: "Not selected",
      nouns: {
        traveller: { one: "traveller", other: "travellers" },
        adult: { one: "adult", other: "adults" },
        child: { one: "child", other: "children" },
        pet: { one: "pet", other: "pets" },
        room: { one: "room", other: "rooms" },
        bedroom: { one: "bedroom", other: "bedrooms" },
        bed: { one: "bed", other: "beds" },
        night: { one: "night", other: "nights" },
      },
    },
    landing: {
      brand: "TripMatch",
      tagline: [
        "Don't choose a destination.",
        "Let the destination choose you.",
      ],
      cta: "Find my destination",
      scenes: {
        beach: "Beach",
        mountains: "Mountains",
        city: "City",
        concert: "Concerts",
      },
    },
    discover: {
      progress: {
        navigationLabel: "Questionnaire progress",
        questionOf: "Question {current} of {total}",
        complete: "Questionnaire complete",
        allReached: "All {total} questions reached",
        reached: "{highest} of {total} questions reached",
        questionsReachedLabel: "Questions reached",
        tooltip: "{number} · {label}",
        derivedTooltip: "{number} · {label} — {duration}",
        currentQuestion: "Current question: {number}, {label}",
        goToQuestion: "Go to Question {number}: {label}",
        derivedDurationNavigation:
          "Question 7: Duration, {duration}. Go to Question 6: When to change it.",
        notVisited: "Question {number}: {label}, not yet visited",
        labels: {
          1: "Trip",
          2: "Travellers",
          3: "Budget",
          4: "Stay",
          5: "Meals",
          6: "When",
          7: "Duration",
          8: "Origin",
          9: "Transport",
        },
      },
      q1: {
        heading: "What kind of trip are you looking for?",
        subtitle: "Choose the experience you want most.",
        options: {
          Beach: "Beach",
          Mountains: "Mountains",
          City: "City",
          Nature: "Nature",
          Culture: "Culture",
          Entertainment: "Entertainment",
          "Concert / Event": "Concert / Event",
        },
        subtypePrompts: {
          Beach: "What kind of beach?",
          Mountains: "What kind of mountain escape?",
          City: "What kind of city break?",
          Nature: "How do you want to experience nature?",
          Culture: "What kind of culture interests you most?",
          Entertainment: "What kind of entertainment are you looking for?",
          "Concert / Event": "What kind of event are you travelling for?",
        },
        subtypes: {
          "beach-sandy": "Sandy beach",
          "beach-rocky": "Pebble / rocky coast",
          "beach-coves": "Scenic coves",
          "beach-any": "No preference",
          "mountains-green": "Green mountains",
          "mountains-snowy": "Snowy mountains",
          "mountains-alpine-lakes": "Alpine lakes",
          "mountains-any": "No preference",
          "city-historic": "Historic old town",
          "city-modern": "Modern city",
          "city-nightlife": "Lively / nightlife",
          "city-any": "No preference",
          "nature-camping": "Camping",
          "nature-camper": "Camper / caravan",
          "nature-cabin": "Cabin / lodge",
          "nature-hiking": "Hiking & day trips",
          "nature-any": "No preference",
          "culture-art": "Art museums",
          "culture-history": "History museums",
          "culture-architecture": "Architecture & monuments",
          "culture-traditions": "Local traditions",
          "culture-any": "No preference",
          "entertainment-theme-parks": "Theme parks & attractions",
          "entertainment-nightlife": "Nightlife",
          "entertainment-shows": "Shows & performances",
          "entertainment-family": "Family entertainment",
          "entertainment-any": "No preference",
          "event-concert": "Concert",
          "event-festival": "Music festival",
          "event-sport": "Sporting event",
          "event-theatre": "Theatre / live show",
          "event-any": "No preference",
        },
        browser: {
          regionLabel: "Trip categories",
          previousCategories: "Show previous trip categories",
          nextCategories: "Show next trip categories",
          openCategory: "Open {category} options",
          selectSubtype: "Select {subtype} for {category}",
          showingCategories:
            "Showing categories {start}–{end} of {total}",
        },
      },
      q2: {
        heading: "Who are you travelling with?",
        subtitle: "Choose your group and fine-tune the details below.",
        groups: {
          solo: "Solo",
          couple: "Couple",
          family: "Family",
          friends: "Friends",
          other: "Other",
        },
        groupDescriptions: {
          solo: "Just me",
          couple: "Two travellers",
          family: "Adults & children",
          friends: "Travelling together",
          other: "Custom group",
        },
        yourGroup: "Your group",
        yourSetup: "Your setup",
        adults: "Adults",
        children: "Children",
        pets: "Pets",
        rooms: "Rooms",
        suggestedBedrooms: "Suggested bedrooms",
        beds: "Beds",
        sleepingSetup: "Sleeping setup",
        underEighteen: "Anyone under 18 counts as a child.",
        doubleBed: { one: "Double bed", other: "Double beds" },
        singleBed: { one: "Single bed", other: "Single beds" },
      },
      q3: {
        heading: "What's your budget?",
        subtitle:
          "Include transport, accommodation, food and activities for the whole trip.",
        modes: {
          total: "Total trip budget",
          perTraveller: "Budget per traveller",
        },
        currency: "Currency",
        amountPlaceholder: "12000",
        averagePerTraveller:
          "≈ {amount} {currency} average per traveller",
        estimatedTotal: "≈ {amount} {currency} estimated total",
      },
      q4: {
        heading: "Where would you be happy to stay?",
        subtitle: "Choose all accommodation types that work for you.",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Apartment",
          "Villa / Holiday home": "Villa / Holiday home",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "No preference",
        },
        groupNeeds: "Your group needs approximately:",
        petFriendlyRequired:
          "Pet-friendly accommodation will be required.",
      },
      q5: {
        heading: "How would you like to handle meals?",
        subtitle: "Choose all options that would work for you.",
        options: {
          "All inclusive": "All inclusive",
          "Half board": "Half board",
          "Breakfast included": "Breakfast included",
          "Mostly eat at restaurants": "Mostly eat at restaurants",
          "Self-catering / cook myself": "Self-catering / cook myself",
          "No preference": "No preference",
        },
      },
      q6: {
        heading: "When do you want to travel?",
        modes: {
          exact: "I know my exact dates",
          rough: "I know roughly when",
          flexible: "I'm flexible",
        },
        departureDate: "Departure date",
        returnDate: "Return date",
        month: "Month",
        year: "Year",
        selectMonth: "Select a month",
        selectYear: "Select a year",
        returnDateError: "Return date must be later than departure date.",
        flexibleHelper:
          "No dates are required. You can choose a preferred duration next.",
        months: {
          January: "January",
          February: "February",
          March: "March",
          April: "April",
          May: "May",
          June: "June",
          July: "July",
          August: "August",
          September: "September",
          October: "October",
          November: "November",
          December: "December",
        },
      },
      q7: {
        heading: "How long would you like to stay?",
        options: {
          weekend: { label: "Weekend", description: "2–3 days" },
          short: { label: "Short trip", description: "4–5 days" },
          week: { label: "About a week", description: "6–8 days" },
          long: { label: "Long holiday", description: "9–14 days" },
          extended: { label: "Extended trip", description: "15+ days" },
        },
      },
      q8: {
        heading: "Where are you travelling from?",
        subtitle:
          "We'll use this later to estimate realistic travel options and costs.",
        modes: {
          currentLocation: "Use my current location",
          manual: "Enter a city manually",
        },
        cityAndCountry: "City and country",
        manualPlaceholder: "Timisoara, Romania",
        requestingLocation: "Requesting your current location…",
        currentLocationSelected: "Current location selected",
        locationPermissionHelper:
          "Click the location option to request browser permission.",
        errors: {
          unavailableInBrowser: "Location is unavailable in this browser.",
          generic: "We could not get your current location.",
          permissionDenied:
            "Location permission was denied. You can enter a city instead.",
          unavailable:
            "Your location is currently unavailable. Please try again or enter a city.",
          timeout:
            "The location request timed out. Please try again or enter a city.",
        },
      },
      q9: {
        heading: "How are you willing to get there?",
        subtitle: "Choose all transport options you'd consider.",
        options: {
          Car: "Car",
          Plane: "Plane",
          Train: "Train",
          Coach: "Coach",
          Ferry: "Ferry",
        },
      },
      summary: {
        heading: "Your base trip preferences",
        categories: {
          1: "Trip type",
          2: "Travellers",
          3: "Budget",
          4: "Accommodation",
          5: "Meals",
          6: "When",
          7: "Duration",
          8: "Origin",
          9: "Transport",
        },
        enteredAs: "Entered as {mode}",
        totalAmount: "{amount} {currency} total",
        perTravellerAmount: "{amount} {currency} per traveller",
        petFriendlyRequired: "Pet-friendly accommodation required",
        dateRange: "{departure} to {return}",
        flexibleDates: "Flexible dates",
        calculatedFromExactDates: "calculated from exact dates",
        currentLocation: "Current location ({coordinates})",
        nextStepNote:
          "Next, TripMatch will use these preferences to evaluate realistic destinations and transport options.",
        continueToMatching: "Continue to destination matching",
      },
    },
  },
  ro: {
    common: {
      languageSelectorLabel: "Selectează limba",
      homeLabel: "Pagina principală TripMatch",
      back: "Înapoi",
      continue: "Continuă",
      question: "Întrebarea {number}",
      setAutomatically: "Setat automat",
      decrease: "Scade: {label}",
      increase: "Crește: {label}",
      notSelected: "Neselectat",
      nouns: {
        traveller: { one: "călător", other: "călători" },
        adult: { one: "adult", other: "adulți" },
        child: { one: "copil", other: "copii" },
        pet: {
          one: "animal de companie",
          other: "animale de companie",
        },
        room: { one: "cameră", other: "camere" },
        bedroom: { one: "dormitor", other: "dormitoare" },
        bed: { one: "pat", other: "paturi" },
        night: { one: "noapte", other: "nopți" },
      },
    },
    landing: {
      brand: "TripMatch",
      tagline: [
        "Nu alege o destinație.",
        "Lasă destinația să te aleagă.",
      ],
      cta: "Găsește-mi destinația",
      scenes: {
        beach: "Plajă",
        mountains: "Munți",
        city: "Oraș",
        concert: "Concerte",
      },
    },
    discover: {
      progress: {
        navigationLabel: "Progresul chestionarului",
        questionOf: "Întrebarea {current} din {total}",
        complete: "Chestionar complet",
        allReached: "Toate cele {total} întrebări au fost parcurse",
        reached: "{highest} din {total} întrebări parcurse",
        questionsReachedLabel: "Întrebări parcurse",
        tooltip: "{number} · {label}",
        derivedTooltip: "{number} · {label} — {duration}",
        currentQuestion: "Întrebarea curentă: {number}, {label}",
        goToQuestion: "Mergi la întrebarea {number}: {label}",
        derivedDurationNavigation:
          "Întrebarea 7: Durată, {duration}. Mergi la întrebarea 6: Perioadă pentru a o modifica.",
        notVisited: "Întrebarea {number}: {label}, încă neparcursă",
        labels: {
          1: "Călătorie",
          2: "Călători",
          3: "Buget",
          4: "Cazare",
          5: "Mese",
          6: "Perioadă",
          7: "Durată",
          8: "Plecare",
          9: "Transport",
        },
      },
      q1: {
        heading: "Ce fel de călătorie cauți?",
        subtitle: "Alege experiența care contează cel mai mult pentru tine.",
        options: {
          Beach: "Plajă",
          Mountains: "Munți",
          City: "Oraș",
          Nature: "Natură",
          Culture: "Cultură",
          Entertainment: "Divertisment",
          "Concert / Event": "Concert / Eveniment",
        },
        subtypePrompts: {
          Beach: "Ce fel de plajă preferi?",
          Mountains: "Ce fel de escapadă la munte îți dorești?",
          City: "Ce fel de escapadă urbană îți dorești?",
          Nature: "Cum vrei să te bucuri de natură?",
          Culture:
            "Ce tip de experiență culturală te interesează cel mai mult?",
          Entertainment: "Ce fel de divertisment cauți?",
          "Concert / Event": "Pentru ce fel de eveniment călătorești?",
        },
        subtypes: {
          "beach-sandy": "Plajă cu nisip",
          "beach-rocky": "Plajă cu pietriș / coastă stâncoasă",
          "beach-coves": "Golfuri pitorești",
          "beach-any": "Fără preferințe",
          "mountains-green": "Munți înverziți",
          "mountains-snowy": "Munți înzăpeziți",
          "mountains-alpine-lakes": "Lacuri alpine",
          "mountains-any": "Fără preferințe",
          "city-historic": "Centru istoric",
          "city-modern": "Oraș modern",
          "city-nightlife": "Atmosferă animată / viață de noapte",
          "city-any": "Fără preferințe",
          "nature-camping": "Camping",
          "nature-camper": "Autorulotă / rulotă",
          "nature-cabin": "Cabană / refugiu",
          "nature-hiking": "Drumeții și excursii de o zi",
          "nature-any": "Fără preferințe",
          "culture-art": "Muzee de artă",
          "culture-history": "Muzee de istorie",
          "culture-architecture": "Arhitectură și monumente",
          "culture-traditions": "Tradiții locale",
          "culture-any": "Fără preferințe",
          "entertainment-theme-parks": "Parcuri tematice și atracții",
          "entertainment-nightlife": "Viață de noapte",
          "entertainment-shows": "Spectacole și reprezentații",
          "entertainment-family": "Divertisment pentru familii",
          "entertainment-any": "Fără preferințe",
          "event-concert": "Concert",
          "event-festival": "Festival de muzică",
          "event-sport": "Eveniment sportiv",
          "event-theatre": "Teatru / spectacol live",
          "event-any": "Fără preferințe",
        },
        browser: {
          regionLabel: "Categorii de călătorie",
          previousCategories:
            "Afișează categoriile de călătorie anterioare",
          nextCategories:
            "Afișează următoarele categorii de călătorie",
          openCategory: "Deschide categoria „{category}”",
          selectSubtype:
            "Alege „{subtype}” din categoria „{category}”",
          showingCategories:
            "Sunt afișate categoriile {start}–{end} din {total}",
        },
      },
      q2: {
        heading: "Cu cine călătorești?",
        subtitle: "Alege grupul și ajustează detaliile de mai jos.",
        groups: {
          solo: "Doar eu",
          couple: "Cuplu",
          family: "Familie",
          friends: "Prieteni",
          other: "Altă variantă",
        },
        groupDescriptions: {
          solo: "O singură persoană",
          couple: "Doi călători",
          family: "Adulți și copii",
          friends: "Călătorim împreună",
          other: "Grup personalizat",
        },
        yourGroup: "Grupul tău",
        yourSetup: "Configurația ta",
        adults: "Adulți",
        children: "Copii",
        pets: "Animale de companie",
        rooms: "Camere",
        suggestedBedrooms: "Dormitoare recomandate",
        beds: "Paturi",
        sleepingSetup: "Configurația paturilor",
        underEighteen: "Orice persoană sub 18 ani este considerată copil.",
        doubleBed: { one: "Pat dublu", other: "Paturi duble" },
        singleBed: {
          one: "Pat de o persoană",
          other: "Paturi de o persoană",
        },
      },
      q3: {
        heading: "Care este bugetul tău?",
        subtitle:
          "Include transportul, cazarea, mâncarea și activitățile pentru întreaga călătorie.",
        modes: {
          total: "Buget total pentru călătorie",
          perTraveller: "Buget per călător",
        },
        currency: "Monedă",
        amountPlaceholder: "12000",
        averagePerTraveller:
          "≈ {amount} {currency}, în medie per călător",
        estimatedTotal: "≈ {amount} {currency}, total estimat",
      },
      q4: {
        heading: "Unde ți-ar plăcea să te cazezi?",
        subtitle: "Alege toate tipurile de cazare care ți se potrivesc.",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Apartament",
          "Villa / Holiday home": "Vilă / Casă de vacanță",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "Fără preferințe",
        },
        groupNeeds: "Grupul tău are nevoie de aproximativ:",
        petFriendlyRequired:
          "Este necesară o cazare care acceptă animale de companie.",
      },
      q5: {
        heading: "Cum ai vrea să organizezi mesele?",
        subtitle: "Alege toate opțiunile care ți se potrivesc.",
        options: {
          "All inclusive": "All-inclusive",
          "Half board": "Demipensiune",
          "Breakfast included": "Mic dejun inclus",
          "Mostly eat at restaurants": "Mai ales la restaurant",
          "Self-catering / cook myself": "Cu bucătărie / gătesc eu",
          "No preference": "Fără preferințe",
        },
      },
      q6: {
        heading: "Când vrei să călătorești?",
        modes: {
          exact: "Știu datele exacte",
          rough: "Știu aproximativ când",
          flexible: "Sunt flexibil(ă)",
        },
        departureDate: "Data plecării",
        returnDate: "Data întoarcerii",
        month: "Lună",
        year: "An",
        selectMonth: "Selectează o lună",
        selectYear: "Selectează un an",
        returnDateError:
          "Data întoarcerii trebuie să fie ulterioară datei plecării.",
        flexibleHelper:
          "Nu trebuie să alegi date. Poți selecta durata preferată la pasul următor.",
        months: {
          January: "Ianuarie",
          February: "Februarie",
          March: "Martie",
          April: "Aprilie",
          May: "Mai",
          June: "Iunie",
          July: "Iulie",
          August: "August",
          September: "Septembrie",
          October: "Octombrie",
          November: "Noiembrie",
          December: "Decembrie",
        },
      },
      q7: {
        heading: "Cât timp ai vrea să stai?",
        options: {
          weekend: { label: "Weekend", description: "2–3 zile" },
          short: { label: "Călătorie scurtă", description: "4–5 zile" },
          week: {
            label: "Aproximativ o săptămână",
            description: "6–8 zile",
          },
          long: { label: "Vacanță lungă", description: "9–14 zile" },
          extended: { label: "Sejur prelungit", description: "15+ zile" },
        },
      },
      q8: {
        heading: "De unde pleci?",
        subtitle:
          "Vom folosi această informație mai târziu pentru a estima opțiuni și costuri de călătorie realiste.",
        modes: {
          currentLocation: "Folosește locația mea actuală",
          manual: "Introdu manual un oraș",
        },
        cityAndCountry: "Oraș și țară",
        manualPlaceholder: "Timișoara, România",
        requestingLocation: "Se solicită locația ta actuală…",
        currentLocationSelected: "Locația actuală a fost selectată",
        locationPermissionHelper:
          "Apasă opțiunea de localizare pentru a solicita permisiunea browserului.",
        errors: {
          unavailableInBrowser:
            "Localizarea nu este disponibilă în acest browser.",
          generic: "Nu am putut obține locația ta actuală.",
          permissionDenied:
            "Permisiunea de localizare a fost refuzată. Poți introduce un oraș.",
          unavailable:
            "Locația ta nu este disponibilă momentan. Încearcă din nou sau introdu un oraș.",
          timeout:
            "Solicitarea locației a expirat. Încearcă din nou sau introdu un oraș.",
        },
      },
      q9: {
        heading: "Cum ai vrea să ajungi acolo?",
        subtitle:
          "Alege toate mijloacele de transport pe care le-ai lua în considerare.",
        options: {
          Car: "Mașină",
          Plane: "Avion",
          Train: "Tren",
          Coach: "Autocar",
          Ferry: "Feribot",
        },
      },
      summary: {
        heading: "Preferințele de bază pentru călătoria ta",
        categories: {
          1: "Tipul călătoriei",
          2: "Călători",
          3: "Buget",
          4: "Cazare",
          5: "Mese",
          6: "Perioadă",
          7: "Durată",
          8: "Plecare",
          9: "Transport",
        },
        enteredAs: "Introdus ca {mode}",
        totalAmount: "{amount} {currency} în total",
        perTravellerAmount: "{amount} {currency} per călător",
        petFriendlyRequired:
          "Este necesară o cazare care acceptă animale de companie",
        dateRange: "{departure} – {return}",
        flexibleDates: "Date flexibile",
        calculatedFromExactDates: "calculată pe baza datelor exacte",
        currentLocation: "Locația actuală ({coordinates})",
        nextStepNote:
          "În continuare, TripMatch va folosi aceste preferințe pentru a evalua destinații și opțiuni de transport realiste.",
        continueToMatching: "Continuă către potrivirea destinațiilor",
      },
    },
  },
  es: {
    common: {
      languageSelectorLabel: "Seleccionar idioma",
      homeLabel: "Página de inicio de TripMatch",
      back: "Atrás",
      continue: "Continuar",
      question: "Pregunta {number}",
      setAutomatically: "Configurado automáticamente",
      decrease: "Reducir: {label}",
      increase: "Aumentar: {label}",
      notSelected: "Sin seleccionar",
      nouns: {
        traveller: { one: "viajero", other: "viajeros" },
        adult: { one: "adulto", other: "adultos" },
        child: { one: "niño", other: "niños" },
        pet: { one: "mascota", other: "mascotas" },
        room: { one: "habitación", other: "habitaciones" },
        bedroom: { one: "dormitorio", other: "dormitorios" },
        bed: { one: "cama", other: "camas" },
        night: { one: "noche", other: "noches" },
      },
    },
    landing: {
      brand: "TripMatch",
      tagline: [
        "No elijas un destino.",
        "Deja que el destino te elija a ti.",
      ],
      cta: "Encuentra mi destino",
      scenes: {
        beach: "Playa",
        mountains: "Montañas",
        city: "Ciudad",
        concert: "Conciertos",
      },
    },
    discover: {
      progress: {
        navigationLabel: "Progreso del cuestionario",
        questionOf: "Pregunta {current} de {total}",
        complete: "Cuestionario completado",
        allReached: "Se han visitado las {total} preguntas",
        reached: "{highest} de {total} preguntas visitadas",
        questionsReachedLabel: "Preguntas visitadas",
        tooltip: "{number} · {label}",
        derivedTooltip: "{number} · {label} — {duration}",
        currentQuestion: "Pregunta actual: {number}, {label}",
        goToQuestion: "Ir a la pregunta {number}: {label}",
        derivedDurationNavigation:
          "Pregunta 7: Duración, {duration}. Ve a la pregunta 6: Fechas para cambiarla.",
        notVisited: "Pregunta {number}: {label}, aún no visitada",
        labels: {
          1: "Viaje",
          2: "Viajeros",
          3: "Presupuesto",
          4: "Alojamiento",
          5: "Comidas",
          6: "Fechas",
          7: "Duración",
          8: "Origen",
          9: "Transporte",
        },
      },
      q1: {
        heading: "¿Qué tipo de viaje buscas?",
        subtitle: "Elige la experiencia que más te importa.",
        options: {
          Beach: "Playa",
          Mountains: "Montañas",
          City: "Ciudad",
          Nature: "Naturaleza",
          Culture: "Cultura",
          Entertainment: "Entretenimiento",
          "Concert / Event": "Concierto / Evento",
        },
        subtypePrompts: {
          Beach: "¿Qué tipo de playa prefieres?",
          Mountains: "¿Qué tipo de escapada de montaña buscas?",
          City: "¿Qué tipo de escapada urbana buscas?",
          Nature: "¿Cómo quieres disfrutar de la naturaleza?",
          Culture: "¿Qué aspecto de la cultura te interesa más?",
          Entertainment: "¿Qué tipo de entretenimiento buscas?",
          "Concert / Event": "¿Para asistir a qué tipo de evento viajarías?",
        },
        subtypes: {
          "beach-sandy": "Playa de arena",
          "beach-rocky": "Playa de guijarros / costa rocosa",
          "beach-coves": "Calas pintorescas",
          "beach-any": "Sin preferencia",
          "mountains-green": "Montañas verdes",
          "mountains-snowy": "Montañas nevadas",
          "mountains-alpine-lakes": "Lagos alpinos",
          "mountains-any": "Sin preferencia",
          "city-historic": "Casco histórico",
          "city-modern": "Ciudad moderna",
          "city-nightlife": "Ambiente animado / vida nocturna",
          "city-any": "Sin preferencia",
          "nature-camping": "Camping",
          "nature-camper": "Autocaravana / caravana",
          "nature-cabin": "Cabaña / refugio",
          "nature-hiking": "Senderismo y excursiones de un día",
          "nature-any": "Sin preferencia",
          "culture-art": "Museos de arte",
          "culture-history": "Museos de historia",
          "culture-architecture": "Arquitectura y monumentos",
          "culture-traditions": "Tradiciones locales",
          "culture-any": "Sin preferencia",
          "entertainment-theme-parks": "Parques temáticos y atracciones",
          "entertainment-nightlife": "Vida nocturna",
          "entertainment-shows": "Espectáculos y actuaciones",
          "entertainment-family": "Entretenimiento familiar",
          "entertainment-any": "Sin preferencia",
          "event-concert": "Concierto",
          "event-festival": "Festival de música",
          "event-sport": "Evento deportivo",
          "event-theatre": "Teatro / espectáculo en directo",
          "event-any": "Sin preferencia",
        },
        browser: {
          regionLabel: "Categorías de viaje",
          previousCategories: "Mostrar las categorías de viaje anteriores",
          nextCategories: "Mostrar las siguientes categorías de viaje",
          openCategory: "Abrir la categoría «{category}»",
          selectSubtype:
            "Elegir «{subtype}» en la categoría «{category}»",
          showingCategories:
            "Se muestran las categorías {start}–{end} de {total}",
        },
      },
      q2: {
        heading: "¿Con quién viajas?",
        subtitle: "Elige tu grupo y ajusta los detalles a continuación.",
        groups: {
          solo: "Solo/a",
          couple: "En pareja",
          family: "En familia",
          friends: "Con amigos",
          other: "Otro",
        },
        groupDescriptions: {
          solo: "Solo yo",
          couple: "Dos viajeros",
          family: "Adultos y niños",
          friends: "Viajar juntos",
          other: "Grupo personalizado",
        },
        yourGroup: "Tu grupo",
        yourSetup: "Tu configuración",
        adults: "Adultos",
        children: "Niños",
        pets: "Mascotas",
        rooms: "Habitaciones",
        suggestedBedrooms: "Dormitorios recomendados",
        beds: "Camas",
        sleepingSetup: "Distribución de camas",
        underEighteen: "Cualquier menor de 18 años cuenta como niño.",
        doubleBed: { one: "Cama doble", other: "Camas dobles" },
        singleBed: { one: "Cama individual", other: "Camas individuales" },
      },
      q3: {
        heading: "¿Cuál es tu presupuesto?",
        subtitle:
          "Incluye el transporte, el alojamiento, la comida y las actividades de todo el viaje.",
        modes: {
          total: "Presupuesto total del viaje",
          perTraveller: "Presupuesto por viajero",
        },
        currency: "Moneda",
        amountPlaceholder: "12000",
        averagePerTraveller:
          "≈ {amount} {currency} de media por viajero",
        estimatedTotal: "≈ {amount} {currency} en total (estimado)",
      },
      q4: {
        heading: "¿Dónde te gustaría alojarte?",
        subtitle: "Elige todos los tipos de alojamiento que te vengan bien.",
        options: {
          Hotel: "Hotel",
          Resort: "Complejo turístico",
          Apartment: "Apartamento",
          "Villa / Holiday home": "Villa / Casa de vacaciones",
          Hostel: "Albergue",
          Camping: "Camping",
          "No preference": "Sin preferencia",
        },
        groupNeeds: "Tu grupo necesita aproximadamente:",
        petFriendlyRequired: "Se necesita un alojamiento que admita mascotas.",
      },
      q5: {
        heading: "¿Cómo prefieres organizar las comidas?",
        subtitle: "Elige todas las opciones que te vengan bien.",
        options: {
          "All inclusive": "Todo incluido",
          "Half board": "Media pensión",
          "Breakfast included": "Desayuno incluido",
          "Mostly eat at restaurants": "Comer principalmente en restaurantes",
          "Self-catering / cook myself":
            "Alojamiento con cocina / cocinar por mi cuenta",
          "No preference": "Sin preferencia",
        },
      },
      q6: {
        heading: "¿Cuándo quieres viajar?",
        modes: {
          exact: "Sé las fechas exactas",
          rough: "Sé aproximadamente cuándo",
          flexible: "Soy flexible",
        },
        departureDate: "Fecha de salida",
        returnDate: "Fecha de regreso",
        month: "Mes",
        year: "Año",
        selectMonth: "Selecciona un mes",
        selectYear: "Selecciona un año",
        returnDateError:
          "La fecha de regreso debe ser posterior a la fecha de salida.",
        flexibleHelper:
          "No es necesario indicar fechas. Puedes elegir la duración que prefieras a continuación.",
        months: {
          January: "Enero",
          February: "Febrero",
          March: "Marzo",
          April: "Abril",
          May: "Mayo",
          June: "Junio",
          July: "Julio",
          August: "Agosto",
          September: "Septiembre",
          October: "Octubre",
          November: "Noviembre",
          December: "Diciembre",
        },
      },
      q7: {
        heading: "¿Cuánto tiempo te gustaría quedarte?",
        options: {
          weekend: { label: "Fin de semana", description: "2–3 días" },
          short: { label: "Viaje corto", description: "4–5 días" },
          week: {
            label: "Aproximadamente una semana",
            description: "6–8 días",
          },
          long: { label: "Vacaciones largas", description: "9–14 días" },
          extended: { label: "Estancia prolongada", description: "15+ días" },
        },
      },
      q8: {
        heading: "¿Desde dónde viajas?",
        subtitle:
          "Más adelante usaremos esta información para estimar opciones y costes de viaje realistas.",
        modes: {
          currentLocation: "Usar mi ubicación actual",
          manual: "Introducir una ciudad manualmente",
        },
        cityAndCountry: "Ciudad y país",
        manualPlaceholder: "Timișoara, Rumanía",
        requestingLocation: "Solicitando tu ubicación actual…",
        currentLocationSelected: "Ubicación actual seleccionada",
        locationPermissionHelper:
          "Pulsa la opción de ubicación para solicitar permiso al navegador.",
        errors: {
          unavailableInBrowser:
            "La ubicación no está disponible en este navegador.",
          generic: "No hemos podido obtener tu ubicación actual.",
          permissionDenied:
            "Se ha denegado el permiso de ubicación. Puedes introducir una ciudad.",
          unavailable:
            "Tu ubicación no está disponible en este momento. Inténtalo de nuevo o introduce una ciudad.",
          timeout:
            "Se agotó el tiempo de espera de la solicitud de ubicación. Inténtalo de nuevo o introduce una ciudad.",
        },
      },
      q9: {
        heading: "¿Cómo quieres llegar hasta allí?",
        subtitle: "Elige todos los medios de transporte que considerarías.",
        options: {
          Car: "Coche",
          Plane: "Avión",
          Train: "Tren",
          Coach: "Autocar",
          Ferry: "Ferry",
        },
      },
      summary: {
        heading: "Tus preferencias básicas de viaje",
        categories: {
          1: "Tipo de viaje",
          2: "Viajeros",
          3: "Presupuesto",
          4: "Alojamiento",
          5: "Comidas",
          6: "Fechas",
          7: "Duración",
          8: "Origen",
          9: "Transporte",
        },
        enteredAs: "Introducido como {mode}",
        totalAmount: "{amount} {currency} en total",
        perTravellerAmount: "{amount} {currency} por viajero",
        petFriendlyRequired: "Se necesita un alojamiento que admita mascotas",
        dateRange: "{departure} – {return}",
        flexibleDates: "Fechas flexibles",
        calculatedFromExactDates: "calculada a partir de las fechas exactas",
        currentLocation: "Ubicación actual ({coordinates})",
        nextStepNote:
          "A continuación, TripMatch usará estas preferencias para evaluar destinos y opciones de transporte realistas.",
        continueToMatching: "Continuar con la búsqueda de destinos",
      },
    },
  },
  de: {
    common: {
      languageSelectorLabel: "Sprache auswählen",
      homeLabel: "TripMatch-Startseite",
      back: "Zurück",
      continue: "Weiter",
      question: "Frage {number}",
      setAutomatically: "Automatisch festgelegt",
      decrease: "Weniger: {label}",
      increase: "Mehr: {label}",
      notSelected: "Nicht ausgewählt",
      nouns: {
        traveller: { one: "Reisender", other: "Reisende" },
        adult: { one: "Erwachsener", other: "Erwachsene" },
        child: { one: "Kind", other: "Kinder" },
        pet: { one: "Haustier", other: "Haustiere" },
        room: { one: "Zimmer", other: "Zimmer" },
        bedroom: { one: "Schlafzimmer", other: "Schlafzimmer" },
        bed: { one: "Bett", other: "Betten" },
        night: { one: "Nacht", other: "Nächte" },
      },
    },
    landing: {
      brand: "TripMatch",
      tagline: [
        "Wähle kein Reiseziel.",
        "Lass das Reiseziel dich wählen.",
      ],
      cta: "Finde mein Reiseziel",
      scenes: {
        beach: "Strand",
        mountains: "Berge",
        city: "Stadt",
        concert: "Konzerte",
      },
    },
    discover: {
      progress: {
        navigationLabel: "Fortschritt des Fragebogens",
        questionOf: "Frage {current} von {total}",
        complete: "Fragebogen abgeschlossen",
        allReached: "Alle {total} Fragen erreicht",
        reached: "{highest} von {total} Fragen erreicht",
        questionsReachedLabel: "Erreichte Fragen",
        tooltip: "{number} · {label}",
        derivedTooltip: "{number} · {label} — {duration}",
        currentQuestion: "Aktuelle Frage: {number}, {label}",
        goToQuestion: "Zu Frage {number}: {label}",
        derivedDurationNavigation:
          "Frage 7: Dauer, {duration}. Gehe zu Frage 6: Reisezeit, um sie zu ändern.",
        notVisited: "Frage {number}: {label}, noch nicht besucht",
        labels: {
          1: "Reise",
          2: "Reisende",
          3: "Budget",
          4: "Unterkunft",
          5: "Verpflegung",
          6: "Reisezeit",
          7: "Dauer",
          8: "Start",
          9: "Transport",
        },
      },
      q1: {
        heading: "Welche Art von Reise suchst du?",
        subtitle: "Wähle das Erlebnis, das dir am wichtigsten ist.",
        options: {
          Beach: "Strand",
          Mountains: "Berge",
          City: "Stadt",
          Nature: "Natur",
          Culture: "Kultur",
          Entertainment: "Unterhaltung",
          "Concert / Event": "Konzert / Event",
        },
        subtypePrompts: {
          Beach: "Welche Art von Strand gefällt dir?",
          Mountains: "Welche Art von Auszeit in den Bergen suchst du?",
          City: "Welche Art von Städtereise suchst du?",
          Nature: "Wie möchtest du die Natur erleben?",
          Culture: "Welche Art von Kultur interessiert dich am meisten?",
          Entertainment: "Welche Art von Unterhaltung suchst du?",
          "Concert / Event": "Für welche Art von Veranstaltung reist du?",
        },
        subtypes: {
          "beach-sandy": "Sandstrand",
          "beach-rocky": "Kiesstrand / Felsküste",
          "beach-coves": "Malerische Buchten",
          "beach-any": "Keine Präferenz",
          "mountains-green": "Grüne Berge",
          "mountains-snowy": "Verschneite Berge",
          "mountains-alpine-lakes": "Alpenseen",
          "mountains-any": "Keine Präferenz",
          "city-historic": "Historische Altstadt",
          "city-modern": "Moderne Stadt",
          "city-nightlife": "Lebendige Stadt / Nachtleben",
          "city-any": "Keine Präferenz",
          "nature-camping": "Camping",
          "nature-camper": "Wohnmobil / Wohnwagen",
          "nature-cabin": "Hütte / Lodge",
          "nature-hiking": "Wandern & Tagesausflüge",
          "nature-any": "Keine Präferenz",
          "culture-art": "Kunstmuseen",
          "culture-history": "Geschichtsmuseen",
          "culture-architecture": "Architektur & Denkmäler",
          "culture-traditions": "Lokale Traditionen",
          "culture-any": "Keine Präferenz",
          "entertainment-theme-parks": "Freizeitparks & Attraktionen",
          "entertainment-nightlife": "Nachtleben",
          "entertainment-shows": "Shows & Aufführungen",
          "entertainment-family": "Unterhaltung für Familien",
          "entertainment-any": "Keine Präferenz",
          "event-concert": "Konzert",
          "event-festival": "Musikfestival",
          "event-sport": "Sportveranstaltung",
          "event-theatre": "Theater / Live-Show",
          "event-any": "Keine Präferenz",
        },
        browser: {
          regionLabel: "Reisekategorien",
          previousCategories: "Vorherige Reisekategorien anzeigen",
          nextCategories: "Nächste Reisekategorien anzeigen",
          openCategory: "Kategorie „{category}“ öffnen",
          selectSubtype:
            "„{subtype}“ in der Kategorie „{category}“ auswählen",
          showingCategories:
            "Kategorien {start}–{end} von {total} werden angezeigt",
        },
      },
      q2: {
        heading: "Mit wem reist du?",
        subtitle: "Wähle deine Reisegruppe und passe unten die Details an.",
        groups: {
          solo: "Allein",
          couple: "Paar",
          family: "Familie",
          friends: "Freunde",
          other: "Andere",
        },
        groupDescriptions: {
          solo: "Nur ich",
          couple: "Zwei Reisende",
          family: "Erwachsene & Kinder",
          friends: "Gemeinsam unterwegs",
          other: "Individuelle Gruppe",
        },
        yourGroup: "Deine Reisegruppe",
        yourSetup: "Deine Aufteilung",
        adults: "Erwachsene",
        children: "Kinder",
        pets: "Haustiere",
        rooms: "Zimmer",
        suggestedBedrooms: "Empfohlene Schlafzimmer",
        beds: "Betten",
        sleepingSetup: "Bettenaufteilung",
        underEighteen: "Alle unter 18 Jahren zählen als Kinder.",
        doubleBed: { one: "Doppelbett", other: "Doppelbetten" },
        singleBed: { one: "Einzelbett", other: "Einzelbetten" },
      },
      q3: {
        heading: "Wie hoch ist dein Budget?",
        subtitle:
          "Berücksichtige Transport, Unterkunft, Verpflegung und Aktivitäten für die gesamte Reise.",
        modes: {
          total: "Gesamtbudget für die Reise",
          perTraveller: "Budget pro Person",
        },
        currency: "Währung",
        amountPlaceholder: "12000",
        averagePerTraveller:
          "≈ {amount} {currency} durchschnittlich pro Person",
        estimatedTotal: "≈ {amount} {currency} geschätzte Gesamtsumme",
      },
      q4: {
        heading: "Wo würdest du gerne übernachten?",
        subtitle: "Wähle alle Unterkunftsarten, die für dich infrage kommen.",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Ferienwohnung",
          "Villa / Holiday home": "Villa / Ferienhaus",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "Keine Präferenz",
        },
        groupNeeds: "Deine Gruppe benötigt ungefähr:",
        petFriendlyRequired:
          "Eine haustierfreundliche Unterkunft ist erforderlich.",
      },
      q5: {
        heading: "Wie möchtest du dich während der Reise verpflegen?",
        subtitle: "Wähle alle Optionen, die für dich infrage kommen.",
        options: {
          "All inclusive": "All-inclusive",
          "Half board": "Halbpension",
          "Breakfast included": "Frühstück inklusive",
          "Mostly eat at restaurants": "Überwiegend im Restaurant essen",
          "Self-catering / cook myself": "Selbstversorgung / selbst kochen",
          "No preference": "Keine Präferenz",
        },
      },
      q6: {
        heading: "Wann möchtest du reisen?",
        modes: {
          exact: "Ich kenne meine genauen Reisedaten",
          rough: "Ich weiß ungefähr, wann",
          flexible: "Ich bin flexibel",
        },
        departureDate: "Abreisedatum",
        returnDate: "Rückreisedatum",
        month: "Monat",
        year: "Jahr",
        selectMonth: "Monat auswählen",
        selectYear: "Jahr auswählen",
        returnDateError:
          "Das Rückreisedatum muss nach dem Abreisedatum liegen.",
        flexibleHelper:
          "Du musst keine Reisedaten angeben. Als Nächstes kannst du deine bevorzugte Dauer auswählen.",
        months: {
          January: "Januar",
          February: "Februar",
          March: "März",
          April: "April",
          May: "Mai",
          June: "Juni",
          July: "Juli",
          August: "August",
          September: "September",
          October: "Oktober",
          November: "November",
          December: "Dezember",
        },
      },
      q7: {
        heading: "Wie lange möchtest du bleiben?",
        options: {
          weekend: { label: "Wochenende", description: "2–3 Tage" },
          short: { label: "Kurztrip", description: "4–5 Tage" },
          week: { label: "Etwa eine Woche", description: "6–8 Tage" },
          long: { label: "Längerer Urlaub", description: "9–14 Tage" },
          extended: {
            label: "Längerer Aufenthalt",
            description: "15+ Tage",
          },
        },
      },
      q8: {
        heading: "Wo startest du deine Reise?",
        subtitle:
          "Diese Angabe verwenden wir später, um realistische Reiseoptionen und Kosten zu schätzen.",
        modes: {
          currentLocation: "Meinen aktuellen Standort verwenden",
          manual: "Stadt manuell eingeben",
        },
        cityAndCountry: "Stadt und Land",
        manualPlaceholder: "Timișoara, Rumänien",
        requestingLocation: "Dein aktueller Standort wird ermittelt…",
        currentLocationSelected: "Aktueller Standort ausgewählt",
        locationPermissionHelper:
          "Klicke auf die Standortoption, um die Browserberechtigung anzufordern.",
        errors: {
          unavailableInBrowser:
            "Die Standortbestimmung ist in diesem Browser nicht verfügbar.",
          generic: "Dein aktueller Standort konnte nicht ermittelt werden.",
          permissionDenied:
            "Die Standortberechtigung wurde verweigert. Du kannst stattdessen eine Stadt eingeben.",
          unavailable:
            "Dein Standort ist derzeit nicht verfügbar. Versuche es erneut oder gib eine Stadt ein.",
          timeout:
            "Die Standortanfrage hat zu lange gedauert. Versuche es erneut oder gib eine Stadt ein.",
        },
      },
      q9: {
        heading: "Wie möchtest du dorthin reisen?",
        subtitle: "Wähle alle Verkehrsmittel, die für dich infrage kommen.",
        options: {
          Car: "Auto",
          Plane: "Flugzeug",
          Train: "Zug",
          Coach: "Fernbus",
          Ferry: "Fähre",
        },
      },
      summary: {
        heading: "Deine grundlegenden Reisepräferenzen",
        categories: {
          1: "Reiseart",
          2: "Reisende",
          3: "Budget",
          4: "Unterkunft",
          5: "Verpflegung",
          6: "Reisezeit",
          7: "Dauer",
          8: "Abreiseort",
          9: "Transport",
        },
        enteredAs: "Eingabe als {mode}",
        totalAmount: "{amount} {currency} insgesamt",
        perTravellerAmount: "{amount} {currency} pro Person",
        petFriendlyRequired:
          "Eine haustierfreundliche Unterkunft ist erforderlich",
        dateRange: "{departure} – {return}",
        flexibleDates: "Flexible Reisedaten",
        calculatedFromExactDates: "aus den genauen Reisedaten berechnet",
        currentLocation: "Aktueller Standort ({coordinates})",
        nextStepNote:
          "Als Nächstes nutzt TripMatch diese Präferenzen, um realistische Reiseziele und Transportmöglichkeiten zu bewerten.",
        continueToMatching: "Weiter zur Reisezielauswahl",
      },
    },
  },
  fr: {
    common: {
      languageSelectorLabel: "Choisir la langue",
      homeLabel: "Accueil TripMatch",
      back: "Retour",
      continue: "Continuer",
      question: "Question {number}",
      setAutomatically: "Défini automatiquement",
      decrease: "Diminuer : {label}",
      increase: "Augmenter : {label}",
      notSelected: "Non sélectionné",
      nouns: {
        traveller: { one: "voyageur", other: "voyageurs" },
        adult: { one: "adulte", other: "adultes" },
        child: { one: "enfant", other: "enfants" },
        pet: {
          one: "animal de compagnie",
          other: "animaux de compagnie",
        },
        room: { one: "chambre", other: "chambres" },
        bedroom: { one: "chambre", other: "chambres" },
        bed: { one: "lit", other: "lits" },
        night: { one: "nuit", other: "nuits" },
      },
    },
    landing: {
      brand: "TripMatch",
      tagline: [
        "Ne choisissez pas une destination.",
        "Laissez la destination vous choisir.",
      ],
      cta: "Trouve ma destination",
      scenes: {
        beach: "Plage",
        mountains: "Montagnes",
        city: "Ville",
        concert: "Concerts",
      },
    },
    discover: {
      progress: {
        navigationLabel: "Progression du questionnaire",
        questionOf: "Question {current} sur {total}",
        complete: "Questionnaire terminé",
        allReached: "Les {total} questions ont été consultées",
        reached: "{highest} questions sur {total} consultées",
        questionsReachedLabel: "Questions consultées",
        tooltip: "{number} · {label}",
        derivedTooltip: "{number} · {label} — {duration}",
        currentQuestion: "Question actuelle : {number}, {label}",
        goToQuestion: "Aller à la question {number} : {label}",
        derivedDurationNavigation:
          "Question 7 : Durée, {duration}. Allez à la question 6 : Dates pour la modifier.",
        notVisited: "Question {number} : {label}, pas encore consultée",
        labels: {
          1: "Voyage",
          2: "Voyageurs",
          3: "Budget",
          4: "Hébergement",
          5: "Repas",
          6: "Dates",
          7: "Durée",
          8: "Départ",
          9: "Transport",
        },
      },
      q1: {
        heading: "Quel type de voyage recherchez-vous ?",
        subtitle: "Choisissez l’expérience qui compte le plus pour vous.",
        options: {
          Beach: "Plage",
          Mountains: "Montagnes",
          City: "Ville",
          Nature: "Nature",
          Culture: "Culture",
          Entertainment: "Divertissement",
          "Concert / Event": "Concert / Événement",
        },
        subtypePrompts: {
          Beach: "Quel type de plage préférez-vous ?",
          Mountains:
            "Quel type d’escapade à la montagne recherchez-vous ?",
          City: "Quel type d’escapade urbaine recherchez-vous ?",
          Nature: "Comment souhaitez-vous profiter de la nature ?",
          Culture: "Quel aspect de la culture vous intéresse le plus ?",
          Entertainment: "Quel type de divertissement recherchez-vous ?",
          "Concert / Event": "Pour quel type d’événement voyagez-vous ?",
        },
        subtypes: {
          "beach-sandy": "Plage de sable",
          "beach-rocky": "Plage de galets / côte rocheuse",
          "beach-coves": "Criques pittoresques",
          "beach-any": "Aucune préférence",
          "mountains-green": "Montagnes verdoyantes",
          "mountains-snowy": "Montagnes enneigées",
          "mountains-alpine-lakes": "Lacs alpins",
          "mountains-any": "Aucune préférence",
          "city-historic": "Centre historique",
          "city-modern": "Ville moderne",
          "city-nightlife": "Ville animée / vie nocturne",
          "city-any": "Aucune préférence",
          "nature-camping": "Camping",
          "nature-camper": "Camping-car / caravane",
          "nature-cabin": "Cabane / refuge",
          "nature-hiking": "Randonnée et excursions à la journée",
          "nature-any": "Aucune préférence",
          "culture-art": "Musées d’art",
          "culture-history": "Musées d’histoire",
          "culture-architecture": "Architecture et monuments",
          "culture-traditions": "Traditions locales",
          "culture-any": "Aucune préférence",
          "entertainment-theme-parks": "Parcs à thème et attractions",
          "entertainment-nightlife": "Vie nocturne",
          "entertainment-shows": "Spectacles et représentations",
          "entertainment-family": "Divertissements en famille",
          "entertainment-any": "Aucune préférence",
          "event-concert": "Concert",
          "event-festival": "Festival de musique",
          "event-sport": "Événement sportif",
          "event-theatre": "Théâtre / spectacle en direct",
          "event-any": "Aucune préférence",
        },
        browser: {
          regionLabel: "Catégories de voyage",
          previousCategories:
            "Afficher les catégories de voyage précédentes",
          nextCategories:
            "Afficher les catégories de voyage suivantes",
          openCategory: "Ouvrir la catégorie « {category} »",
          selectSubtype:
            "Choisir « {subtype} » dans la catégorie « {category} »",
          showingCategories:
            "Affichage des catégories {start} à {end} sur {total}",
        },
      },
      q2: {
        heading: "Avec qui voyagez-vous ?",
        subtitle:
          "Choisissez votre groupe, puis ajustez les détails ci-dessous.",
        groups: {
          solo: "En solo",
          couple: "En couple",
          family: "En famille",
          friends: "Entre amis",
          other: "Autre",
        },
        groupDescriptions: {
          solo: "Une personne",
          couple: "Deux voyageurs",
          family: "Adultes et enfants",
          friends: "Voyager ensemble",
          other: "Groupe personnalisé",
        },
        yourGroup: "Votre groupe",
        yourSetup: "Votre configuration",
        adults: "Adultes",
        children: "Enfants",
        pets: "Animaux de compagnie",
        rooms: "Chambres",
        suggestedBedrooms: "Chambres recommandées",
        beds: "Lits",
        sleepingSetup: "Configuration des couchages",
        underEighteen:
          "Toute personne de moins de 18 ans compte comme un enfant.",
        doubleBed: { one: "Lit double", other: "Lits doubles" },
        singleBed: { one: "Lit simple", other: "Lits simples" },
      },
      q3: {
        heading: "Quel est votre budget ?",
        subtitle:
          "Incluez le transport, l’hébergement, les repas et les activités pour l’ensemble du voyage.",
        modes: {
          total: "Budget total du voyage",
          perTraveller: "Budget par voyageur",
        },
        currency: "Devise",
        amountPlaceholder: "12000",
        averagePerTraveller:
          "≈ {amount} {currency} en moyenne par voyageur",
        estimatedTotal: "≈ {amount} {currency} au total (estimation)",
      },
      q4: {
        heading: "Où souhaiteriez-vous séjourner ?",
        subtitle:
          "Choisissez tous les types d’hébergement qui vous conviennent.",
        options: {
          Hotel: "Hôtel",
          Resort: "Complexe hôtelier",
          Apartment: "Appartement",
          "Villa / Holiday home": "Villa / Maison de vacances",
          Hostel: "Auberge de jeunesse",
          Camping: "Camping",
          "No preference": "Aucune préférence",
        },
        groupNeeds: "Votre groupe a besoin d’environ :",
        petFriendlyRequired:
          "Un hébergement acceptant les animaux sera nécessaire.",
      },
      q5: {
        heading: "Comment souhaitez-vous organiser vos repas ?",
        subtitle: "Choisissez toutes les options qui vous conviennent.",
        options: {
          "All inclusive": "Tout compris",
          "Half board": "Demi-pension",
          "Breakfast included": "Petit-déjeuner inclus",
          "Mostly eat at restaurants":
            "Manger principalement au restaurant",
          "Self-catering / cook myself":
            "Hébergement avec cuisine / cuisiner moi-même",
          "No preference": "Aucune préférence",
        },
      },
      q6: {
        heading: "Quand souhaitez-vous voyager ?",
        modes: {
          exact: "Je connais mes dates exactes",
          rough: "Je sais approximativement quand",
          flexible: "Je suis flexible",
        },
        departureDate: "Date de départ",
        returnDate: "Date de retour",
        month: "Mois",
        year: "Année",
        selectMonth: "Sélectionnez un mois",
        selectYear: "Sélectionnez une année",
        returnDateError:
          "La date de retour doit être postérieure à la date de départ.",
        flexibleHelper:
          "Aucune date n’est requise. Vous pourrez choisir la durée souhaitée à l’étape suivante.",
        months: {
          January: "Janvier",
          February: "Février",
          March: "Mars",
          April: "Avril",
          May: "Mai",
          June: "Juin",
          July: "Juillet",
          August: "Août",
          September: "Septembre",
          October: "Octobre",
          November: "Novembre",
          December: "Décembre",
        },
      },
      q7: {
        heading: "Combien de temps souhaitez-vous rester ?",
        options: {
          weekend: { label: "Week-end", description: "2–3 jours" },
          short: { label: "Court séjour", description: "4–5 jours" },
          week: {
            label: "Environ une semaine",
            description: "6–8 jours",
          },
          long: { label: "Longues vacances", description: "9–14 jours" },
          extended: { label: "Séjour prolongé", description: "15+ jours" },
        },
      },
      q8: {
        heading: "D’où partez-vous ?",
        subtitle:
          "Nous utiliserons cette information plus tard pour estimer des options de voyage et des coûts réalistes.",
        modes: {
          currentLocation: "Utiliser ma position actuelle",
          manual: "Saisir une ville manuellement",
        },
        cityAndCountry: "Ville et pays",
        manualPlaceholder: "Timișoara, Roumanie",
        requestingLocation: "Recherche de votre position actuelle…",
        currentLocationSelected: "Position actuelle sélectionnée",
        locationPermissionHelper:
          "Cliquez sur l’option de localisation pour autoriser l’accès dans votre navigateur.",
        errors: {
          unavailableInBrowser:
            "La géolocalisation n’est pas disponible dans ce navigateur.",
          generic: "Nous n’avons pas pu obtenir votre position actuelle.",
          permissionDenied:
            "L’accès à votre position a été refusé. Vous pouvez saisir une ville à la place.",
          unavailable:
            "Votre position est actuellement indisponible. Réessayez ou saisissez une ville.",
          timeout:
            "La demande de localisation a expiré. Réessayez ou saisissez une ville.",
        },
      },
      q9: {
        heading: "Comment souhaitez-vous vous y rendre ?",
        subtitle:
          "Choisissez tous les moyens de transport que vous envisageriez.",
        options: {
          Car: "Voiture",
          Plane: "Avion",
          Train: "Train",
          Coach: "Autocar",
          Ferry: "Ferry",
        },
      },
      summary: {
        heading: "Vos préférences de voyage essentielles",
        categories: {
          1: "Type de voyage",
          2: "Voyageurs",
          3: "Budget",
          4: "Hébergement",
          5: "Repas",
          6: "Dates",
          7: "Durée",
          8: "Départ",
          9: "Transport",
        },
        enteredAs: "Saisi comme {mode}",
        totalAmount: "{amount} {currency} au total",
        perTravellerAmount: "{amount} {currency} par voyageur",
        petFriendlyRequired:
          "Un hébergement acceptant les animaux est nécessaire",
        dateRange: "{departure} – {return}",
        flexibleDates: "Dates flexibles",
        calculatedFromExactDates: "calculée à partir des dates exactes",
        currentLocation: "Position actuelle ({coordinates})",
        nextStepNote:
          "Ensuite, TripMatch utilisera ces préférences pour évaluer des destinations et des options de transport réalistes.",
        continueToMatching: "Continuer vers la sélection des destinations",
      },
    },
  },
} satisfies Record<LanguageCode, Translation>;
