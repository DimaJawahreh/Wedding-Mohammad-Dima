import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "./config";
import { Envelope } from "./components/Envelope";
import { MusicControl } from "./components/MusicControl";
import { OpeningBlessing } from "./components/OpeningBlessing";
import { InvitationCard } from "./components/InvitationCard";
import { CoupleHero } from "./components/CoupleHero";
import { Countdown } from "./components/Countdown";
import { Location } from "./components/Location";
import { Timeline } from "./components/Timeline";
import { WishingWell } from "./components/WishingWell";
import { ChildrenNote } from "./components/ChildrenNote";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopAutoScroll = useRef(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("is-locked", !revealed || wishOpen);
  }, [revealed, wishOpen]);

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

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    void playMusic();
    window.setTimeout(() => setRevealed(true), reduce ? 60 : 1250);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio || !audioReady) return;
    if (audio.paused) {
      void playMusic();
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="floral-bg" aria-hidden="true" />

      <audio
        ref={audioRef}
        loop
        preload="auto"
        onCanPlay={() => setAudioReady(true)}
        onError={() => {
          setAudioReady(false);
          setPlaying(false);
        }}
      >
        <source src={wedding.music.src} type="audio/mp4" />
      </audio>

      <AnimatePresence>
        {!revealed && (
          <motion.div key="open" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <Envelope onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && (
        <motion.main
          className="invitation"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <OpeningBlessing />
          <InvitationCard />
          <CoupleHero />
          <Countdown />
          <Location />
          <Timeline />
          <WishingWell
            open={wishOpen}
            onOpen={() => setWishOpen(true)}
            onClose={() => setWishOpen(false)}
          />
          <ChildrenNote />
          <Closing />
          <Footer />
        </motion.main>
      )}

      {revealed && audioReady && (
        <MusicControl playing={playing} onToggle={toggleMusic} />
      )}
    </div>
  );
}
