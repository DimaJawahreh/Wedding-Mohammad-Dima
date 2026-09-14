type OrnamentProps = {
  className?: string;
};

export function FloralCorner({ className }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 68C18 52 28 44 46 42"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M46 42c8-1 16 4 18 12-8 1-15-3-18-12Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M46 42c6-8 16-10 22-6-4 8-13 10-22 6Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M46 42c-2-10 3-20 12-24-2 10-2 18-12 24Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path
        d="M28 58c4-2 8 0 10 4-4 1-8 0-10-4Z"
        stroke="currentColor"
        strokeWidth="0.65"
      />
      <circle cx="46" cy="42" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function GoldRule({ className }: OrnamentProps) {
  return (
    <div className={`gold-rule ${className ?? ""}`} aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}

export function LocationPin({ className }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="9.6" r="2.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
