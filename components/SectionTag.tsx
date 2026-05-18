/**
 * Section index marker — top-left corner, engineering-document feel.
 */
export function SectionTag({
  n,
  dark = false,
}: {
  n: string;
  dark?: boolean;
}) {
  return (
    <span
      aria-hidden
      className="mono pointer-events-none absolute"
      style={{
        top: 24,
        left: 24,
        fontSize: 11,
        letterSpacing: "0.3em",
        color: dark ? "rgba(255,255,255,0.35)" : "var(--text-muted)",
        zIndex: 3,
      }}
    >
      {n}
    </span>
  );
}
