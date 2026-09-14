import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function Timeline() {
  return (
    <section className="section timeline-section" lang="en" dir="ltr">
      <Reveal>
        <h2 className="section-title">{wedding.copy.scheduleTitle}</h2>
      </Reveal>
      <ol className="timeline">
        {wedding.timeline.map((item, index) => (
          <Reveal key={item.time} delay={index * 0.06}>
            <li className="timeline-item">
              <span className="timeline-time">{item.time}</span>
              <span className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
              </span>
              <span className="timeline-title">{item.title}</span>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
