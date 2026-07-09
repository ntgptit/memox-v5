import React from "react";

/**
 * MxTopBar — the screen header primitive. Leading (back/close) + title (with
 * long-title truncation) + trailing actions. `variant` tunes it for standard,
 * study (compact, centred title), and settings screens. Sticky by default at
 * the sticky layer.
 */
export function MxTopBar({
  title,
  subtitle,
  leading = null,
  actions = null,
  variant = "default", // default | study | settings
  sticky = true,
  style,
}) {
  const centred = variant === "study";
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-8)",
        height: 56,
        padding: "0 var(--mx-space-8) 0 var(--mx-space-4)",
        background:
          variant === "settings"
            ? "var(--mx-color-surface-base)"
            : "var(--mx-color-background-app)",
        borderBottom:
          variant === "study" ? "none" : "var(--mx-border-subtle)",
        position: sticky ? "sticky" : "relative",
        top: 0,
        zIndex: "var(--mx-layer-sticky)",
        ...style,
      }}
    >
      <div style={{ flex: "0 0 auto", display: "flex" }}>{leading}</div>
      <div
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          textAlign: centred ? "center" : "left",
          paddingLeft: centred ? 0 : "var(--mx-space-4)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mx-font-display)",
            fontSize: "var(--mx-text-title-medium-size)",
            lineHeight: "var(--mx-text-title-medium-line)",
            fontWeight: "var(--mx-weight-bold)",
            letterSpacing: "var(--mx-text-title-medium-tracking)",
            color: "var(--mx-color-text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: "var(--mx-text-caption-size)",
              lineHeight: "var(--mx-text-caption-line)",
              color: "var(--mx-color-text-tertiary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "var(--mx-space-2)" }}>
        {actions}
      </div>
    </header>
  );
}
