import React from "react";

/**
 * MxEmptyState — non-error "nothing here" states: no decks, no due cards,
 * empty search, unavailable/future feature. Icon slot + title + message +
 * optional action. Deliberately calm (never styled like an error) — no-due is
 * a positive/neutral state, not a failure.
 */
export function MxEmptyState({
  icon = null,
  title,
  message,
  action = null,
  tone = "neutral", // neutral | positive | unavailable
  style,
}) {
  const iconColor = {
    neutral: "var(--mx-color-text-tertiary)",
    positive: "var(--mx-color-srs-noDue)",
    unavailable: "var(--mx-color-text-disabled)",
  }[tone];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-40) var(--mx-space-24)",
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--mx-radius-full)",
            background: "var(--mx-color-state-loadingSurface)",
            color: iconColor,
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--mx-font-display)",
          fontSize: "var(--mx-text-title-medium-size)",
          lineHeight: "var(--mx-text-title-medium-line)",
          fontWeight: "var(--mx-weight-bold)",
          color: "var(--mx-color-text-primary)",
        }}
      >
        {title}
      </div>
      {message && (
        <div
          style={{
            fontSize: "var(--mx-text-body-medium-size)",
            lineHeight: "var(--mx-text-body-medium-line)",
            color: "var(--mx-color-text-secondary)",
            maxWidth: 280,
            textWrap: "pretty",
          }}
        >
          {message}
        </div>
      )}
      {action && <div style={{ marginTop: "var(--mx-space-8)" }}>{action}</div>}
    </div>
  );
}
