"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

import type { Translation } from "@/data/translations";
import {
  measurePopup,
  observePopupPosition,
  type PopupPosition,
} from "@/utils/popupPosition";

type DatePickerProps = {
  label: string;
  value: string;
  min?: string;
  locale: string;
  copy: Translation["discover"]["q6"]["calendar"];
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
};

// Use UTC for calendar arithmetic so DST never changes a YYYY-MM-DD value.
function calendarDate(year: number, month: number, day: number) {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  return date;
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = calendarDate(year, month - 1, day);
  return year >= 1 && dateKey(date) === value ? date : null;
}

function shiftDays(date: Date, count: number) {
  return calendarDate(
    date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + count,
  );
}

function shiftMonths(date: Date, count: number) {
  const first = calendarDate(date.getUTCFullYear(), date.getUTCMonth() + count, 1);
  const last = calendarDate(first.getUTCFullYear(), first.getUTCMonth() + 1, 0);
  return calendarDate(
    first.getUTCFullYear(), first.getUTCMonth(),
    Math.min(date.getUTCDate(), last.getUTCDate()),
  );
}

const controlClass =
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl px-2 text-sm font-semibold text-[#315b5f] transition hover:bg-[#e3f2ef] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1b7c83] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent motion-reduce:transition-none dark:text-[#c5dedd] dark:hover:bg-white/10 dark:focus-visible:outline-[#83d9d2]";

export default function DatePicker({
  label,
  value,
  min,
  locale,
  copy,
  invalid,
  describedBy,
  onChange,
}: DatePickerProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const activeDayRef = useRef<HTMLButtonElement>(null);
  const focusDayRef = useRef(false);
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const [activeDate, setActiveDate] = useState("");
  const [today, setToday] = useState("");
  const isOpen = position !== null;
  const selectedDate = parseDate(value);
  const minimum = min && parseDate(min) ? min : "0001-01-01";
  const displayedDate = parseDate(activeDate);
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long", year: "numeric", timeZone: "UTC",
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium", timeZone: "UTC",
  });
  const fullDateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "full", timeZone: "UTC",
  });
  const dayFormatter = new Intl.NumberFormat(locale);
  // The supported US locale starts Sunday; the supported European locales start Monday.
  const weekStartsOn = new Intl.Locale(locale).region === "US" ? 0 : 1;
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    calendarDate(2023, 0, 1 + weekStartsOn + index),
  );
  const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const weekdayFull = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" });

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!isOpen || !trigger) return;

    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !trigger?.contains(event.target) &&
        !popupRef.current?.contains(event.target)
      ) {
        setPosition(null);
        trigger?.focus({ preventScroll: true });
      }
    }

    const stopObserving = observePopupPosition(trigger, () => popupRef.current, () => {
      const nextPosition = measurePopup(trigger, 416, 320);
      setPosition(nextPosition);
      if (nextPosition === null) trigger.focus({ preventScroll: true });
    });
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      stopObserving();
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const day = activeDayRef.current;
    const popup = popupRef.current;
    if (!isOpen || !day || !popup || !focusDayRef.current) return;

    day.focus({ preventScroll: true });
    const dayRect = day.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    if (dayRect.top < popupRect.top + 4) {
      popup.scrollTop -= popupRect.top + 4 - dayRect.top;
    } else if (dayRect.bottom > popupRect.bottom - 4) {
      popup.scrollTop += dayRect.bottom - popupRect.bottom + 4;
    }
  }, [activeDate, isOpen, position?.maxHeight]);

  function closeCalendar() {
    setPosition(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function openCalendar() {
    if (!triggerRef.current) return;
    const now = new Date();
    const todayKey = dateKey(calendarDate(now.getFullYear(), now.getMonth(), now.getDate()));
    setToday(todayKey);
    const initial = selectedDate ? value : todayKey;
    setActiveDate(initial < minimum ? minimum : initial);
    focusDayRef.current = true;
    setPosition(measurePopup(triggerRef.current, 416, 320));
  }

  function selectDate(next: string) {
    if (next !== "" && (!parseDate(next) || next < minimum)) return;
    onChange(next);
    closeCalendar();
  }

  function moveTo(date: Date, focusDay: boolean) {
    const bounded = new Date(Math.max(
      calendarDate(1, 0, 1).getTime(),
      Math.min(calendarDate(9999, 11, 31).getTime(), date.getTime()),
    ));
    const key = dateKey(bounded);
    focusDayRef.current = focusDay;
    setActiveDate(key < minimum ? minimum : key);
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const weekIndex = (date.getUTCDay() - weekStartsOn + 7) % 7;
    const dayMoves: Record<string, number> = {
      ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7,
      Home: -weekIndex, End: 6 - weekIndex,
    };

    if (event.key in dayMoves) {
      event.preventDefault();
      moveTo(shiftDays(date, dayMoves[event.key]), true);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      moveTo(shiftMonths(date, (event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1)), true);
    }
    // Real day buttons handle Enter/Space through their normal click behavior.
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeCalendar();
    } else if (event.key === "Tab") {
      focusDayRef.current = false;
      const buttons = Array.from(popupRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])
        .filter((button) => button.tabIndex >= 0);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    }
  }

  const monthStart = displayedDate ? calendarDate(displayedDate.getUTCFullYear(), displayedDate.getUTCMonth(), 1) : null;
  const daysInMonth = monthStart ? calendarDate(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 0).getUTCDate() : 0;
  const leadingDays = monthStart ? (monthStart.getUTCDay() - weekStartsOn + 7) % 7 : 0;
  const weeks = Math.ceil((leadingDays + daysInMonth) / 7);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${id}-dialog` : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => isOpen ? closeCalendar() : openCalendar()}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openCalendar();
          }
        }}
        className="min-w-0 cursor-pointer rounded-[1.15rem] border border-[#c5dcd8] bg-[#f9fcfa]/90 px-4 py-3 text-left shadow-sm transition focus-visible:border-[#4faaa6] focus-visible:ring-3 focus-visible:ring-[#71c8c1]/18 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b7c83] motion-reduce:transition-none dark:border-white/12 dark:bg-white/[0.055] dark:focus-visible:border-[#70c5bf] dark:focus-visible:outline-[#83d9d2]"
      >
        <span id={`${id}-label`} className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#567176] dark:text-[#abc3c3]">{label}</span>
        <span className="mt-1.5 flex min-h-8 min-w-0 items-center gap-3 text-[#2a7377] dark:text-[#8ed7d1]">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5 shrink-0">
            <rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3.5 9h17M8 3.5v3M16 3.5v3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          <span id={`${id}-value`} className="min-w-0 truncate text-base font-bold text-[#143a3f] dark:text-[#eff9f8]">
            {selectedDate ? dateFormatter.format(selectedDate) : copy.chooseDate}
          </span>
        </span>
      </button>

      {position && displayedDate && monthStart && createPortal(
        <div
          ref={popupRef}
          id={`${id}-dialog`}
          role="dialog"
          aria-modal="true"
          aria-label={`${label}: ${copy.chooseDate}`}
          onKeyDown={handleDialogKeyDown}
          style={position}
          className="fixed z-[1200] overflow-y-auto overscroll-contain rounded-2xl border border-[#c5dcd8] bg-[#f9fcfa] p-2 text-[#143a3f] shadow-[0_12px_32px_rgba(18,63,70,0.16)] dark:border-[#39575b] dark:bg-[#102f35] dark:text-[#edf8f7]"
        >
          <div className="flex items-center gap-1">
            <button type="button" aria-label={copy.previousMonth} disabled={dateKey(shiftDays(monthStart, -1)) < minimum} className={controlClass} onClick={() => moveTo(shiftMonths(displayedDate, -1), false)}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <h2 id={`${id}-month`} aria-live="polite" className="min-w-0 flex-1 text-center text-sm font-bold">{monthFormatter.format(displayedDate)}</h2>
            <button type="button" aria-label={copy.nextMonth} disabled={activeDate.startsWith("9999-12")} className={controlClass} onClick={() => moveTo(shiftMonths(displayedDate, 1), false)}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4"><path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <table role="grid" aria-labelledby={`${id}-month`} className="mt-1 w-full table-fixed border-collapse">
            <thead>
              <tr>{weekdays.map((day) => <th key={day.getUTCDay()} scope="col" aria-label={weekdayFull.format(day)} className="h-7 text-[0.65rem] font-semibold text-[#567176] dark:text-[#abc3c3]">{weekdayShort.format(day)}</th>)}</tr>
            </thead>
            <tbody>
              {Array.from({ length: weeks }, (_, week) => (
                <tr key={week}>
                  {Array.from({ length: 7 }, (_, weekday) => {
                    const dayNumber = week * 7 + weekday - leadingDays + 1;
                    if (dayNumber < 1 || dayNumber > daysInMonth) {
                      return <td key={weekday} role="gridcell" />;
                    }
                    const date = calendarDate(monthStart.getUTCFullYear(), monthStart.getUTCMonth(), dayNumber);
                    const key = dateKey(date);
                    const selected = key === value;
                    const disabled = key < minimum;
                    return (
                      <td key={weekday} role="gridcell" aria-selected={selected} aria-disabled={disabled} className="p-0.5">
                        <button
                          ref={key === activeDate ? activeDayRef : undefined}
                          type="button"
                          disabled={disabled}
                          tabIndex={key === activeDate ? 0 : -1}
                          aria-label={fullDateFormatter.format(date)}
                          aria-current={key === today ? "date" : undefined}
                          onClick={() => selectDate(key)}
                          onKeyDown={(event) => handleDayKeyDown(event, date)}
                          className={`relative min-h-11 w-full cursor-pointer rounded-lg border text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1b7c83] disabled:cursor-not-allowed disabled:opacity-35 dark:focus-visible:outline-[#83d9d2] ${selected ? "border-[#55c9c5] bg-[#123f46] text-white dark:bg-[#20555b]" : "border-transparent enabled:hover:bg-[#e3f2ef] dark:enabled:hover:bg-white/10"}`}
                        >
                          {dayFormatter.format(dayNumber)}
                          {key === today && <span aria-hidden="true" className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 flex justify-between gap-2 border-t border-[#c5dcd8] pt-1 dark:border-white/12">
            <button type="button" disabled={!value} className={controlClass} onClick={() => selectDate("")}>{copy.clearDate}</button>
            <button type="button" className={controlClass} onClick={closeCalendar}>{copy.closeCalendar}</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
