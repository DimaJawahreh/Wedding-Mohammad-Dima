import { motion } from "framer-motion";
import { OpeningBlessing } from "./components/OpeningBlessing";
import { InvitationCard } from "./components/InvitationCard";
import { Countdown } from "./components/Countdown";
import { Location } from "./components/Location";
import { Timeline } from "./components/Timeline";
import { WishingWell } from "./components/WishingWell";
import { ChildrenNote } from "./components/ChildrenNote";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";

type InvitationProps = {
  reduce: boolean;
  wishOpen: boolean;
  onWishOpen: () => void;
  onWishClose: () => void;
};

export default function Invitation({
  reduce,
  wishOpen,
  onWishOpen,
  onWishClose,
}: InvitationProps) {
  return (
    <motion.main
      className="invitation"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <OpeningBlessing />
      <InvitationCard />
      <Countdown />
      <Location />
      <Timeline />
      <WishingWell open={wishOpen} onOpen={onWishOpen} onClose={onWishClose} />
      <ChildrenNote />
      <Closing />
      <Footer />
    </motion.main>
  );
}
