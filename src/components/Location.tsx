import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function Location() {
  return (
    <section className="section location-section" lang="en" dir="ltr">
      <Reveal>
        <p className="section-title">{wedding.copy.locationTitle}</p>
        <p className="venue-name">{wedding.venue.name}</p>
        <p className="venue-city">{wedding.venue.city}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="map-card glass-card">
          <a
            className="map-frame"
            href={wedding.venue.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="map-pin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <strong>{wedding.venue.name}</strong>
            <span>{wedding.copy.directions}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
