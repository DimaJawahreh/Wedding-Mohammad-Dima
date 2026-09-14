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
          <div className="map-frame">
            <iframe
              title={wedding.venue.name}
              src={wedding.venue.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <a
          className="text-link"
          href={wedding.venue.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {wedding.copy.directions}
        </a>
      </Reveal>
    </section>
  );
}
