export type GuestCount = 1 | 2 | 3;

const ALLOWED: readonly GuestCount[] = [1, 2, 3];

function asGuestCount(value: string | null | undefined): GuestCount | null {
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return ALLOWED.includes(n as GuestCount) ? (n as GuestCount) : null;
}

export function parseGuestCount(
  location: Pick<Location, "pathname" | "search"> = window.location,
): GuestCount {
  const params = new URLSearchParams(location.search);
  const fromQuery = asGuestCount(params.get("guests") ?? params.get("n"));
  if (fromQuery) return fromQuery;

  const segment = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean).at(-1);
  return asGuestCount(segment) ?? 1;
}

export function formatGuestCountNote(count: GuestCount): string {
  return `عدد الحضور لهذه البطاقة: ${count}`;
}
