import React from "react";

/**
 * MxListRow — the deck/content list-row primitive. Leading slot (icon/avatar/
 * progress), title + optional subtitle, trailing slot (value, badge, chevron,
 * or play action). Supports disabled + error variants. One row model for Deck
 * Management, Flashcard List, and generic lists.
 */
export function MxListRow({
  title,
  subtitle,
  leading = null,
  trailing = null,
  variant = "default", // default | error
  disabled = false,
  onClick,
  showChevron = false,
  style,
  ...rest
}) {
  const interactive = !!onClick && !disabled;
  const titleColor =
    variant === "error"
      ? "var(--mx-color-feedback-wrong)"
      : disabled
      ? "var(--mx-color-text-disabled)"
      : "var(--mx-color-text-primary)";

  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-12)",
        minHeight: subtitle
          ? "var(--mx-size-list-row-height-two-line)"
          : "var(--mx-size-list-row-height)",
        padding: "var(--mx-space-12) var(--mx-space-16)",
        background: "transparent",
        borderRadius: "var(--mx-radius-md)",
        cursor: interactive ? "pointer" : "default",
        opacity: disabled ? 0.55 : 1,
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
      onPointerEnter={(e) => {
        if (interactive)
          e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)";
      }}
      onPointerLeave={(e) => (e.currentTarget.style.background = "transparent")}
      {...rest}
    >
      {leading && <div style={{ flex: "0 0 auto", display: "flex" }}>{leading}</div>}
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--mx-font-display)",
            fontSize: "var(--mx-text-body-large-size)",
            lineHeight: "var(--mx-text-body-large-line)",
            fontWeight: "var(--mx-weight-semibold)",
            color: titleColor,
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
              fontSize: "var(--mx-text-body-small-size)",
              lineHeight: "var(--mx-text-body-small-line)",
              color: "var(--mx-color-text-tertiary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginTop: "1px",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {trailing && <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "var(--mx-space-8)" }}>{trailing}</div>}
      {showChevron && (
        <span aria-hidden="true" style={{ color: "var(--mx-color-text-tertiary)", flex: "0 0 auto", fontSize: 18 }}>
          ›
        </span>
      )}
    </div>
  );
}
