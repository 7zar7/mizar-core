export function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
      className="px-5 py-10 md:px-8"
    >
      <p
        className="mono mb-6 text-center italic"
        style={{ fontSize: 10, color: "var(--text-muted)" }}
      >
        Mizar — the binary star used to test visual acuity. We apply the same
        standard.
      </p>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <p
          className="mono"
          style={{ fontSize: 11, color: "var(--text-muted)" }}
        >
          MIZAR // CORE · Strategy-first web studio
        </p>
        <p
          className="mono"
          style={{ fontSize: 11, color: "var(--text-muted)" }}
        >
          [LinkedIn placeholder] · [email placeholder]
        </p>
      </div>
    </footer>
  );
}
