"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

import {
  supportedLanguages,
  type LanguageCode,
} from "@/data/translations";

import selectorStyles from "./LanguageSelector.module.css";

type LanguageSelectorProps = {
  value: LanguageCode;
  label: string;
  onChange: (language: LanguageCode) => void;
  appearance?: "themed" | "neutral";
  className?: string;
};

export default function LanguageSelector({
  value,
  label,
  onChange,
  appearance = "themed",
  className = "",
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const listboxId = useId();

  const selectedIndex = Math.max(
    0,
    supportedLanguages.findIndex((language) => language.code === value),
  );
  const selectedLanguage = supportedLanguages[selectedIndex];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  function openMenu() {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function closeMenu(restoreTriggerFocus: boolean) {
    setIsOpen(false);

    if (restoreTriggerFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  function selectLanguage(index: number) {
    const language = supportedLanguages[index];

    setActiveIndex(index);
    onChange(language.code);
    closeMenu(true);
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLLIElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index + 1) % supportedLanguages.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index - 1 + supportedLanguages.length) % supportedLanguages.length,
      );
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(supportedLanguages.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectLanguage(index);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }

    if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      const pressedKey = event.key.toLocaleLowerCase();
      const matchIndex = supportedLanguages.findIndex((language) =>
        language.name.toLocaleLowerCase().startsWith(pressedKey),
      );

      if (matchIndex >= 0) {
        event.preventDefault();
        setActiveIndex(matchIndex);
      }
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (
      event.relatedTarget instanceof Node &&
      rootRef.current?.contains(event.relatedTarget)
    ) {
      return;
    }

    setIsOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={`${selectorStyles.root} ${
        appearance === "neutral" ? selectorStyles.neutral : ""
      }`}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${selectedLanguage.name}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        className={`${selectorStyles.trigger} ${className}`}
        onClick={() => (isOpen ? closeMenu(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={selectorStyles.triggerCode} aria-hidden="true">
          {selectedLanguage.shortLabel}
        </span>
        <span className={selectorStyles.triggerName}>
          {selectedLanguage.name}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={`${selectorStyles.chevron} ${
            isOpen ? selectorStyles.chevronOpen : ""
          }`}
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className={selectorStyles.menu}
        >
          {supportedLanguages.map((language, index) => {
            const isSelected = language.code === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={language.code}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`${listboxId}-${language.code}`}
                role="option"
                aria-selected={isSelected}
                tabIndex={isActive ? 0 : -1}
                data-active={isActive}
                className={selectorStyles.option}
                onClick={() => selectLanguage(index)}
                onFocus={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                <span className={selectorStyles.optionCode} aria-hidden="true">
                  {language.shortLabel}
                </span>
                <span className={selectorStyles.optionName} lang={language.code}>
                  {language.name}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={selectorStyles.checkmark}
                >
                  <path
                    d="m5 10 3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
