export const THEME_STORAGE_KEY = "tripmatch-theme";

export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

const THEME_CHANGE_EVENT = "tripmatch-theme-change";

let sessionTheme: Theme | null = null;

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getPreferredTheme(): Theme {
  return sessionTheme ?? getStoredTheme() ?? getSystemTheme();
}

export function getAppliedTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  const appliedTheme = document.documentElement.dataset.theme;
  return isTheme(appliedTheme) ? appliedTheme : getPreferredTheme();
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function setThemePreference(theme: Theme) {
  sessionTheme = theme;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The current page still keeps the explicit choice when storage is blocked.
    }
  }

  applyTheme(theme);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }
}

export function subscribeToTheme(onThemeChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function handleSystemThemeChange() {
    if (sessionTheme !== null || getStoredTheme() !== null) {
      return;
    }

    applyTheme(getSystemTheme());
    onThemeChange();
  }

  function handleStoredThemeChange(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    sessionTheme = isTheme(event.newValue) ? event.newValue : null;
    applyTheme(getPreferredTheme());
    onThemeChange();
  }

  colorSchemeQuery.addEventListener("change", handleSystemThemeChange);
  window.addEventListener("storage", handleStoredThemeChange);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

  return () => {
    colorSchemeQuery.removeEventListener("change", handleSystemThemeChange);
    window.removeEventListener("storage", handleStoredThemeChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  };
}

const storageKeyLiteral = JSON.stringify(THEME_STORAGE_KEY);

export const themeInitializationScript = `
(function () {
  var storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(${storageKeyLiteral});
  } catch (error) {}

  var theme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  var root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();
`;
