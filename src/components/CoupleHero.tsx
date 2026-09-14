import { useEffect, useState } from "react";
import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function CoupleHero() {
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasPhoto(true);
    img.onerror = () => setHasPhoto(false);
    img.src = wedding.images.couple;
  }, []);

  if (!hasPhoto) return null;

  return (
    <section className="section couple-hero" aria-label={wedding.couple.displayEn}>
      <Reveal>
        <div className="portrait-frame">
          <img
            src={wedding.images.couple}
            alt={wedding.couple.displayEn}
            className="portrait-photo"
          />
        </div>
      </Reveal>
    </section>
  );
}
