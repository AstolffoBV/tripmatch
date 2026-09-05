"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  measurePopup,
  observePopupPosition,
  type PopupPosition,
} from "@/utils/popupPosition";

type SelectDropdownProps = {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
};

export default function SelectDropdown({
  label,
  value,
  options,
  onChange,
}: SelectDropdownProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const listboxId = `${id}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const typeaheadRef = useRef({ text: "", time: 0 });
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isOpen = position !== null;
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!isOpen || !trigger) return;

    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !triggerRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setPosition(null);
      }
    }

    const stopObserving = observePopupPosition(
      trigger,
      () => menuRef.current,
      () => setPosition(measurePopup(trigger, Math.min(288, options.length * 44 + 10))),
    );
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      stopObserving();
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen, options.length]);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const option = menu?.children[activeIndex];
    if (!menu || !(option instanceof HTMLElement)) return;

    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < menu.scrollTop) menu.scrollTop = top;
    else if (bottom > menu.scrollTop + menu.clientHeight) {
      menu.scrollTop = bottom - menu.clientHeight;
    }
  }, [activeIndex, isOpen, position?.maxHeight]);

  function openMenu(index = selectedIndex) {
    if (!triggerRef.current || options.length === 0) return;
    typeaheadRef.current = { text: "", time: 0 };
    setActiveIndex(index);
    setPosition(measurePopup(triggerRef.current, Math.min(288, options.length * 44 + 10)));
    triggerRef.current.focus({ preventScroll: true });
  }

  function selectOption(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setPosition(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) openMenu();
      else {
        setActiveIndex((index) =>
          Math.max(0, Math.min(options.length - 1, index + (event.key === "ArrowDown" ? 1 : -1))),
        );
      }
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const index = event.key === "Home" ? 0 : options.length - 1;
      if (!isOpen) openMenu(index);
      else setActiveIndex(index);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) selectOption(activeIndex);
      else openMenu();
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setPosition(null);
    } else if (event.key === "Tab") {
      setPosition(null);
    } else if (
      event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey
    ) {
      event.preventDefault();
      const now = Date.now();
      const previous = typeaheadRef.current;
      const text =
        (now - previous.time < 700 ? previous.text : "") + event.key.toLocaleLowerCase();
      const index = options.findIndex((option) =>
        option.label.toLocaleLowerCase().startsWith(text),
      );
      if (!isOpen) openMenu(index >= 0 ? index : selectedIndex);
      else if (index >= 0) setActiveIndex(index);
      typeaheadRef.current = { text, time: now };
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-activedescendant={isOpen ? `${listboxId}-${activeIndex}` : undefined}
        onClick={() => isOpen ? setPosition(null) : openMenu()}
        onKeyDown={handleKeyDown}
        onBlur={() => setPosition(null)}
        className="relative min-w-0 cursor-pointer rounded-[1.15rem] border border-[#c5dcd8] bg-[#f9fcfa]/90 px-4 py-3 text-left shadow-sm transition focus-visible:border-[#4faaa6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] focus-visible:ring-3 focus-visible:ring-[#71c8c1]/18 motion-reduce:transition-none dark:border-white/12 dark:bg-white/[0.055] dark:focus-visible:border-[#70c5bf] dark:focus-visible:outline-[#83d9d2]"
      >
        <span id={labelId} className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#567176] dark:text-[#abc3c3]">
          {label}
        </span>
        <span id={valueId} className="mt-1 flex min-h-9 min-w-0 items-center pr-8 text-base font-bold text-[#143a3f] dark:text-[#eff9f8]">
          <span className="truncate">{options[selectedIndex]?.label}</span>
        </span>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute right-4 bottom-4 size-4 text-[#527276] dark:text-[#a9c4c3]">
          <path d="m6 8 4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      </button>

      {/* A portal keeps viewport positioning independent of Q6's backdrop blur. */}
      {position !== null && createPortal(
        <ul
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          style={position}
          onMouseDown={(event) => event.preventDefault()}
          className="fixed z-[1200] m-0 overflow-y-auto overscroll-contain rounded-2xl border border-[#c5dcd8] bg-[#f9fcfa] p-1 text-[#143a3f] shadow-[0_12px_32px_rgba(18,63,70,0.16)] dark:border-[#39575b] dark:bg-[#102f35] dark:text-[#edf8f7]"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listboxId}-${index}`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => selectOption(index)}
              onPointerMove={(event) => {
                if (event.pointerType === "mouse") setActiveIndex(index);
              }}
              className={`flex min-h-11 cursor-pointer items-center rounded-xl px-3 py-2 text-base font-semibold break-words [overflow-wrap:anywhere] ${
                option.value === value
                  ? "bg-[#123f46] text-white dark:bg-[#20555b] dark:text-[#eff9f8]"
                  : index === activeIndex
                    ? "bg-[#e3f2ef] text-[#143a3f] dark:bg-[#24484d] dark:text-[#eff9f8]"
                    : "bg-transparent"
              } ${index === activeIndex ? "ring-2 ring-inset ring-[#398f91] dark:ring-[#83d9d2]" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </>
  );
}
