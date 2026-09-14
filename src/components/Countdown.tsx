import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "../config";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft(): TimeLeft {
  const target = new Date(wedding.date.iso).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((diff % 3_600_000) / 60_000)),
    seconds: pad(Math.floor((diff % 60_000) / 1000)),
  };
}

function FlipValue({ value }: { value: string }) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <span className="count-value">{value}</span>;

  return (
    <span className="count-value">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="count-digit"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = Array.from({ length: startOffset }, () => null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  return cells;
}

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:20261010T170000Z`,
    `DTEND:20261010T193000Z`,
    `SUMMARY:Wedding of ${wedding.couple.displayEn}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.city}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mohammad-dima-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const cells = useMemo(
    () => buildMonthCells(wedding.date.weddingYear, wedding.date.weddingMonth),
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="section countdown-section" lang="en" dir="ltr">
      <Reveal>
        <article className="glass-card reception-card">
          <p className="eyebrow">{wedding.copy.receptionTitle}</p>
          <p className="reception-lead">We invite you to celebrate with us at</p>
          <p className="reception-time">{wedding.date.timeStartEn}</p>
          <p className="date-row">
            <span>{wedding.date.weekdayEn}</span>
            <span>10</span>
            <span>October</span>
          </p>
          <p className="reception-year">2026</p>
        </article>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="eyebrow">{wedding.copy.countdownTitle}</p>
        <div className="countdown" role="timer" aria-live="polite">
          {units.map((unit) => (
            <div className="count-item" key={unit.label}>
              <FlipValue value={unit.value} />
              <span className="count-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="calendar glass-card">
          <p className="calendar-month">{wedding.date.calendarMonthLabel}</p>
          <div className="calendar-week">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {cells.map((day, i) => (
              <span
                key={`${day ?? "e"}-${i}`}
                className={day === wedding.date.weddingDay ? "is-wedding" : undefined}
              >
                {day === wedding.date.weddingDay ? "♡" : day ?? ""}
              </span>
            ))}
          </div>
        </div>
        <button type="button" className="text-link" onClick={downloadIcs}>
          {wedding.copy.addToCalendar}
        </button>
      </Reveal>
    </section>
  );
}
