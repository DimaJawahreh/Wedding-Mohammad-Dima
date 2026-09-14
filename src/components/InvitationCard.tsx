import { wedding } from "../config";
import { Reveal } from "./Reveal";

export function InvitationCard() {
  return (
    <section className="section invite-card-section" aria-label="Invitation">
      <Reveal>
        <article className="glass-card invite-card">
          <p className="eyebrow">{wedding.copy.ceremonyTitle}</p>

          <p className="invite-intro">{wedding.copy.invitation.intro}</p>

          <div className="invite-hosts">
            <div className="host-col">
              <p className="invite-honors">{wedding.copy.invitation.honors}</p>
              <p className="invite-host-name">{wedding.hosts.first}</p>
            </div>
            <span className="host-divider" aria-hidden="true" />
            <div className="host-col">
              <p className="invite-honors">و</p>
              <p className="invite-host-name">{wedding.hosts.second}</p>
            </div>
          </div>

          <p className="invite-line">{wedding.copy.invitation.inviteLine1}</p>
          <p className="invite-line">{wedding.copy.invitation.inviteLine2}</p>

          <h2 className="invite-couple">{wedding.couple.displayArInvite}</h2>
          <p className="invite-couple-en" lang="en" dir="ltr">
            {wedding.couple.displayEn}
          </p>

          <p className="invite-meta">{wedding.copy.invitation.dayPrefix}</p>
          <p className="invite-date">{wedding.date.dateAr}</p>
          <p className="invite-time">{wedding.date.timeAr}</p>
          <p className="invite-place-label">{wedding.copy.invitation.placeLabel}</p>
          <p className="invite-place" lang="en" dir="ltr">
            {wedding.venue.name}
          </p>
        </article>
      </Reveal>
    </section>
  );
}
