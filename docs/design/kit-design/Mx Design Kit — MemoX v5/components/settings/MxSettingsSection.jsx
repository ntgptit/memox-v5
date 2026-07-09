import React from "react";

/**
 * MxSettingsSection — a titled group of settings rows with an optional
 * description. Wrap MxSettingsRow children in a card-like grouped container.
 */
export function MxSettingsSection({ title, description = null, children, style }) {
  return (
    <section style={{ marginBottom: "var(--mx-layout-section-gap)", ...style }}>
      {title && (
        <div style={{ padding: "0 var(--mx-space-4) var(--mx-space-8)" }}>
          <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-label-medium-size)", fontWeight: "var(--mx-weight-semibold)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mx-color-text-tertiary)" }}>
            {title}
          </div>
          {description && (
            <div style={{ marginTop: "var(--mx-space-4)", fontSize: "var(--mx-text-body-small-size)", lineHeight: "var(--mx-text-body-small-line)", color: "var(--mx-color-text-tertiary)" }}>
              {description}
            </div>
          )}
        </div>
      )}
      <div style={{ background: "var(--mx-color-surface-card)", border: "var(--mx-border-default)", borderRadius: "var(--mx-radius-lg)", overflow: "hidden" }}>
        {React.Children.toArray(children).map((child, i, arr) => (
          <React.Fragment key={i}>
            {child}
            {i < arr.length - 1 && (
              <div style={{ height: 1, background: "var(--mx-color-divider-default)", margin: "0 var(--mx-space-16)" }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
