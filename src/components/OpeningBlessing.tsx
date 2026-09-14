import { motion } from "framer-motion";
import { wedding } from "../config";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function OpeningBlessing() {
  const reduce = usePrefersReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="section blessing" aria-label="Opening">
      <motion.div className="names-arch" lang="en" dir="ltr" {...fade(0.05)}>
        <p className="arch-name">{wedding.couple.groomEn}</p>
        <p className="open-amp">&amp;</p>
        <p className="arch-name">{wedding.couple.brideEn}</p>
      </motion.div>

      <motion.p className="bismillah" {...fade(0.2)}>
        {wedding.copy.bismillah}
      </motion.p>
      <motion.blockquote className="ayah" {...fade(0.32)}>
        {wedding.copy.quranVerse}
      </motion.blockquote>

      <motion.a
        href="#invitation"
        className="scroll-hint"
        aria-label="Scroll down"
        {...fade(0.55)}
      >
        <span className="scroll-hint-line" aria-hidden="true" />
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9.5 12 15.5 18 9.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </section>
  );
}
