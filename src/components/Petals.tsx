import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type PetalsProps = {
  burst?: boolean;
  count?: number;
};

export function Petals({ burst = false, count = 16 }: PetalsProps) {
  const reduce = usePrefersReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: burst ? 38 + ((i * 17) % 24) : (i * 37) % 100,
        delay: burst ? i * 0.06 : (i % 8) * 0.8,
        duration: burst ? 3.2 + (i % 5) * 0.35 : 14 + (i % 6) * 2.2,
        size: burst ? 7 + (i % 4) * 2 : 6 + (i % 5) * 2,
        drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 5) * 8),
        rotate: 40 + (i % 7) * 20,
        tone: i % 3,
      })),
    [burst, count],
  );

  if (reduce) return null;

  return (
    <div className={`petals ${burst ? "petals--burst" : ""}`} aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className={`petal petal--${p.tone}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.45,
          }}
          initial={
            burst
              ? { y: "42vh", opacity: 0, scale: 0.4, rotate: 0 }
              : { y: "-8vh", opacity: 0, rotate: 0 }
          }
          animate={{
            y: burst ? ["42vh", "110vh"] : ["-8vh", "108vh"],
            x: [0, p.drift, p.drift * -0.4],
            opacity: burst ? [0, 0.75, 0.5, 0] : [0, 0.45, 0.4, 0],
            rotate: [0, p.rotate, p.rotate + 80],
            scale: burst ? [0.4, 1, 0.9] : 1,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: burst ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
