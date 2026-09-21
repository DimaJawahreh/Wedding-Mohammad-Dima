import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function ChildrenNote() {
  return (
    <section className="section children-note" aria-label="تنويه">
      <Reveal>
        <p className="children-title">{wedding.copy.childrenTitle}</p>
        <p className="children-text">{wedding.copy.childrenNote}</p>
      </Reveal>
    </section>
  );
}
