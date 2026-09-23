import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "../config";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type WishingWellProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function WishingWell({ open, onOpen, onClose }: WishingWellProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="section wishing-section" lang="en" dir="ltr">
      <Reveal className="wishing-inner">
        <p className="section-title wishing-heading">{wedding.copy.wishingWellTitle}</p>
        <button
          type="button"
          className="gift-btn"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <img src={wedding.images.gift} alt="" className="gift-img" loading="lazy" decoding="async" />
          <span className="gift-hint">{wedding.copy.wishingWellHint}</span>
        </button>
        <p className="wishing-teaser">{wedding.copy.wishingWellMessage}</p>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-backdrop"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="wish-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wish-title"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="wish-modal-bar">
                <h2 id="wish-title">{wedding.copy.wishingWellTitle}</h2>
                <button type="button" className="wish-close" onClick={onClose} aria-label="Close">
                  ×
                </button>
              </div>
              <div className="wish-modal-body">
                <img src={wedding.images.gift} alt="" className="wish-modal-gift" loading="lazy" decoding="async" />
                <p className="wish-en">{wedding.copy.wishingWellMessage}</p>
                <p className="wish-ar" dir="rtl">
                  {wedding.copy.wishingWellMessageAr}
                </p>
                <p className="wish-names">{wedding.couple.displayEn}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
