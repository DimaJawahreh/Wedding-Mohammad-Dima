import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type EnvelopeProps = {
  onOpen: () => void;
};

export function Envelope({ onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);
  const reduce = usePrefersReducedMotion();

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    onOpen();
  }

  return (
    <div className="open-screen" role="dialog" aria-modal="true" lang="en" dir="ltr">
      <motion.div
        className="open-card"
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
        animate={{
          opacity: opening ? 0 : 1,
          y: opening ? -16 : 0,
          scale: opening ? 1.03 : 1,
        }}
        transition={{ duration: opening ? 0.7 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="open-heart" aria-hidden="true">♡</span>
        <p className="open-name">{wedding.couple.groomEn}</p>
        <p className="open-amp">&amp;</p>
        <p className="open-name">{wedding.couple.brideEn}</p>
        <span className="open-rule" aria-hidden="true" />
        <p className="open-date">{wedding.date.dateEn}</p>
        <p className="open-invited">{wedding.copy.youreInvited}</p>
        <button
          type="button"
          className="pill-btn"
          onClick={handleOpen}
          aria-label={wedding.copy.openInvitation}
        >
          {wedding.copy.openInvitation}
        </button>
      </motion.div>
    </div>
  );
}
