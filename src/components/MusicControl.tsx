import { wedding } from "../config";

type MusicControlProps = {
  playing: boolean;
  onToggle: () => void;
};

export function MusicControl({ playing, onToggle }: MusicControlProps) {
  return (
    <button
      type="button"
      className={`music-btn ${playing ? "is-playing" : ""}`}
      onClick={onToggle}
      aria-label={playing ? wedding.music.pauseLabel : wedding.music.playLabel}
      lang="en"
      dir="ltr"
    >
      <span className="music-vinyl" aria-hidden="true">
        <span className="music-vinyl-groove" />
        <span className="music-vinyl-label" />
      </span>
      <span className="music-icon" aria-hidden="true">
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="0.6" />
            <rect x="14" y="5" width="4" height="14" rx="0.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.8v12.4c0 .7.8 1.1 1.4.7l9.2-6.2c.6-.4.6-1.3 0-1.7L9.4 5.1C8.8 4.7 8 5.1 8 5.8Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
