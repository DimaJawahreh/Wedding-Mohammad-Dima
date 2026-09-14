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
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("is-locked", !revealed || wishOpen);
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
    window.setTimeout(() => setRevealed(true), reduce ? 60 : 720);
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
