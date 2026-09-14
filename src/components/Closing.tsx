import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function Closing() {
  return (
    <section className="section closing" lang="en" dir="ltr">
      <Reveal>
        <p className="closing-forever">{wedding.copy.closing}</p>
        <p className="closing-names">{wedding.couple.displayEn}</p>
        <p className="closing-date">{wedding.date.short}</p>
      </Reveal>
    </section>
  );
}
