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
      <motion.p
        className="open-invited envelope-kicker"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
      >
        {wedding.copy.youreInvited}
      </motion.p>

      <motion.button
        type="button"
        className={`envelope-wrap ${opening ? "is-opening" : ""}`}
        onClick={handleOpen}
        aria-label={wedding.copy.openInvitation}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? -20 : 0 }}
        transition={{ duration: opening ? 0.7 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="envelope" aria-hidden="true">
          <div className="envelope-back" />
          <motion.div
            className="envelope-letter"
            animate={opening ? { y: reduce ? 0 : -52 } : { y: 20 }}
            transition={{ duration: 0.9, delay: opening ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="envelope-letter-names">{wedding.couple.initials}</span>
            <span className="envelope-letter-date">{wedding.date.short}</span>
          </motion.div>
          <div className="envelope-body" />
          <motion.div
            className="envelope-flap"
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="envelope-seal"
            animate={opening ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            {wedding.couple.initials}
          </motion.div>
        </div>
        <span className="envelope-hint">{wedding.copy.openInvitation}</span>
      </motion.button>
    </div>
  );
}
