import type {
  AccommodationType,
  BudgetMode,
  DateFlexibilityDays,
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
import type {
  CountryCode,
  DestinationId,
  DestinationTag,
  MatchReasonCode,
} from "@/types/destination";

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
  switchToLightTheme: string;
  switchToDarkTheme: string;
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
  budgetType: string;
  yourBudget: string;
  modes: Record<BudgetMode, string>;
  currency: string;
  amountPlaceholder: string;
  averagePerTraveller: string;
  estimatedTotal: string;
};

type QuestionFourTranslation = {
  heading: string;
  subtitle: string;
  selectionHint: string;
  requirementsLabel: string;
  stayOptions: string;
  orLabel: string;
  options: Record<AccommodationType, string>;
  optionDescriptions: Record<AccommodationType, string>;
  groupNeeds: string;
  petFriendlyRequired: string;
};

type QuestionFiveTranslation = {
  heading: string;
  subtitle: string;
  mealStyle: string;
  selectionHint: string;
  orLabel: string;
  options: Record<MealPreference, string>;
  optionDescriptions: Record<MealPreference, string>;
};

type QuestionSixTranslation = {
  heading: string;
  travelTiming: string;
  modes: Record<TimingMode, string>;
  modeTitles: Record<TimingMode, string>;
  modeDescriptions: Record<TimingMode, string>;
  yourDates: string;
  departureDate: string;
  returnDate: string;
  dateFlexibility: string;
  dateFlexibilityHelper: string;
  dateFlexibilityOptions: Record<DateFlexibilityDays, string>;
  flexibilitySummary: {
    fixed: string;
    one: string;
    other: string;
  };
  roughTiming: string;
  month: string;
  year: string;
  selectMonth: string;
  selectYear: string;
  returnDateError: string;
  flexibleDates: string;
  flexibleTitle: string;
  flexibleHelper: string;
  months: Record<TravelMonth, string>;
};

type DurationOptionTranslation = {
  label: string;
  description: string;
};

type QuestionSevenTranslation = {
  heading: string;
  subtitle: string;
  stayLength: string;
  daysLabel: string;
  options: Record<DurationPreference, DurationOptionTranslation>;
};

type QuestionEightTranslation = {
  heading: string;
  subtitle: string;
  startingPoint: string;
  modes: Record<OriginMode, { label: string; description: string }>;
  current: {
    locatingLabel: string;
    locating: string;
    selectedLabel: string;
    resolvedStatus: string;
    approximate: string;
    permissionHelper: string;
    retry: string;
    chooseManual: string;
  };
  manual: {
    heading: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchHint: string;
    queryTooShort: string;
    searching: string;
    resultsLabel: string;
    noResults: string;
    selectedLabel: string;
    mapHelper: string;
    resolving: string;
    mapLoading: string;
  };
  errors: {
    unavailableInBrowser: string;
    generic: string;
    permissionDenied: string;
    unavailable: string;
    timeout: string;
    reverseGeocode: string;
    search: string;
    map: string;
  };
  accessibility: {
    retryCurrent: string;
    chooseManual: string;
    selectSuggestion: string;
    map: string;
    centerPin: string;
  };
};

type QuestionNineTranslation = {
  heading: string;
  subtitle: string;
  startingFrom: string;
  sectionLabel: string;
  sectionHelper: string;
  openToAnything: string;
  options: Record<TransportMode, string>;
  descriptions: Record<TransportMode, string>;
  accessibility: {
    selectAll: string;
    clearAll: string;
  };
};

type ResultsTranslation = {
  heading: string;
  subtitle: string;
  resultCount: NounForms;
  alternativeCount: NounForms;
  noExactMatches: string;
  recommendedDestinations: string;
  filters: {
    title: string;
    regionLabel: string;
    editPreferences: string;
    showAll: string;
    hide: string;
    from: string;
    totalBudget: string;
    perTravellerBudget: string;
    more: string;
    categories: Record<QuestionNumber, string>;
  };
  edit: {
    backToResults: string;
    updateResults: string;
  };
  sort: {
    label: string;
    bestMatch: string;
    closest: string;
  };
  card: {
    match: string;
    distance: string;
    distanceAccessible: string;
    why: string;
    viewTrip: string;
    hideTrip: string;
    detailPrototype: string;
  };
  prototypeNote: string;
  reasons: Record<MatchReasonCode, string>;
  destinations: Record<
    DestinationId,
    {
      city: string;
      description: string;
    }
  >;
  countries: Record<CountryCode, string>;
  tags: Record<DestinationTag, string>;
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
    results: ResultsTranslation;
  };
};

