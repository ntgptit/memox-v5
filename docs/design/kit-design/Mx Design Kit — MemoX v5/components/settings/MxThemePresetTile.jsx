import React from "react";

/**
 * MxThemePresetTile — a selectable appearance preset (day/night theme, or an
 * app-icon variant). Shows a mini preview swatch, a name, and a clear selected
 * ring. `unavailable` covers app-icon variants the platform can't switch to.
 */
export function MxThemePresetTile({
  name,
  preview, // { bg, surface, accent } colours OR a node
  selected = false,
  unavailable = false,
  onClick,
  style,
}) {
  const swatch =
    preview && typeof preview === "object" && preview.bg ? (
      <div style={{ position: "relative", height: 76, borderRadius: "var(--mx-radius-md)", background: preview.bg, overflow: "hidden", border: "1px solid rgba(128,128,128,0.15)" }}>
        <div style={{ position: "absolute", left: 10, right: 10, top: 12, height: 10, borderRadius: 6, background: preview.surface }} />
        <div style={{ position: "absolute", left: 10, top: 28, width: 34, height: 10, borderRadius: 6, background: preview.surface }} />
        <div style={{ position: "absolute", left: 10, bottom: 10, width: 46, height: 14, borderRadius: 7, background: preview.accent }} />
      </div>
    ) : (
      <div style={{ height: 76, borderRadius: "var(--mx-radius-md)", overflow: "hidden" }}>{preview}</div>
    );

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={unavailable}
      onClick={() => !unavailable && onClick && onClick()}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "var(--mx-space-8)",
        padding: "var(--mx-space-8)",
        background: "var(--mx-color-surface-card)",
        border: selected ? "var(--mx-border-selected)" : "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-lg)",
        cursor: unavailable ? "not-allowed" : "pointer",
        opacity: unavailable ? 0.5 : 1,
        textAlign: "left",
        ...style,
      }}
    >
      {swatch}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--mx-space-4)" }}>
        <span style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-label-large-size)", fontWeight: "var(--mx-weight-semibold)", color: "var(--mx-color-text-primary)" }}>{name}</span>
        {selected && <span style={{ display: "flex", color: "var(--mx-color-action-primary)" }}><i data-lucide="check-circle-2" style={{ width: 18, height: 18 }}></i></span>}
        {unavailable && <span style={{ fontSize: "var(--mx-text-caption-size)", color: "var(--mx-color-text-tertiary)" }}>Soon</span>}
      </div>
    </button>
  );
}
