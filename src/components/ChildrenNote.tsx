import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function ChildrenNote() {
  return (
    <section className="section children-note" aria-label="A gentle note">
      <Reveal>
        <p className="children-text">{wedding.copy.childrenNote}</p>
      </Reveal>
    </section>
  );
}
