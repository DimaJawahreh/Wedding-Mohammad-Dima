import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "./config";
import { Envelope } from "./components/Envelope";
import { MusicControl } from "./components/MusicControl";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const Invitation = lazy(() => import("./Invitation"));

const OPEN_KEY = "md-invite-open";

function wasOpened() {
  try {
    return sessionStorage.getItem(OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markOpened() {
  try {
    sessionStorage.setItem(OPEN_KEY, "1");
  } catch {
    /* ignore private-mode quota */
  }
}

export default function App() {
  const alreadyOpen = wasOpened();
  const [opened, setOpened] = useState(alreadyOpen);
  const [revealed, setRevealed] = useState(alreadyOpen);
  const [playing, setPlaying] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopAutoScroll = useRef(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("is-locked", !revealed || wishOpen);
  }, [revealed, wishOpen]);

  useEffect(() => {
    if (!revealed) return;
    void import("./fonts");
  }, [revealed]);

  useEffect(() => {
    if (!revealed || wishOpen || stopAutoScroll.current) return;

    let raf = 0;
    let start = 0;
    let touchY = 0;
    let cancelled = false;
    let scrolling = false;
    let delay = 0;
    let retry = 0;
    let armedAt = Number.POSITIVE_INFINITY;
    let tries = 0;

    const scroller = () =>
      document.scrollingElement ?? document.documentElement;

    const distance = () => {
      const view = window.innerHeight || scroller().clientHeight;
      return Math.max(
        0,
        scroller().scrollHeight - view,
        document.body.scrollHeight - view,
        document.documentElement.scrollHeight - view,
      );
    };

    const setTop = (y: number) => {
      const node = scroller();
      node.scrollTop = y;
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    };

    const halt = () => {
      cancelled = true;
      stopAutoScroll.current = true;
      scrolling = false;
      document.documentElement.classList.remove("is-auto-scrolling");
      window.clearTimeout(delay);
      window.clearTimeout(retry);
      cancelAnimationFrame(raf);
    };

    const onWheel = (event: WheelEvent) => {
      if (performance.now() < armedAt) return;
      if (Math.abs(event.deltaY) < 2 && Math.abs(event.deltaX) < 2) return;
      halt();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (performance.now() < armedAt) return;
      const y = event.touches[0]?.clientY ?? touchY;
      if (Math.abs(y - touchY) > 12) halt();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === " " ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "PageUp" ||
        event.key === "Home" ||
        event.key === "End"
      ) {
        halt();
      }
    };

    const begin = () => {
      if (cancelled) return;
      const max = distance();
      if (max < 80 && tries < 12) {
        tries += 1;
        retry = window.setTimeout(begin, 250);
        return;
      }
      if (max < 80) return;

      document.documentElement.classList.add("is-auto-scrolling");
      scrolling = true;
      armedAt = performance.now() + 800;
      const duration = Math.min(62000, Math.max(38000, max * 8));

      const tick = (now: number) => {
        if (cancelled || !scrolling) return;
        if (!start) start = now;
        const t = Math.min(1, (now - start) / duration);
        setTop(distance() * t);
        if (t < 1) raf = requestAnimationFrame(tick);
        else document.documentElement.classList.remove("is-auto-scrolling");
      };

      raf = requestAnimationFrame(tick);
    };

    delay = window.setTimeout(begin, 1800);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelled = true;
      scrolling = false;
      document.documentElement.classList.remove("is-auto-scrolling");
      window.clearTimeout(delay);
      window.clearTimeout(retry);
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [revealed, wishOpen]);

  function ensureMusicSrc(audio: HTMLAudioElement) {
    if (audio.getAttribute("src") !== wedding.music.src) {
      audio.src = wedding.music.src;
    }
  }

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      ensureMusicSrc(audio);
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    markOpened();
    void playMusic();
    window.setTimeout(() => setRevealed(true), reduce ? 60 : 1250);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused || audio.getAttribute("src") !== wedding.music.src) {
      void playMusic();
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="app-shell">
      <div className={`floral-bg ${revealed ? "is-on" : ""}`} aria-hidden="true" />

      <audio
        ref={audioRef}
        loop
        preload="none"
        playsInline
        onError={() => setPlaying(false)}
      />

      <AnimatePresence>
        {!revealed && (
          <motion.div key="open" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <Envelope onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && (
        <Suspense fallback={null}>
          <Invitation
            reduce={reduce}
            wishOpen={wishOpen}
            onWishOpen={() => setWishOpen(true)}
            onWishClose={() => setWishOpen(false)}
          />
        </Suspense>
      )}

      {revealed && <MusicControl playing={playing} onToggle={toggleMusic} />}
    </div>
  );
}
