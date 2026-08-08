"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  LANGUAGE_COOKIE_NAME,
  translations,
  type LanguageCode,
  type Translation,
} from "@/data/translations";

type LanguageContextValue = {
  language: LanguageCode;
  copy: Translation;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: LanguageCode;
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>(initialLanguage);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    document.cookie = `${LANGUAGE_COOKIE_NAME}=${nextLanguage}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, []);

  const value = useMemo(
    () => ({
      language,
      copy: translations[language],
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === null) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}
