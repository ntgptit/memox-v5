import React from "react";

/**
 * MxSettingsRow — the settings-line primitive. Title + optional subtitle, a
 * trailing value/control (text value, chevron, switch, or custom), and
 * disabled/unavailable states. Opening settings never mutates data — this row
 * only reflects and navigates. Use `tone="destructive"` for high-risk actions.
 */
export function MxSettingsRow({
  title,
  subtitle = null,
  leading = null,
  value = null, // trailing text value
  control = null, // trailing custom control (switch, chevron)
  tone = "default", // default | destructive
  disabled = false,
  unavailable = false, // shows an "unavailable/future" affordance
  onClick,
  style,
}) {
  const interactive = !!onClick && !disabled && !unavailable;
  const titleColor =
    tone === "destructive"
      ? "var(--mx-color-destructive-text)"
      : disabled || unavailable
      ? "var(--mx-color-text-disabled)"
      : "var(--mx-color-text-primary)";

  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || unavailable || undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-12)",
        minHeight: "var(--mx-size-settings-row-height)",
        padding: "var(--mx-space-12) var(--mx-space-16)",
        cursor: interactive ? "pointer" : "default",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
      onPointerEnter={(e) => { if (interactive) e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)"; }}
      onPointerLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {leading && <span style={{ flex: "0 0 auto", display: "flex", color: "var(--mx-color-text-secondary)" }}>{leading}</span>}
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-body-large-size)", fontWeight: "var(--mx-weight-medium)", color: titleColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: "var(--mx-text-body-small-size)", lineHeight: "var(--mx-text-body-small-line)", color: "var(--mx-color-text-tertiary)", textWrap: "pretty" }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "var(--mx-space-8)" }}>
        {unavailable && (
          <span style={{ fontSize: "var(--mx-text-caption-size)", color: "var(--mx-color-text-tertiary)", padding: "3px 8px", borderRadius: "var(--mx-radius-pill)", background: "var(--mx-color-state-unavailableSurface)" }}>
            Soon
          </span>
        )}
        {value != null && (
          <span style={{ fontSize: "var(--mx-text-body-medium-size)", color: "var(--mx-color-text-secondary)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {value}
          </span>
        )}
        {control}
        {interactive && !control && (
          <span aria-hidden="true" style={{ color: "var(--mx-color-text-tertiary)", fontSize: 18 }}>›</span>
        )}
      </div>
    </div>
  );
}
