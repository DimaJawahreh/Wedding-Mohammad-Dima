import { useEffect, useState } from "react";
import { wedding } from "../config";
import { formatGuestCountNote, parseGuestCount } from "../guestCount";
import { Reveal } from "./Reveal";

export function InvitationCard() {
  const [guestCount, setGuestCount] = useState(() => parseGuestCount());

  useEffect(() => {
    const sync = () => setGuestCount(parseGuestCount());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return (
    <section className="section invite-card-section" id="invitation" aria-label="Invitation">
      <Reveal>
        <article className="glass-card invite-card">
          <p className="eyebrow">{wedding.copy.ceremonyTitle}</p>

          <p className="invite-intro">{wedding.copy.invitation.intro}</p>

          <p className="invite-honors">{wedding.copy.invitation.honors}</p>
          <div className="invite-hosts">
            <p className="invite-host-name">{wedding.hosts.first}</p>
            <span className="host-and">و</span>
            <p className="invite-host-name">{wedding.hosts.second}</p>
          </div>

          <p className="invite-line">{wedding.copy.invitation.inviteLine1}</p>
          <p className="invite-line">{wedding.copy.invitation.inviteLine2}</p>

          <h2 className="invite-couple">
            <span>{wedding.couple.groomAr}</span>
            <span className="invite-couple-and">و</span>
            <span>{wedding.couple.brideAr}</span>
          </h2>
          <p className="invite-couple-en" lang="en" dir="ltr">
            {wedding.couple.displayEn}
          </p>

          <p className="invite-meta">{wedding.copy.invitation.dayPrefix}</p>
          <p className="invite-date">{wedding.date.dateAr}</p>
          <p className="invite-time">{wedding.date.timeStartAr}</p>
          <p className="invite-place-label">{wedding.copy.invitation.placeLabel}</p>
          <p className="invite-place" lang="en" dir="ltr">
            {wedding.venue.name}
          </p>
          <p className="invite-guests">{formatGuestCountNote(guestCount)}</p>
        </article>
      </Reveal>
    </section>
  );
}
