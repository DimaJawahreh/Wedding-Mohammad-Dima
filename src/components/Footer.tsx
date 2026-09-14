import { wedding } from "../config";

export function Footer() {
  return (
    <footer className="footer" lang="en" dir="ltr">
      <p className="credit">{wedding.copy.credit}</p>
    </footer>
  );
}