export const translations = {
  en: {
    common: {
      languageSelectorLabel: "Select language",
      homeLabel: "TripMatch home",
      switchToLightTheme: "Switch to light theme",
      switchToDarkTheme: "Switch to dark theme",
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
        derivedTooltip:
          "{number} · {label} — {duration}, calculated automatically",
        currentQuestion: "Current question: {number}, {label}",
        goToQuestion: "Go to Question {number}: {label}",
        derivedDurationNavigation:
          "Question 7: Duration, {duration}, calculated automatically. Go to Question 6: When to change it.",
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
        budgetType: "Budget type",
        yourBudget: "Your budget",
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
        selectionHint: "Choose all that apply.",
        requirementsLabel: "Based on your group",
        stayOptions: "Stay options",
        orLabel: "or",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Apartment",
          "Villa / Holiday home": "Villa / Holiday home",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "No preference",
        },
        optionDescriptions: {
          Hotel: "Classic & convenient",
          Resort: "Amenities & relaxation",
          Apartment: "Flexible & spacious",
          "Villa / Holiday home": "Private stay",
          Hostel: "Social & budget-friendly",
          Camping: "Outdoor experience",
          "No preference": "I'm open to any type of stay",
        },
        groupNeeds: "Your group needs approximately:",
        petFriendlyRequired:
          "Pet-friendly accommodation will be required.",
      },
      q5: {
        heading: "How would you like to handle meals?",
        subtitle: "Choose all options that would work for you.",
        mealStyle: "Meal style",
        selectionHint: "Choose all that apply.",
        orLabel: "or",
        options: {
          "All inclusive": "All inclusive",
          "Half board": "Half board",
          "Breakfast included": "Breakfast included",
          "Mostly eat at restaurants": "Mostly eat at restaurants",
          "Self-catering / cook myself": "Self-catering / cook myself",
          "No preference": "No preference",
        },
        optionDescriptions: {
          "All inclusive": "Everything taken care of",
          "Half board": "Breakfast + one main meal",
          "Breakfast included": "Start the day covered",
          "Mostly eat at restaurants": "Explore local food",
          "Self-catering / cook myself": "Flexible & independent",
          "No preference": "I'm flexible about meals",
        },
      },
      q6: {
        heading: "When do you want to travel?",
        travelTiming: "Travel timing",
        modes: {
          exact: "I know my exact dates",
          rough: "I know roughly when",
          flexible: "I'm flexible",
        },
        modeTitles: {
          exact: "Exact dates",
          rough: "Roughly when",
          flexible: "Flexible",
        },
        modeDescriptions: {
          exact: "I already know when",
          rough: "I know the month",
          flexible: "Dates can move",
        },
        yourDates: "Your dates",
        departureDate: "Departure date",
        returnDate: "Return date",
        dateFlexibility: "Date flexibility",
        dateFlexibilityHelper: "Can your whole trip shift a little?",
        dateFlexibilityOptions: {
          0: "Exact dates",
          1: "±1 day",
          2: "±2 days",
          3: "±3 days",
          7: "±7 days",
        },
        flexibilitySummary: {
          fixed: "{nights} · Fixed dates",
          one: "{nights} · Can shift up to {days} day earlier or later",
          other: "{nights} · Can shift up to {days} days earlier or later",
        },
        roughTiming: "Rough timing",
        month: "Month",
        year: "Year",
        selectMonth: "Select a month",
        selectYear: "Select a year",
        returnDateError: "Return date must be later than departure date.",
        flexibleDates: "Flexible dates",
        flexibleTitle: "Your dates are open",
        flexibleHelper:
          "We'll use your preferred trip duration to find options that fit.",
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
        subtitle: "Choose the trip length that feels right.",
        stayLength: "Stay length",
        daysLabel: "days",
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
        startingPoint: "Starting point",
        modes: {
          currentLocation: {
            label: "Current location",
            description: "Use this device",
          },
          manual: {
            label: "Choose manually",
            description: "Search or place a pin",
          },
        },
        current: {
          locatingLabel: "Locating you",
          locating: "Finding your approximate starting point…",
          selectedLabel: "Current location",
          resolvedStatus: "Current location found.",
          approximate: "Approximate location",
          permissionHelper:
            "Your browser will ask for permission to use this device’s location.",
          retry: "Try again",
          chooseManual: "Choose manually instead",
        },
        manual: {
          heading: "Choose your starting point",
          searchLabel: "Search for a location",
          searchPlaceholder: "Search city, area or place",
          searchHint: "Enter at least 3 characters.",
          queryTooShort: "Type at least 3 characters to search.",
          searching: "Searching locations…",
          resultsLabel: "Location suggestions",
          noResults: "No matching locations found.",
          selectedLabel: "Selected location",
          mapHelper: "Drag the map to fine-tune your starting point.",
          resolving: "Updating the selected location…",
          mapLoading: "Loading map…",
        },
        errors: {
          unavailableInBrowser: "Location is unavailable in this browser.",
          generic: "We could not get your current location.",
          permissionDenied:
            "Location permission was denied. You can choose a location manually instead.",
          unavailable:
            "Your location is currently unavailable. Try again or choose manually.",
          timeout:
            "The location request timed out. Try again or choose manually.",
          reverseGeocode:
            "We found the coordinates but could not identify the location. Try again or choose manually.",
          search:
            "We couldn't search for locations right now. Please try again.",
          map:
            "The map could not be loaded. You can still choose a location from the search results.",
        },
        accessibility: {
          retryCurrent: "Try current location again",
          chooseManual: "Choose a location manually",
          selectSuggestion: "Select {location}",
          map: "Interactive map for fine-tuning your starting point",
          centerPin: "Selected point at the center of the map",
        },
      },
      q9: {
        heading: "How would you like to get there?",
        subtitle:
          "Choose every way you'd be happy to travel. We'll use this to find realistic destinations from your starting point.",
        startingFrom: "Starting from",
        sectionLabel: "Travel options",
        sectionHelper: "Select all that work for you",
        openToAnything: "I'm open to anything",
        options: {
          Car: "Car",
          Plane: "Plane",
          Train: "Train",
          Coach: "Coach",
          Ferry: "Ferry",
        },
        descriptions: {
          Car: "Freedom to stop along the way",
          Plane: "Best for longer distances",
          Train: "Comfortable city-to-city travel",
          Coach: "Budget-friendly overland travel",
          Ferry: "Great for islands and sea crossings",
        },
        accessibility: {
          selectAll: "Select all travel options",
          clearAll: "Clear all travel options",
        },
      },
      results: {
        heading: "Destinations matched to your trip",
        subtitle:
          "Based on your travel style, budget, timing and starting point.",
        resultCount: {
          one: "{count} destination matches your preferences",
          other: "{count} destinations match your preferences",
        },
        alternativeCount: {
          one: "{count} closest alternative",
          other: "{count} closest alternatives",
        },
        noExactMatches:
          "No exact matches, so we're showing the closest alternatives.",
        recommendedDestinations: "Recommended destinations",
        filters: {
          title: "Your trip",
          regionLabel: "Trip filters",
          editPreferences: "Edit preferences",
          showAll: "All filters ({count})",
          hide: "Hide filters",
          from: "From {location}",
          totalBudget: "{amount} {currency} total",
          perTravellerBudget: "{amount} {currency} per traveller",
          more: "+{count}",
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
        },
        edit: {
          backToResults: "Back to results",
          updateResults: "Update results",
        },
        sort: {
          label: "Sort destinations",
          bestMatch: "Best match",
          closest: "Closest",
        },
        card: {
          match: "{score}% match",
          distance: "≈ {distance} km away",
          distanceAccessible:
            "Approximately {distance} kilometres away in a straight line",
          why: "Why it matches",
          viewTrip: "View trip",
          hideTrip: "Hide details",
          detailPrototype:
            "A detailed trip plan for this destination will be added in a future iteration.",
        },
        prototypeNote:
          "Prototype recommendations — live prices and availability are not connected yet.",
        reasons: {
          tripType: "Strong match for {tripType} trips",
          tripSubtype: "Matches your {tripSubtype} preference",
          budget: "Fits your chosen budget",
          timing: "Good seasonal fit for your travel timing",
          duration: "Good fit for a {duration} stay",
          transport: "Works with your selected transport: {transport}",
          accommodation: "Matches your accommodation preferences",
          travellerGroup: "Well suited to your group: {group}",
          familyFriendly: "Suitable for families",
          petFriendly: "Suitable for travelling with pets",
          meals: "Works with your preferred meal style",
        },
        destinations: {
          innsbruck: {
            city: "Innsbruck",
            description:
              "An alpine city framed by dramatic peaks and easy access to mountain trails.",
          },
          salzburg: {
            city: "Salzburg",
            description:
              "A graceful historic city pairing baroque culture with nearby alpine scenery.",
          },
          vienna: {
            city: "Vienna",
            description:
              "An elegant cultural capital known for grand architecture, museums and café life.",
          },
          prague: {
            city: "Prague",
            description:
              "A walkable historic city of river views, Gothic landmarks and lively evenings.",
          },
          budapest: {
            city: "Budapest",
            description:
              "A vibrant Danube city blending thermal baths, architecture and nightlife.",
          },
          ljubljana: {
            city: "Ljubljana",
            description:
              "A relaxed, green capital with riverside culture and nature close at hand.",
          },
          bled: {
            city: "Bled",
            description:
              "A serene lakeside base surrounded by forests and the Julian Alps.",
          },
          brasov: {
            city: "Brașov",
            description:
              "A storybook Transylvanian city with mountain trails beyond its old town.",
          },
          zakopane: {
            city: "Zakopane",
            description:
              "A lively gateway to the Tatra Mountains, suited to hiking and alpine breaks.",
          },
          munich: {
            city: "Munich",
            description:
              "A polished Bavarian city offering museums, events and quick alpine escapes.",
          },
          dubrovnik: {
            city: "Dubrovnik",
            description:
              "A fortified Adriatic city with historic lanes and striking coastal views.",
          },
          split: {
            city: "Split",
            description:
              "A lively Dalmatian base combining ancient streets, beaches and island access.",
          },
          barcelona: {
            city: "Barcelona",
            description:
              "A Mediterranean city where architecture, beaches, food and nightlife meet.",
          },
          lisbon: {
            city: "Lisbon",
            description:
              "A sunlit hill city with tiled streets, Atlantic views and a rich food scene.",
          },
          amsterdam: {
            city: "Amsterdam",
            description:
              "A canal-lined cultural city with museums, neighbourhood life and easy rail links.",
          },
          krakow: {
            city: "Kraków",
            description:
              "A characterful historic city with rich culture, food and accessible day trips.",
          },
          venice: {
            city: "Venice",
            description:
              "A singular lagoon city of canals, palaces and deeply atmospheric streets.",
          },
          interlaken: {
            city: "Interlaken",
            description:
              "A scenic alpine base between lakes, built for outdoor days and mountain views.",
          },
          nice: {
            city: "Nice",
            description:
              "A relaxed Riviera city combining the Mediterranean coast with art and old-town charm.",
          },
          edinburgh: {
            city: "Edinburgh",
            description:
              "A dramatic historic capital of castle views, festivals and rugged nearby landscapes.",
          },
        },
        countries: {
          AT: "Austria",
          CZ: "Czechia",
          HU: "Hungary",
          SI: "Slovenia",
          RO: "Romania",
          PL: "Poland",
          DE: "Germany",
          HR: "Croatia",
          ES: "Spain",
          PT: "Portugal",
          NL: "Netherlands",
          IT: "Italy",
          CH: "Switzerland",
          FR: "France",
          GB: "United Kingdom",
        },
        tags: {
          alpine: "Alpine",
          architecture: "Architecture",
          arts: "Arts",
          beach: "Beach",
          coastal: "Coastal",
          events: "Events",
          familyFriendly: "Family-friendly",
          food: "Food",
          historic: "Historic",
          lakes: "Lakes",
          nature: "Nature",
          nightlife: "Nightlife",
          outdoors: "Outdoors",
          railFriendly: "Rail-friendly",
          romantic: "Romantic",
        },
      },
    },
  },
  ro: {
    common: {
      languageSelectorLabel: "Selectează limba",
      homeLabel: "Pagina principală TripMatch",
      switchToLightTheme: "Comută la tema luminoasă",
      switchToDarkTheme: "Comută la tema întunecată",
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
        derivedTooltip:
          "{number} · {label} — {duration}, calculată automat",
        currentQuestion: "Întrebarea curentă: {number}, {label}",
        goToQuestion: "Mergi la întrebarea {number}: {label}",
        derivedDurationNavigation:
          "Întrebarea 7: Durată, {duration}, calculată automat. Mergi la întrebarea 6: Perioadă pentru a o modifica.",
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
        budgetType: "Tipul bugetului",
        yourBudget: "Bugetul tău",
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
        selectionHint: "Alege toate variantele potrivite.",
        requirementsLabel: "Pe baza grupului tău",
        stayOptions: "Opțiuni de cazare",
        orLabel: "sau",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Apartament",
          "Villa / Holiday home": "Vilă / Casă de vacanță",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "Fără preferințe",
        },
        optionDescriptions: {
          Hotel: "Clasic și confortabil",
          Resort: "Facilități și relaxare",
          Apartment: "Flexibil și spațios",
          "Villa / Holiday home": "Cazare privată",
          Hostel: "Social și accesibil",
          Camping: "Experiență în natură",
          "No preference": "Orice tip de cazare mi se potrivește",
        },
        groupNeeds: "Grupul tău are nevoie de aproximativ:",
        petFriendlyRequired:
          "Este necesară o cazare care acceptă animale de companie.",
      },
      q5: {
        heading: "Cum ai vrea să organizezi mesele?",
        subtitle: "Alege toate opțiunile care ți se potrivesc.",
        mealStyle: "Stilul meselor",
        selectionHint: "Alege toate variantele potrivite.",
        orLabel: "sau",
        options: {
          "All inclusive": "All-inclusive",
          "Half board": "Demipensiune",
          "Breakfast included": "Mic dejun inclus",
          "Mostly eat at restaurants": "Mai ales la restaurant",
          "Self-catering / cook myself": "Cu bucătărie / gătesc eu",
          "No preference": "Fără preferințe",
        },
        optionDescriptions: {
          "All inclusive": "Totul este deja organizat",
          "Half board": "Mic dejun + o masă principală",
          "Breakfast included": "Începe ziua fără griji",
          "Mostly eat at restaurants": "Descoperă gastronomia locală",
          "Self-catering / cook myself": "Flexibil și independent",
          "No preference": "Sunt flexibil(ă) în privința meselor",
        },
      },
      q6: {
        heading: "Când vrei să călătorești?",
        travelTiming: "Perioada călătoriei",
        modes: {
          exact: "Știu datele exacte",
          rough: "Știu aproximativ când",
          flexible: "Sunt flexibil(ă)",
        },
        modeTitles: {
          exact: "Date exacte",
          rough: "Perioadă aproximativă",
          flexible: "Flexibil",
        },
        modeDescriptions: {
          exact: "Știu deja când",
          rough: "Știu luna",
          flexible: "Datele se pot schimba",
        },
        yourDates: "Datele tale",
        departureDate: "Data plecării",
        returnDate: "Data întoarcerii",
        dateFlexibility: "Flexibilitatea datelor",
        dateFlexibilityHelper:
          "Poate fi mutată puțin întreaga călătorie?",
        dateFlexibilityOptions: {
          0: "Date exacte",
          1: "±1 zi",
          2: "±2 zile",
          3: "±3 zile",
          7: "±7 zile",
        },
        flexibilitySummary: {
          fixed: "{nights} · Date fixe",
          one: "{nights} · Se poate muta cu până la {days} zi mai devreme sau mai târziu",
          other:
            "{nights} · Se poate muta cu până la {days} zile mai devreme sau mai târziu",
        },
        roughTiming: "Perioadă aproximativă",
        month: "Lună",
        year: "An",
        selectMonth: "Selectează o lună",
        selectYear: "Selectează un an",
        returnDateError:
          "Data întoarcerii trebuie să fie ulterioară datei plecării.",
        flexibleDates: "Date flexibile",
        flexibleTitle: "Datele tale sunt flexibile",
        flexibleHelper:
          "Vom folosi durata preferată a călătoriei pentru a găsi opțiuni potrivite.",
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
        subtitle: "Alege durata călătoriei care ți se potrivește.",
        stayLength: "Durata sejurului",
        daysLabel: "zile",
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
        startingPoint: "Punct de plecare",
        modes: {
          currentLocation: {
            label: "Locația actuală",
            description: "Folosește acest dispozitiv",
          },
          manual: {
            label: "Alege manual",
            description: "Caută sau fixează un punct",
          },
        },
        current: {
          locatingLabel: "Te localizăm",
          locating: "Căutăm punctul tău aproximativ de plecare…",
          selectedLabel: "Locația actuală",
          resolvedStatus: "Locația actuală a fost găsită.",
          approximate: "Locație aproximativă",
          permissionHelper:
            "Browserul va solicita permisiunea de a folosi locația acestui dispozitiv.",
          retry: "Încearcă din nou",
          chooseManual: "Alege manual în schimb",
        },
        manual: {
          heading: "Alege punctul de plecare",
          searchLabel: "Caută o locație",
          searchPlaceholder: "Caută un oraș, o zonă sau un loc",
          searchHint: "Introdu cel puțin 3 caractere.",
          queryTooShort: "Introdu cel puțin 3 caractere pentru a căuta.",
          searching: "Se caută locații…",
          resultsLabel: "Sugestii de locații",
          noResults: "Nu am găsit locații potrivite.",
          selectedLabel: "Locație selectată",
          mapHelper: "Trage harta pentru a ajusta punctul de plecare.",
          resolving: "Actualizăm locația selectată…",
          mapLoading: "Se încarcă harta…",
        },
        errors: {
          unavailableInBrowser:
            "Localizarea nu este disponibilă în acest browser.",
          generic: "Nu am putut obține locația ta actuală.",
          permissionDenied:
            "Permisiunea de localizare a fost refuzată. Poți alege manual o locație.",
          unavailable:
            "Locația ta nu este disponibilă momentan. Încearcă din nou sau alege manual.",
          timeout:
            "Solicitarea locației a expirat. Încearcă din nou sau alege manual.",
          reverseGeocode:
            "Am găsit coordonatele, dar nu am putut identifica locația. Încearcă din nou sau alege manual.",
          search:
            "Nu putem căuta locații momentan. Încearcă din nou.",
          map:
            "Harta nu a putut fi încărcată. Poți alege în continuare o locație din rezultatele căutării.",
        },
        accessibility: {
          retryCurrent: "Încearcă din nou localizarea actuală",
          chooseManual: "Alege manual o locație",
          selectSuggestion: "Selectează {location}",
          map: "Hartă interactivă pentru ajustarea punctului de plecare",
          centerPin: "Punctul selectat din centrul hărții",
        },
      },
      q9: {
        heading: "Cum ai vrea să ajungi acolo?",
        subtitle:
          "Alege toate opțiunile de transport care ți se potrivesc. Le vom folosi pentru a găsi destinații realiste pornind de la punctul tău de plecare.",
        startingFrom: "Plecare din",
        sectionLabel: "Opțiuni de transport",
        sectionHelper: "Selectează toate opțiunile care ți se potrivesc",
        openToAnything: "Orice variantă îmi convine",
        options: {
          Car: "Mașină",
          Plane: "Avion",
          Train: "Tren",
          Coach: "Autocar",
          Ferry: "Feribot",
        },
        descriptions: {
          Car: "Libertatea de a opri pe drum",
          Plane: "Ideal pentru distanțe mai lungi",
          Train: "Călătorie confortabilă între orașe",
          Coach: "Călătorie terestră accesibilă",
          Ferry: "Ideal pentru insule și traversări maritime",
        },
        accessibility: {
          selectAll: "Selectează toate opțiunile de transport",
          clearAll: "Deselectează toate opțiunile de transport",
        },
      },
      results: {
        heading: "Destinații potrivite pentru călătoria ta",
        subtitle:
          "Pe baza stilului tău de călătorie, a bugetului, perioadei și punctului de plecare.",
        resultCount: {
          one: "{count} destinație se potrivește preferințelor tale",
          other: "{count} destinații se potrivesc preferințelor tale",
        },
        alternativeCount: {
          one: "{count} alternativă apropiată",
          other: "{count} alternative apropiate",
        },
        noExactMatches:
          "Nu am găsit potriviri exacte, așa că îți arătăm cele mai apropiate alternative.",
        recommendedDestinations: "Destinații recomandate",
        filters: {
          title: "Călătoria ta",
          regionLabel: "Filtrele călătoriei",
          editPreferences: "Editează preferințele",
          showAll: "Toate filtrele ({count})",
          hide: "Ascunde filtrele",
          from: "Plecare din {location}",
          totalBudget: "{amount} {currency} în total",
          perTravellerBudget: "{amount} {currency} per călător",
          more: "+{count}",
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
        },
        edit: {
          backToResults: "Înapoi la rezultate",
          updateResults: "Actualizează rezultatele",
        },
        sort: {
          label: "Sortează destinațiile",
          bestMatch: "Cea mai bună potrivire",
          closest: "Cele mai apropiate",
        },
        card: {
          match: "{score}% potrivire",
          distance: "≈ {distance} km distanță",
          distanceAccessible:
            "La aproximativ {distance} kilometri în linie dreaptă",
          why: "De ce ți se potrivește",
          viewTrip: "Vezi călătoria",
          hideTrip: "Ascunde detaliile",
          detailPrototype:
            "Un plan detaliat pentru această destinație va fi adăugat într-o versiune viitoare.",
        },
        prototypeNote:
          "Recomandări prototip — prețurile și disponibilitatea în timp real nu sunt conectate încă.",
        reasons: {
          tripType:
            "Se potrivește foarte bine călătoriilor de tip {tripType}",
          tripSubtype: "Se potrivește preferinței tale: {tripSubtype}",
          budget: "Se potrivește bugetului ales",
          timing: "Este o alegere bună pentru perioada selectată",
          duration: "Se potrivește unei șederi de {duration}",
          transport:
            "Compatibilă cu opțiunea ta de transport: {transport}",
          accommodation: "Se potrivește preferințelor tale de cazare",
          travellerGroup: "Potrivită pentru grupul tău: {group}",
          familyFriendly: "Potrivită pentru familii",
          petFriendly: "Potrivită pentru călătorii cu animale de companie",
          meals: "Se potrivește stilului de masă preferat",
        },
        destinations: {
          innsbruck: {
            city: "Innsbruck",
            description:
              "Un oraș alpin încadrat de vârfuri spectaculoase, cu acces ușor la trasee montane.",
          },
          salzburg: {
            city: "Salzburg",
            description:
              "Un oraș istoric elegant, unde cultura barocă întâlnește peisajul alpin din apropiere.",
          },
          vienna: {
            city: "Viena",
            description:
              "O capitală culturală rafinată, cunoscută pentru arhitectură monumentală, muzee și cafenele.",
          },
          prague: {
            city: "Praga",
            description:
              "Un oraș istoric ușor de explorat pe jos, cu priveliști spre râu, repere gotice și seri animate.",
          },
          budapest: {
            city: "Budapesta",
            description:
              "Un oraș vibrant pe Dunăre, cu băi termale, arhitectură remarcabilă și viață de noapte.",
          },
          ljubljana: {
            city: "Ljubljana",
            description:
              "O capitală verde și relaxată, cu atmosferă pe malul râului și natură aproape.",
          },
          bled: {
            city: "Bled",
            description:
              "O destinație liniștită pe malul lacului, înconjurată de păduri și Alpii Iulieni.",
          },
          brasov: {
            city: "Brașov",
            description:
              "Un oraș transilvănean de poveste, cu trasee montane dincolo de centrul vechi.",
          },
          zakopane: {
            city: "Zakopane",
            description:
              "O poartă animată spre Munții Tatra, potrivită pentru drumeții și escapade alpine.",
          },
          munich: {
            city: "München",
            description:
              "Un oraș bavarez rafinat, cu muzee, evenimente și acces rapid spre Alpi.",
          },
          dubrovnik: {
            city: "Dubrovnik",
            description:
              "Un oraș fortificat la Adriatica, cu străduțe istorice și priveliști spectaculoase spre coastă.",
          },
          split: {
            city: "Split",
            description:
              "O bază dalmată animată, unde străzile antice se îmbină cu plajele și accesul spre insule.",
          },
          barcelona: {
            city: "Barcelona",
            description:
              "Un oraș mediteraneean în care arhitectura, plajele, gastronomia și viața de noapte se întâlnesc.",
          },
          lisbon: {
            city: "Lisabona",
            description:
              "Un oraș luminos pe coline, cu străzi placate cu azulejos, priveliști atlantice și gastronomie bogată.",
          },
          amsterdam: {
            city: "Amsterdam",
            description:
              "Un oraș cultural străbătut de canale, cu muzee, cartiere vii și legături feroviare bune.",
          },
          krakow: {
            city: "Cracovia",
            description:
              "Un oraș istoric plin de caracter, cu o cultură bogată, gastronomie și excursii de o zi accesibile.",
          },
          venice: {
            city: "Veneția",
            description:
              "Un oraș unic în lagună, cu canale, palate și străzi pline de atmosferă.",
          },
          interlaken: {
            city: "Interlaken",
            description:
              "O bază alpină spectaculoasă între lacuri, ideală pentru zile în aer liber și panorame montane.",
          },
          nice: {
            city: "Nisa",
            description:
              "Un oraș relaxat pe Riviera, unde coasta mediteraneeană întâlnește arta și farmecul centrului vechi.",
          },
          edinburgh: {
            city: "Edinburgh",
            description:
              "O capitală istorică spectaculoasă, cu priveliști spre castel, festivaluri și peisaje sălbatice în apropiere.",
          },
        },
        countries: {
          AT: "Austria",
          CZ: "Cehia",
          HU: "Ungaria",
          SI: "Slovenia",
          RO: "România",
          PL: "Polonia",
          DE: "Germania",
          HR: "Croația",
          ES: "Spania",
          PT: "Portugalia",
          NL: "Țările de Jos",
          IT: "Italia",
          CH: "Elveția",
          FR: "Franța",
          GB: "Regatul Unit",
        },
        tags: {
          alpine: "Alpin",
          architecture: "Arhitectură",
          arts: "Artă",
          beach: "Plajă",
          coastal: "Litoral",
          events: "Evenimente",
          familyFriendly: "Potrivit pentru familii",
          food: "Gastronomie",
          historic: "Istorie",
          lakes: "Lacuri",
          nature: "Natură",
          nightlife: "Viață de noapte",
          outdoors: "Activități în aer liber",
          railFriendly: "Accesibil cu trenul",
          romantic: "Romantic",
        },
      },
    },
  },
  es: {
    common: {
      languageSelectorLabel: "Seleccionar idioma",
      homeLabel: "Página de inicio de TripMatch",
      switchToLightTheme: "Cambiar al tema claro",
      switchToDarkTheme: "Cambiar al tema oscuro",
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
        derivedTooltip:
          "{number} · {label} — {duration}, calculada automáticamente",
        currentQuestion: "Pregunta actual: {number}, {label}",
        goToQuestion: "Ir a la pregunta {number}: {label}",
        derivedDurationNavigation:
          "Pregunta 7: Duración, {duration}, calculada automáticamente. Ve a la pregunta 6: Fechas para cambiarla.",
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
        budgetType: "Tipo de presupuesto",
        yourBudget: "Tu presupuesto",
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
        selectionHint: "Elige todas las opciones que correspondan.",
        requirementsLabel: "Según tu grupo",
        stayOptions: "Opciones de alojamiento",
        orLabel: "o",
        options: {
          Hotel: "Hotel",
          Resort: "Complejo turístico",
          Apartment: "Apartamento",
          "Villa / Holiday home": "Villa / Casa de vacaciones",
          Hostel: "Albergue",
          Camping: "Camping",
          "No preference": "Sin preferencia",
        },
        optionDescriptions: {
          Hotel: "Clásico y práctico",
          Resort: "Comodidades y relajación",
          Apartment: "Flexible y espacioso",
          "Villa / Holiday home": "Estancia privada",
          Hostel: "Social y económico",
          Camping: "Experiencia al aire libre",
          "No preference": "Cualquier tipo de alojamiento me va bien",
        },
        groupNeeds: "Tu grupo necesita aproximadamente:",
        petFriendlyRequired: "Se necesita un alojamiento que admita mascotas.",
      },
      q5: {
        heading: "¿Cómo prefieres organizar las comidas?",
        subtitle: "Elige todas las opciones que te vengan bien.",
        mealStyle: "Estilo de comidas",
        selectionHint: "Elige todas las opciones que correspondan.",
        orLabel: "o",
        options: {
          "All inclusive": "Todo incluido",
          "Half board": "Media pensión",
          "Breakfast included": "Desayuno incluido",
          "Mostly eat at restaurants": "Comer principalmente en restaurantes",
          "Self-catering / cook myself":
            "Alojamiento con cocina / cocinar por mi cuenta",
          "No preference": "Sin preferencia",
        },
        optionDescriptions: {
          "All inclusive": "Todo está resuelto",
          "Half board": "Desayuno + una comida principal",
          "Breakfast included": "Empieza el día con todo listo",
          "Mostly eat at restaurants": "Descubre la gastronomía local",
          "Self-catering / cook myself": "Flexible e independiente",
          "No preference": "Soy flexible con las comidas",
        },
      },
      q6: {
        heading: "¿Cuándo quieres viajar?",
        travelTiming: "Fechas del viaje",
        modes: {
          exact: "Sé las fechas exactas",
          rough: "Sé aproximadamente cuándo",
          flexible: "Soy flexible",
        },
        modeTitles: {
          exact: "Fechas exactas",
          rough: "Fecha aproximada",
          flexible: "Flexible",
        },
        modeDescriptions: {
          exact: "Ya sé cuándo",
          rough: "Sé el mes",
          flexible: "Las fechas pueden cambiar",
        },
        yourDates: "Tus fechas",
        departureDate: "Fecha de salida",
        returnDate: "Fecha de regreso",
        dateFlexibility: "Flexibilidad de fechas",
        dateFlexibilityHelper: "¿Puede desplazarse un poco todo el viaje?",
        dateFlexibilityOptions: {
          0: "Fechas exactas",
          1: "±1 día",
          2: "±2 días",
          3: "±3 días",
          7: "±7 días",
        },
        flexibilitySummary: {
          fixed: "{nights} · Fechas fijas",
          one: "{nights} · Puede desplazarse hasta {days} día antes o después",
          other:
            "{nights} · Puede desplazarse hasta {days} días antes o después",
        },
        roughTiming: "Fecha aproximada",
        month: "Mes",
        year: "Año",
        selectMonth: "Selecciona un mes",
        selectYear: "Selecciona un año",
        returnDateError:
          "La fecha de regreso debe ser posterior a la fecha de salida.",
        flexibleDates: "Fechas flexibles",
        flexibleTitle: "Tus fechas están abiertas",
        flexibleHelper:
          "Usaremos la duración que prefieras para encontrar opciones que encajen.",
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
        subtitle: "Elige la duración del viaje que mejor te venga.",
        stayLength: "Duración de la estancia",
        daysLabel: "días",
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
        startingPoint: "Punto de partida",
        modes: {
          currentLocation: {
            label: "Ubicación actual",
            description: "Usar este dispositivo",
          },
          manual: {
            label: "Elegir manualmente",
            description: "Buscar o colocar un marcador",
          },
        },
        current: {
          locatingLabel: "Buscando tu ubicación",
          locating: "Buscando tu punto de partida aproximado…",
          selectedLabel: "Ubicación actual",
          resolvedStatus: "Ubicación actual encontrada.",
          approximate: "Ubicación aproximada",
          permissionHelper:
            "El navegador te pedirá permiso para usar la ubicación de este dispositivo.",
          retry: "Intentar de nuevo",
          chooseManual: "Elegir manualmente",
        },
        manual: {
          heading: "Elige tu punto de partida",
          searchLabel: "Buscar una ubicación",
          searchPlaceholder: "Busca una ciudad, zona o lugar",
          searchHint: "Introduce al menos 3 caracteres.",
          queryTooShort: "Escribe al menos 3 caracteres para buscar.",
          searching: "Buscando ubicaciones…",
          resultsLabel: "Sugerencias de ubicaciones",
          noResults: "No hemos encontrado ubicaciones que coincidan.",
          selectedLabel: "Ubicación seleccionada",
          mapHelper: "Arrastra el mapa para ajustar tu punto de partida.",
          resolving: "Actualizando la ubicación seleccionada…",
          mapLoading: "Cargando mapa…",
        },
        errors: {
          unavailableInBrowser:
            "La ubicación no está disponible en este navegador.",
          generic: "No hemos podido obtener tu ubicación actual.",
          permissionDenied:
            "Se ha denegado el permiso de ubicación. Puedes elegir una ubicación manualmente.",
          unavailable:
            "Tu ubicación no está disponible en este momento. Inténtalo de nuevo o elige manualmente.",
          timeout:
            "Se agotó el tiempo de espera de la solicitud de ubicación. Inténtalo de nuevo o elige manualmente.",
          reverseGeocode:
            "Hemos encontrado las coordenadas, pero no hemos podido identificar la ubicación. Inténtalo de nuevo o elige manualmente.",
          search:
            "Ahora mismo no podemos buscar ubicaciones. Inténtalo de nuevo.",
          map:
            "No se ha podido cargar el mapa. Aun así, puedes elegir una ubicación en los resultados de búsqueda.",
        },
        accessibility: {
          retryCurrent: "Volver a intentar la ubicación actual",
          chooseManual: "Elegir una ubicación manualmente",
          selectSuggestion: "Seleccionar {location}",
          map: "Mapa interactivo para ajustar tu punto de partida",
          centerPin: "Punto seleccionado en el centro del mapa",
        },
      },
      q9: {
        heading: "¿Cómo te gustaría llegar?",
        subtitle:
          "Elige todas las opciones de transporte que te resulten cómodas. Las usaremos para encontrar destinos realistas desde tu punto de partida.",
        startingFrom: "Salida desde",
        sectionLabel: "Opciones de transporte",
        sectionHelper: "Selecciona todas las que te interesen",
        openToAnything: "Cualquier opción me va bien",
        options: {
          Car: "Coche",
          Plane: "Avión",
          Train: "Tren",
          Coach: "Autocar",
          Ferry: "Ferry",
        },
        descriptions: {
          Car: "Libertad para parar durante el trayecto",
          Plane: "Ideal para distancias más largas",
          Train: "Viajes cómodos de ciudad a ciudad",
          Coach: "Viajes económicos por carretera",
          Ferry: "Ideal para islas y travesías marítimas",
        },
        accessibility: {
          selectAll: "Seleccionar todas las opciones de transporte",
          clearAll: "Deseleccionar todas las opciones de transporte",
        },
      },
      results: {
        heading: "Destinos que encajan con tu viaje",
        subtitle:
          "Según tu estilo de viaje, presupuesto, fechas y punto de partida.",
        resultCount: {
          one: "{count} destino coincide con tus preferencias",
          other: "{count} destinos coinciden con tus preferencias",
        },
        alternativeCount: {
          one: "{count} alternativa cercana",
          other: "{count} alternativas cercanas",
        },
        noExactMatches:
          "No hay coincidencias exactas, así que te mostramos las alternativas más cercanas.",
        recommendedDestinations: "Destinos recomendados",
        filters: {
          title: "Tu viaje",
          regionLabel: "Filtros de tu viaje",
          editPreferences: "Editar preferencias",
          showAll: "Todos los filtros ({count})",
          hide: "Ocultar filtros",
          from: "Desde {location}",
          totalBudget: "{amount} {currency} en total",
          perTravellerBudget: "{amount} {currency} por viajero",
          more: "+{count}",
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
        },
        edit: {
          backToResults: "Volver a los resultados",
          updateResults: "Actualizar resultados",
        },
        sort: {
          label: "Ordenar destinos",
          bestMatch: "Mejor coincidencia",
          closest: "Más cercanos",
        },
        card: {
          match: "{score}% de coincidencia",
          distance: "≈ {distance} km de distancia",
          distanceAccessible:
            "Aproximadamente a {distance} kilómetros en línea recta",
          why: "Por qué encaja contigo",
          viewTrip: "Ver viaje",
          hideTrip: "Ocultar detalles",
          detailPrototype:
            "En una próxima versión añadiremos un plan detallado para este destino.",
        },
        prototypeNote:
          "Recomendaciones de prototipo — los precios y la disponibilidad en tiempo real aún no están conectados.",
        reasons: {
          tripType: "Gran opción para viajes de tipo {tripType}",
          tripSubtype: "Encaja con tu preferencia: {tripSubtype}",
          budget: "Se ajusta al presupuesto elegido",
          timing: "Buena opción para las fechas seleccionadas",
          duration: "Buena opción para una estancia de {duration}",
          transport:
            "Compatible con tu opción de transporte: {transport}",
          accommodation: "Encaja con tus preferencias de alojamiento",
          travellerGroup: "Adecuado para tu grupo: {group}",
          familyFriendly: "Adecuado para familias",
          petFriendly: "Adecuado para viajar con mascotas",
          meals: "Encaja con tu estilo de comidas preferido",
        },
        destinations: {
          innsbruck: {
            city: "Innsbruck",
            description:
              "Una ciudad alpina rodeada de cumbres espectaculares y con fácil acceso a senderos de montaña.",
          },
          salzburg: {
            city: "Salzburgo",
            description:
              "Una elegante ciudad histórica que combina la cultura barroca con paisajes alpinos cercanos.",
          },
          vienna: {
            city: "Viena",
            description:
              "Una refinada capital cultural conocida por su arquitectura monumental, sus museos y sus cafés.",
          },
          prague: {
            city: "Praga",
            description:
              "Una ciudad histórica fácil de recorrer a pie, con vistas al río, monumentos góticos y noches animadas.",
          },
          budapest: {
            city: "Budapest",
            description:
              "Una vibrante ciudad a orillas del Danubio que combina baños termales, arquitectura y vida nocturna.",
          },
          ljubljana: {
            city: "Liubliana",
            description:
              "Una capital verde y tranquila, con ambiente junto al río y la naturaleza muy cerca.",
          },
          bled: {
            city: "Bled",
            description:
              "Un sereno destino junto al lago, rodeado de bosques y los Alpes Julianos.",
          },
          brasov: {
            city: "Brașov",
            description:
              "Una ciudad transilvana de cuento, con senderos de montaña más allá de su casco antiguo.",
          },
          zakopane: {
            city: "Zakopane",
            description:
              "Una animada puerta de entrada a los montes Tatra, ideal para senderismo y escapadas alpinas.",
          },
          munich: {
            city: "Múnich",
            description:
              "Una refinada ciudad bávara con museos, eventos y rápidas escapadas a los Alpes.",
          },
          dubrovnik: {
            city: "Dubrovnik",
            description:
              "Una ciudad fortificada del Adriático con calles históricas y sorprendentes vistas costeras.",
          },
          split: {
            city: "Split",
            description:
              "Una animada base dálmata que combina calles antiguas, playas y acceso a las islas.",
          },
          barcelona: {
            city: "Barcelona",
            description:
              "Una ciudad mediterránea donde se unen arquitectura, playas, gastronomía y vida nocturna.",
          },
          lisbon: {
            city: "Lisboa",
            description:
              "Una luminosa ciudad de colinas, con calles de azulejos, vistas al Atlántico y una rica gastronomía.",
          },
          amsterdam: {
            city: "Ámsterdam",
            description:
              "Una ciudad cultural entre canales, con museos, barrios llenos de vida y buenas conexiones ferroviarias.",
          },
          krakow: {
            city: "Cracovia",
            description:
              "Una ciudad histórica con carácter, rica cultura, gastronomía y excursiones accesibles.",
          },
          venice: {
            city: "Venecia",
            description:
              "Una singular ciudad en la laguna, llena de canales, palacios y calles con atmósfera.",
          },
          interlaken: {
            city: "Interlaken",
            description:
              "Una espectacular base alpina entre lagos, ideal para días al aire libre y vistas de montaña.",
          },
          nice: {
            city: "Niza",
            description:
              "Una relajada ciudad de la Riviera que combina costa mediterránea, arte y encanto histórico.",
          },
          edinburgh: {
            city: "Edimburgo",
            description:
              "Una imponente capital histórica con vistas al castillo, festivales y paisajes agrestes cercanos.",
          },
        },
        countries: {
          AT: "Austria",
          CZ: "Chequia",
          HU: "Hungría",
          SI: "Eslovenia",
          RO: "Rumanía",
          PL: "Polonia",
          DE: "Alemania",
          HR: "Croacia",
          ES: "España",
          PT: "Portugal",
          NL: "Países Bajos",
          IT: "Italia",
          CH: "Suiza",
          FR: "Francia",
          GB: "Reino Unido",
        },
        tags: {
          alpine: "Alpino",
          architecture: "Arquitectura",
          arts: "Arte",
          beach: "Playa",
          coastal: "Costa",
          events: "Eventos",
          familyFriendly: "Para familias",
          food: "Gastronomía",
          historic: "Histórico",
          lakes: "Lagos",
          nature: "Naturaleza",
          nightlife: "Vida nocturna",
          outdoors: "Aire libre",
          railFriendly: "Fácil acceso en tren",
          romantic: "Romántico",
        },
      },
    },
  },
  de: {
    common: {
      languageSelectorLabel: "Sprache auswählen",
      homeLabel: "TripMatch-Startseite",
      switchToLightTheme: "Zum hellen Design wechseln",
      switchToDarkTheme: "Zum dunklen Design wechseln",
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
        derivedTooltip:
          "{number} · {label} — {duration}, automatisch berechnet",
        currentQuestion: "Aktuelle Frage: {number}, {label}",
        goToQuestion: "Zu Frage {number}: {label}",
        derivedDurationNavigation:
          "Frage 7: Dauer, {duration}, automatisch berechnet. Gehe zu Frage 6: Reisezeit, um sie zu ändern.",
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
        budgetType: "Budgetart",
        yourBudget: "Dein Budget",
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
        selectionHint: "Wähle alle passenden Optionen.",
        requirementsLabel: "Basierend auf deiner Reisegruppe",
        stayOptions: "Unterkunftsoptionen",
        orLabel: "oder",
        options: {
          Hotel: "Hotel",
          Resort: "Resort",
          Apartment: "Ferienwohnung",
          "Villa / Holiday home": "Villa / Ferienhaus",
          Hostel: "Hostel",
          Camping: "Camping",
          "No preference": "Keine Präferenz",
        },
        optionDescriptions: {
          Hotel: "Klassisch & komfortabel",
          Resort: "Komfort & Erholung",
          Apartment: "Flexibel & geräumig",
          "Villa / Holiday home": "Privater Aufenthalt",
          Hostel: "Gesellig & preiswert",
          Camping: "Naturerlebnis",
          "No preference": "Ich bin für jede Unterkunft offen",
        },
        groupNeeds: "Deine Gruppe benötigt ungefähr:",
        petFriendlyRequired:
          "Eine haustierfreundliche Unterkunft ist erforderlich.",
      },
      q5: {
        heading: "Wie möchtest du dich während der Reise verpflegen?",
        subtitle: "Wähle alle Optionen, die für dich infrage kommen.",
        mealStyle: "Verpflegung",
        selectionHint: "Wähle alle passenden Optionen.",
        orLabel: "oder",
        options: {
          "All inclusive": "All-inclusive",
          "Half board": "Halbpension",
          "Breakfast included": "Frühstück inklusive",
          "Mostly eat at restaurants": "Überwiegend im Restaurant essen",
          "Self-catering / cook myself": "Selbstversorgung / selbst kochen",
          "No preference": "Keine Präferenz",
        },
        optionDescriptions: {
          "All inclusive": "Alles ist organisiert",
          "Half board": "Frühstück + eine Hauptmahlzeit",
          "Breakfast included": "Gut versorgt in den Tag starten",
          "Mostly eat at restaurants": "Lokale Küche entdecken",
          "Self-catering / cook myself": "Flexibel & unabhängig",
          "No preference": "Bei den Mahlzeiten bin ich flexibel",
        },
      },
      q6: {
        heading: "Wann möchtest du reisen?",
        travelTiming: "Reisezeitraum",
        modes: {
          exact: "Ich kenne meine genauen Reisedaten",
          rough: "Ich weiß ungefähr, wann",
          flexible: "Ich bin flexibel",
        },
        modeTitles: {
          exact: "Genaue Daten",
          rough: "Ungefährer Zeitraum",
          flexible: "Flexibel",
        },
        modeDescriptions: {
          exact: "Ich weiß bereits, wann",
          rough: "Ich kenne den Monat",
          flexible: "Die Daten können sich verschieben",
        },
        yourDates: "Deine Reisedaten",
        departureDate: "Abreisedatum",
        returnDate: "Rückreisedatum",
        dateFlexibility: "Datumsflexibilität",
        dateFlexibilityHelper:
          "Kann sich deine gesamte Reise etwas verschieben?",
        dateFlexibilityOptions: {
          0: "Feste Daten",
          1: "±1 Tag",
          2: "±2 Tage",
          3: "±3 Tage",
          7: "±7 Tage",
        },
        flexibilitySummary: {
          fixed: "{nights} · Feste Reisedaten",
          one: "{nights} · Kann um bis zu {days} Tag nach vorne oder hinten verschoben werden",
          other:
            "{nights} · Kann um bis zu {days} Tage nach vorne oder hinten verschoben werden",
        },
        roughTiming: "Ungefährer Zeitraum",
        month: "Monat",
        year: "Jahr",
        selectMonth: "Monat auswählen",
        selectYear: "Jahr auswählen",
        returnDateError:
          "Das Rückreisedatum muss nach dem Abreisedatum liegen.",
        flexibleDates: "Flexible Daten",
        flexibleTitle: "Deine Reisedaten sind offen",
        flexibleHelper:
          "Wir nutzen deine bevorzugte Reisedauer, um passende Optionen zu finden.",
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
        subtitle: "Wähle die Reisedauer, die sich für dich richtig anfühlt.",
        stayLength: "Aufenthaltsdauer",
        daysLabel: "Tage",
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
        startingPoint: "Startpunkt",
        modes: {
          currentLocation: {
            label: "Aktueller Standort",
            description: "Dieses Gerät verwenden",
          },
          manual: {
            label: "Manuell auswählen",
            description: "Suchen oder eine Markierung setzen",
          },
        },
        current: {
          locatingLabel: "Standort wird ermittelt",
          locating: "Wir ermitteln deinen ungefähren Startpunkt…",
          selectedLabel: "Aktueller Standort",
          resolvedStatus: "Aktueller Standort gefunden.",
          approximate: "Ungefährer Standort",
          permissionHelper:
            "Dein Browser fragt nach der Berechtigung, den Standort dieses Geräts zu verwenden.",
          retry: "Erneut versuchen",
          chooseManual: "Stattdessen manuell auswählen",
        },
        manual: {
          heading: "Wähle deinen Startpunkt",
          searchLabel: "Standort suchen",
          searchPlaceholder: "Stadt, Gebiet oder Ort suchen",
          searchHint: "Gib mindestens 3 Zeichen ein.",
          queryTooShort: "Gib mindestens 3 Zeichen ein, um zu suchen.",
          searching: "Standorte werden gesucht…",
          resultsLabel: "Standortvorschläge",
          noResults: "Keine passenden Standorte gefunden.",
          selectedLabel: "Ausgewählter Standort",
          mapHelper:
            "Verschiebe die Karte, um deinen Startpunkt genauer festzulegen.",
          resolving: "Ausgewählter Standort wird aktualisiert…",
          mapLoading: "Karte wird geladen…",
        },
        errors: {
          unavailableInBrowser:
            "Die Standortbestimmung ist in diesem Browser nicht verfügbar.",
          generic: "Dein aktueller Standort konnte nicht ermittelt werden.",
          permissionDenied:
            "Die Standortberechtigung wurde verweigert. Du kannst stattdessen einen Standort manuell auswählen.",
          unavailable:
            "Dein Standort ist derzeit nicht verfügbar. Versuche es erneut oder wähle ihn manuell aus.",
          timeout:
            "Die Standortanfrage hat zu lange gedauert. Versuche es erneut oder wähle den Standort manuell aus.",
          reverseGeocode:
            "Wir haben die Koordinaten gefunden, konnten den Standort aber nicht bestimmen. Versuche es erneut oder wähle ihn manuell aus.",
          search:
            "Standorte können gerade nicht gesucht werden. Versuche es erneut.",
          map:
            "Die Karte konnte nicht geladen werden. Du kannst weiterhin einen Standort aus den Suchergebnissen auswählen.",
        },
        accessibility: {
          retryCurrent: "Aktuellen Standort erneut ermitteln",
          chooseManual: "Standort manuell auswählen",
          selectSuggestion: "{location} auswählen",
          map: "Interaktive Karte zur Feinabstimmung deines Startpunkts",
          centerPin: "Ausgewählter Punkt in der Kartenmitte",
        },
      },
      q9: {
        heading: "Wie möchtest du dorthin reisen?",
        subtitle:
          "Wähle alle Verkehrsmittel, mit denen du gerne reisen würdest. Wir nutzen sie, um realistische Reiseziele ab deinem Startpunkt zu finden.",
        startingFrom: "Start in",
        sectionLabel: "Reiseoptionen",
        sectionHelper: "Wähle alles aus, was für dich passt",
        openToAnything: "Ich bin für alles offen",
        options: {
          Car: "Auto",
          Plane: "Flugzeug",
          Train: "Zug",
          Coach: "Fernbus",
          Ferry: "Fähre",
        },
        descriptions: {
          Car: "Freiheit für Stopps unterwegs",
          Plane: "Ideal für längere Strecken",
          Train: "Bequem von Stadt zu Stadt",
          Coach: "Preisgünstig über Land reisen",
          Ferry: "Ideal für Inseln und Überfahrten",
        },
        accessibility: {
          selectAll: "Alle Reiseoptionen auswählen",
          clearAll: "Auswahl aller Reiseoptionen aufheben",
        },
      },
      results: {
        heading: "Reiseziele, die zu deiner Reise passen",
        subtitle:
          "Basierend auf deinem Reisestil, Budget, Reisezeitraum und Startpunkt.",
        resultCount: {
          one: "{count} Reiseziel passt zu deinen Präferenzen",
          other: "{count} Reiseziele passen zu deinen Präferenzen",
        },
        alternativeCount: {
          one: "{count} nächstliegende Alternative",
          other: "{count} nächstliegende Alternativen",
        },
        noExactMatches:
          "Es gibt keine exakten Treffer. Deshalb zeigen wir dir die nächstliegenden Alternativen.",
        recommendedDestinations: "Empfohlene Reiseziele",
        filters: {
          title: "Deine Reise",
          regionLabel: "Reisefilter",
          editPreferences: "Präferenzen bearbeiten",
          showAll: "Alle Filter ({count})",
          hide: "Filter ausblenden",
          from: "Ab {location}",
          totalBudget: "{amount} {currency} insgesamt",
          perTravellerBudget: "{amount} {currency} pro Person",
          more: "+{count}",
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
        },
        edit: {
          backToResults: "Zurück zu den Ergebnissen",
          updateResults: "Ergebnisse aktualisieren",
        },
        sort: {
          label: "Reiseziele sortieren",
          bestMatch: "Beste Übereinstimmung",
          closest: "Am nächsten",
        },
        card: {
          match: "{score} % Übereinstimmung",
          distance: "≈ {distance} km entfernt",
          distanceAccessible:
            "Etwa {distance} Kilometer Luftlinie entfernt",
          why: "Warum es passt",
          viewTrip: "Reise ansehen",
          hideTrip: "Details ausblenden",
          detailPrototype:
            "Ein detaillierter Reiseplan für dieses Ziel folgt in einer späteren Version.",
        },
        prototypeNote:
          "Prototyp-Empfehlungen — Live-Preise und Verfügbarkeiten sind noch nicht angebunden.",
        reasons: {
          tripType: "Passt besonders gut zur Reiseart {tripType}",
          tripSubtype: "Passt zu deiner Präferenz „{tripSubtype}“",
          budget: "Passt zu deinem gewählten Budget",
          timing: "Gute saisonale Wahl für deinen Reisezeitraum",
          duration:
            "Passt gut zu deiner gewünschten Reisedauer: {duration}",
          transport:
            "Passt zu deiner gewählten Transportoption: {transport}",
          accommodation: "Passt zu deinen Unterkunftspräferenzen",
          travellerGroup: "Gut geeignet für deine Gruppe: {group}",
          familyFriendly: "Gut für Familien geeignet",
          petFriendly: "Gut für Reisen mit Haustieren geeignet",
          meals: "Passt zu deinen Verpflegungswünschen",
        },
        destinations: {
          innsbruck: {
            city: "Innsbruck",
            description:
              "Eine Alpenstadt vor dramatischen Gipfeln mit direktem Zugang zu Bergwegen.",
          },
          salzburg: {
            city: "Salzburg",
            description:
              "Eine elegante historische Stadt, die barocke Kultur mit naher Alpenkulisse verbindet.",
          },
          vienna: {
            city: "Wien",
            description:
              "Eine elegante Kulturmetropole mit prachtvoller Architektur, Museen und traditionsreichen Kaffeehäusern.",
          },
          prague: {
            city: "Prag",
            description:
              "Eine gut zu Fuß erkundbare Altstadt mit Flussblick, gotischen Wahrzeichen und lebendigen Abenden.",
          },
          budapest: {
            city: "Budapest",
            description:
              "Eine lebendige Donaustadt, die Thermalbäder, Architektur und Nachtleben verbindet.",
          },
          ljubljana: {
            city: "Ljubljana",
            description:
              "Eine entspannte grüne Hauptstadt mit Kultur am Fluss und viel Natur in unmittelbarer Nähe.",
          },
          bled: {
            city: "Bled",
            description:
              "Ein ruhiger Ausgangspunkt am See, umgeben von Wäldern und den Julischen Alpen.",
          },
          brasov: {
            city: "Brașov",
            description:
              "Eine märchenhafte Stadt in Siebenbürgen mit Bergwegen gleich hinter der Altstadt.",
          },
          zakopane: {
            city: "Zakopane",
            description:
              "Ein lebendiges Tor zur Tatra, ideal für Wanderungen und Auszeiten in den Bergen.",
          },
          munich: {
            city: "München",
            description:
              "Eine stilvolle bayerische Stadt mit Museen, Veranstaltungen und schnellen Ausflügen in die Alpen.",
          },
          dubrovnik: {
            city: "Dubrovnik",
            description:
              "Eine befestigte Adriastadt mit historischen Gassen und eindrucksvollen Küstenblicken.",
          },
          split: {
            city: "Split",
            description:
              "Ein lebendiger dalmatinischer Ausgangspunkt mit antiken Gassen, Stränden und Inselverbindungen.",
          },
          barcelona: {
            city: "Barcelona",
            description:
              "Eine Mittelmeerstadt, in der Architektur, Strände, Kulinarik und Nachtleben zusammentreffen.",
          },
          lisbon: {
            city: "Lissabon",
            description:
              "Eine sonnige Stadt auf Hügeln mit gekachelten Gassen, Atlantikblick und vielfältiger Küche.",
          },
          amsterdam: {
            city: "Amsterdam",
            description:
              "Eine Kulturstadt an Kanälen mit Museen, lebendigen Vierteln und guten Bahnverbindungen.",
          },
          krakow: {
            city: "Krakau",
            description:
              "Eine charaktervolle historische Stadt mit reicher Kultur, Kulinarik und gut erreichbaren Ausflugszielen.",
          },
          venice: {
            city: "Venedig",
            description:
              "Eine einzigartige Lagunenstadt voller Kanäle, Paläste und stimmungsvoller Gassen.",
          },
          interlaken: {
            city: "Interlaken",
            description:
              "Ein eindrucksvoller Alpenort zwischen Seen für aktive Tage und weite Bergblicke.",
          },
          nice: {
            city: "Nizza",
            description:
              "Eine entspannte Rivierastadt, die Mittelmeerküste, Kunst und Altstadtflair verbindet.",
          },
          edinburgh: {
            city: "Edinburgh",
            description:
              "Eine dramatische historische Hauptstadt mit Burgblick, Festivals und rauen Landschaften in der Nähe.",
          },
        },
        countries: {
          AT: "Österreich",
          CZ: "Tschechien",
          HU: "Ungarn",
          SI: "Slowenien",
          RO: "Rumänien",
          PL: "Polen",
          DE: "Deutschland",
          HR: "Kroatien",
          ES: "Spanien",
          PT: "Portugal",
          NL: "Niederlande",
          IT: "Italien",
          CH: "Schweiz",
          FR: "Frankreich",
          GB: "Vereinigtes Königreich",
        },
        tags: {
          alpine: "Alpen",
          architecture: "Architektur",
          arts: "Kunst",
          beach: "Strand",
          coastal: "Küste",
          events: "Events",
          familyFriendly: "Familienfreundlich",
          food: "Kulinarik",
          historic: "Historisch",
          lakes: "Seen",
          nature: "Natur",
          nightlife: "Nachtleben",
          outdoors: "Outdoor",
          railFriendly: "Gut per Bahn erreichbar",
          romantic: "Romantisch",
        },
      },
    },
  },
  fr: {
    common: {
      languageSelectorLabel: "Choisir la langue",
      homeLabel: "Accueil TripMatch",
      switchToLightTheme: "Passer au thème clair",
      switchToDarkTheme: "Passer au thème sombre",
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
        derivedTooltip:
          "{number} · {label} — {duration}, calculée automatiquement",
        currentQuestion: "Question actuelle : {number}, {label}",
        goToQuestion: "Aller à la question {number} : {label}",
        derivedDurationNavigation:
          "Question 7 : Durée, {duration}, calculée automatiquement. Allez à la question 6 : Dates pour la modifier.",
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
        budgetType: "Type de budget",
        yourBudget: "Votre budget",
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
        selectionHint: "Choisissez toutes les options qui conviennent.",
        requirementsLabel: "Selon votre groupe",
        stayOptions: "Options d’hébergement",
        orLabel: "ou",
        options: {
          Hotel: "Hôtel",
          Resort: "Complexe hôtelier",
          Apartment: "Appartement",
          "Villa / Holiday home": "Villa / Maison de vacances",
          Hostel: "Auberge de jeunesse",
          Camping: "Camping",
          "No preference": "Aucune préférence",
        },
        optionDescriptions: {
          Hotel: "Classique et pratique",
          Resort: "Services et détente",
          Apartment: "Flexible et spacieux",
          "Villa / Holiday home": "Séjour privé",
          Hostel: "Convivial et économique",
          Camping: "Expérience en plein air",
          "No preference": "Tous les types d’hébergement me conviennent",
        },
        groupNeeds: "Votre groupe a besoin d’environ :",
        petFriendlyRequired:
          "Un hébergement acceptant les animaux sera nécessaire.",
      },
      q5: {
        heading: "Comment souhaitez-vous organiser vos repas ?",
        subtitle: "Choisissez toutes les options qui vous conviennent.",
        mealStyle: "Formule repas",
        selectionHint: "Choisissez toutes les options qui conviennent.",
        orLabel: "ou",
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
        optionDescriptions: {
          "All inclusive": "Tout est pris en charge",
          "Half board": "Petit-déjeuner + un repas principal",
          "Breakfast included": "Commencez la journée l’esprit tranquille",
          "Mostly eat at restaurants": "Découvrez la cuisine locale",
          "Self-catering / cook myself": "Flexibilité et autonomie",
          "No preference": "Je suis flexible pour les repas",
        },
      },
      q6: {
        heading: "Quand souhaitez-vous voyager ?",
        travelTiming: "Période du voyage",
        modes: {
          exact: "Je connais mes dates exactes",
          rough: "Je sais approximativement quand",
          flexible: "Je suis flexible",
        },
        modeTitles: {
          exact: "Dates exactes",
          rough: "Période approximative",
          flexible: "Flexible",
        },
        modeDescriptions: {
          exact: "Je sais déjà quand",
          rough: "Je connais le mois",
          flexible: "Les dates peuvent changer",
        },
        yourDates: "Vos dates",
        departureDate: "Date de départ",
        returnDate: "Date de retour",
        dateFlexibility: "Flexibilité des dates",
        dateFlexibilityHelper:
          "Votre voyage entier peut-il être légèrement décalé ?",
        dateFlexibilityOptions: {
          0: "Dates exactes",
          1: "±1 jour",
          2: "±2 jours",
          3: "±3 jours",
          7: "±7 jours",
        },
        flexibilitySummary: {
          fixed: "{nights} · Dates fixes",
          one: "{nights} · Peut être décalé jusqu’à {days} jour avant ou après",
          other:
            "{nights} · Peut être décalé jusqu’à {days} jours avant ou après",
        },
        roughTiming: "Période approximative",
        month: "Mois",
        year: "Année",
        selectMonth: "Sélectionnez un mois",
        selectYear: "Sélectionnez une année",
        returnDateError:
          "La date de retour doit être postérieure à la date de départ.",
        flexibleDates: "Dates flexibles",
        flexibleTitle: "Vos dates restent ouvertes",
        flexibleHelper:
          "Nous utiliserons la durée souhaitée pour trouver des options adaptées.",
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
        subtitle: "Choisissez la durée de voyage qui vous convient.",
        stayLength: "Durée du séjour",
        daysLabel: "jours",
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
        startingPoint: "Point de départ",
        modes: {
          currentLocation: {
            label: "Position actuelle",
            description: "Utiliser cet appareil",
          },
          manual: {
            label: "Choisir manuellement",
            description: "Rechercher ou placer un repère",
          },
        },
        current: {
          locatingLabel: "Localisation en cours",
          locating: "Recherche de votre point de départ approximatif…",
          selectedLabel: "Position actuelle",
          resolvedStatus: "Position actuelle trouvée.",
          approximate: "Position approximative",
          permissionHelper:
            "Votre navigateur vous demandera l’autorisation d’utiliser la position de cet appareil.",
          retry: "Réessayer",
          chooseManual: "Choisir manuellement",
        },
        manual: {
          heading: "Choisissez votre point de départ",
          searchLabel: "Rechercher un lieu",
          searchPlaceholder: "Rechercher une ville, une zone ou un lieu",
          searchHint: "Saisissez au moins 3 caractères.",
          queryTooShort:
            "Saisissez au moins 3 caractères pour lancer la recherche.",
          searching: "Recherche de lieux…",
          resultsLabel: "Suggestions de lieux",
          noResults: "Aucun lieu correspondant n’a été trouvé.",
          selectedLabel: "Lieu sélectionné",
          mapHelper: "Déplacez la carte pour affiner votre point de départ.",
          resolving: "Mise à jour du lieu sélectionné…",
          mapLoading: "Chargement de la carte…",
        },
        errors: {
          unavailableInBrowser:
            "La géolocalisation n’est pas disponible dans ce navigateur.",
          generic: "Nous n’avons pas pu obtenir votre position actuelle.",
          permissionDenied:
            "L’accès à votre position a été refusé. Vous pouvez choisir un lieu manuellement.",
          unavailable:
            "Votre position est actuellement indisponible. Réessayez ou choisissez-la manuellement.",
          timeout:
            "La demande de localisation a expiré. Réessayez ou choisissez un lieu manuellement.",
          reverseGeocode:
            "Nous avons trouvé les coordonnées, mais pas pu identifier le lieu. Réessayez ou choisissez-le manuellement.",
          search:
            "La recherche de lieux est indisponible pour le moment. Réessayez.",
          map:
            "Impossible de charger la carte. Vous pouvez tout de même choisir un lieu dans les résultats de recherche.",
        },
        accessibility: {
          retryCurrent: "Réessayer de localiser votre position actuelle",
          chooseManual: "Choisir un lieu manuellement",
          selectSuggestion: "Sélectionner {location}",
          map: "Carte interactive pour affiner votre point de départ",
          centerPin: "Point sélectionné au centre de la carte",
        },
      },
      q9: {
        heading: "Comment souhaitez-vous vous y rendre ?",
        subtitle:
          "Choisissez tous les modes de transport qui vous conviennent. Nous les utiliserons pour trouver des destinations réalistes depuis votre point de départ.",
        startingFrom: "Au départ de",
        sectionLabel: "Options de transport",
        sectionHelper: "Sélectionnez toutes celles qui vous conviennent",
        openToAnything: "Toutes les options me conviennent",
        options: {
          Car: "Voiture",
          Plane: "Avion",
          Train: "Train",
          Coach: "Autocar",
          Ferry: "Ferry",
        },
        descriptions: {
          Car: "La liberté de faire des haltes en chemin",
          Plane: "Idéal pour les longues distances",
          Train: "Voyager confortablement de ville en ville",
          Coach: "Voyager par voie terrestre à petit prix",
          Ferry: "Idéal pour les îles et les traversées maritimes",
        },
        accessibility: {
          selectAll: "Sélectionner toutes les options de transport",
          clearAll: "Désélectionner toutes les options de transport",
        },
      },
      results: {
        heading: "Des destinations adaptées à votre voyage",
        subtitle:
          "Selon votre style de voyage, votre budget, vos dates et votre point de départ.",
        resultCount: {
          one: "{count} destination correspond à vos préférences",
          other: "{count} destinations correspondent à vos préférences",
        },
        alternativeCount: {
          one: "{count} alternative proche",
          other: "{count} alternatives proches",
        },
        noExactMatches:
          "Aucune destination ne correspond exactement. Nous vous proposons donc les alternatives les plus proches.",
        recommendedDestinations: "Destinations recommandées",
        filters: {
          title: "Votre voyage",
          regionLabel: "Filtres du voyage",
          editPreferences: "Modifier les préférences",
          showAll: "Tous les filtres ({count})",
          hide: "Masquer les filtres",
          from: "Au départ de {location}",
          totalBudget: "{amount} {currency} au total",
          perTravellerBudget: "{amount} {currency} par voyageur",
          more: "+{count}",
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
        },
        edit: {
          backToResults: "Retour aux résultats",
          updateResults: "Mettre à jour les résultats",
        },
        sort: {
          label: "Trier les destinations",
          bestMatch: "Meilleure correspondance",
          closest: "Les plus proches",
        },
        card: {
          match: "{score} % de correspondance",
          distance: "À ≈ {distance} km",
          distanceAccessible:
            "À environ {distance} kilomètres à vol d’oiseau",
          why: "Pourquoi cette destination vous correspond",
          viewTrip: "Voir le voyage",
          hideTrip: "Masquer les détails",
          detailPrototype:
            "Un itinéraire détaillé pour cette destination sera ajouté dans une prochaine version.",
        },
        prototypeNote:
          "Recommandations prototypes — les prix et disponibilités en temps réel ne sont pas encore connectés.",
        reasons: {
          tripType:
            "Correspond particulièrement aux voyages de type {tripType}",
          tripSubtype: "Correspond à votre préférence : {tripSubtype}",
          budget: "Correspond au budget choisi",
          timing: "Bon choix saisonnier pour vos dates",
          duration: "Convient à un séjour de {duration}",
          transport:
            "Compatible avec votre mode de transport : {transport}",
          accommodation: "Correspond à vos préférences d’hébergement",
          travellerGroup: "Convient à votre groupe : {group}",
          familyFriendly: "Adaptée aux familles",
          petFriendly: "Adaptée aux voyages avec des animaux",
          meals: "Correspond à vos préférences pour les repas",
        },
        destinations: {
          innsbruck: {
            city: "Innsbruck",
            description:
              "Une ville alpine encadrée de sommets spectaculaires, avec un accès facile aux sentiers de montagne.",
          },
          salzburg: {
            city: "Salzbourg",
            description:
              "Une élégante ville historique où la culture baroque rencontre les paysages alpins voisins.",
          },
          vienna: {
            city: "Vienne",
            description:
              "Une capitale culturelle raffinée, connue pour son architecture majestueuse, ses musées et ses cafés.",
          },
          prague: {
            city: "Prague",
            description:
              "Une ville historique agréable à parcourir à pied, entre vues sur le fleuve, monuments gothiques et soirées animées.",
          },
          budapest: {
            city: "Budapest",
            description:
              "Une ville vibrante sur le Danube, mêlant bains thermaux, architecture et vie nocturne.",
          },
          ljubljana: {
            city: "Ljubljana",
            description:
              "Une capitale verte et détendue, avec une belle vie au bord de l’eau et la nature toute proche.",
          },
          bled: {
            city: "Bled",
            description:
              "Un point de départ paisible au bord du lac, entouré de forêts et des Alpes juliennes.",
          },
          brasov: {
            city: "Brașov",
            description:
              "Une ville transylvaine de conte de fées, avec des sentiers de montagne au-delà de sa vieille ville.",
          },
          zakopane: {
            city: "Zakopane",
            description:
              "Une porte d’entrée animée vers les Tatras, idéale pour la randonnée et les escapades alpines.",
          },
          munich: {
            city: "Munich",
            description:
              "Une élégante ville bavaroise avec des musées, des événements et un accès rapide aux Alpes.",
          },
          dubrovnik: {
            city: "Dubrovnik",
            description:
              "Une cité fortifiée de l’Adriatique aux ruelles historiques et aux superbes vues côtières.",
          },
          split: {
            city: "Split",
            description:
              "Un point de départ dalmate animé, entre rues antiques, plages et accès aux îles.",
          },
          barcelona: {
            city: "Barcelone",
            description:
              "Une ville méditerranéenne où se rencontrent architecture, plages, gastronomie et vie nocturne.",
          },
          lisbon: {
            city: "Lisbonne",
            description:
              "Une ville lumineuse sur les collines, aux rues carrelées, vues atlantiques et riche scène gastronomique.",
          },
          amsterdam: {
            city: "Amsterdam",
            description:
              "Une ville culturelle bordée de canaux, avec des musées, des quartiers vivants et de bonnes liaisons ferroviaires.",
          },
          krakow: {
            city: "Cracovie",
            description:
              "Une ville historique de caractère, riche en culture, en gastronomie et en excursions accessibles.",
          },
          venice: {
            city: "Venise",
            description:
              "Une ville lagunaire unique, faite de canaux, de palais et de ruelles pleines d’atmosphère.",
          },
          interlaken: {
            city: "Interlaken",
            description:
              "Un point de départ alpin spectaculaire entre deux lacs, idéal pour le plein air et les panoramas de montagne.",
          },
          nice: {
            city: "Nice",
            description:
              "Une ville détendue de la Riviera, entre côte méditerranéenne, art et charme de la vieille ville.",
          },
          edinburgh: {
            city: "Édimbourg",
            description:
              "Une capitale historique spectaculaire, entre vues sur le château, festivals et paysages sauvages alentour.",
          },
        },
        countries: {
          AT: "Autriche",
          CZ: "Tchéquie",
          HU: "Hongrie",
          SI: "Slovénie",
          RO: "Roumanie",
          PL: "Pologne",
          DE: "Allemagne",
          HR: "Croatie",
          ES: "Espagne",
          PT: "Portugal",
          NL: "Pays-Bas",
          IT: "Italie",
          CH: "Suisse",
          FR: "France",
          GB: "Royaume-Uni",
        },
        tags: {
          alpine: "Alpes",
          architecture: "Architecture",
          arts: "Arts",
          beach: "Plage",
          coastal: "Littoral",
          events: "Événements",
          familyFriendly: "Adapté aux familles",
          food: "Gastronomie",
          historic: "Histoire",
          lakes: "Lacs",
          nature: "Nature",
          nightlife: "Vie nocturne",
          outdoors: "Plein air",
          railFriendly: "Facilement accessible en train",
          romantic: "Romantique",
        },
      },
    },
  },
} satisfies Record<LanguageCode, Translation>;
