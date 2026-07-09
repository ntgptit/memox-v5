import React from "react";

/**
 * MxActionButton — the single button primitive for MemoX. Every tappable
 * text action in the app is an MxActionButton variant; screens never hand-roll
 * a button style. Consumes only Mx tokens, so it is correct in dark + light.
 */
export function MxActionButton({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const heights = {
    small: "var(--mx-size-button-height-compact)",
    medium: "var(--mx-size-button-height)",
    bottom: "var(--mx-size-button-height-bottom)",
  };

  const palette = {
    primary: {
      bg: "var(--mx-color-action-primary)",
      color: "var(--mx-color-text-onAction)",
      border: "1px solid transparent",
    },
    secondary: {
      bg: "var(--mx-color-action-secondary)",
      color: "var(--mx-color-action-primary)",
      border: "1px solid transparent",
    },
    ghost: {
      bg: "var(--mx-color-action-ghost)",
      color: "var(--mx-color-action-primary)",
      border: "1px solid transparent",
    },
    destructive: {
      bg: "var(--mx-color-destructive-surface)",
      color: "var(--mx-color-destructive-text)",
      border: "var(--mx-border-destructive)",
    },
  }[variant];

  const isDisabled = disabled || loading;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    height: heights[size],
    padding: size === "small" ? "0 var(--mx-space-16)" : "0 var(--mx-space-24)",
    width: fullWidth ? "100%" : "auto",
    borderRadius: "var(--mx-radius-pill)",
    fontFamily: "var(--mx-font-display)",
    fontSize: "var(--mx-text-button-size)",
    lineHeight: "var(--mx-text-button-line)",
    fontWeight: "var(--mx-text-button-weight)",
    letterSpacing: "var(--mx-text-button-tracking)",
    whiteSpace: "nowrap",
    background: isDisabled
      ? "var(--mx-color-action-primaryDisabled)"
      : palette.bg,
    color: isDisabled ? "var(--mx-color-text-disabled)" : palette.color,
    border: isDisabled ? "1px solid transparent" : palette.border,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: loading ? 0.85 : 1,
    transition:
      "background var(--mx-motion-fast) var(--mx-ease-standard), transform var(--mx-motion-fast) var(--mx-ease-standard)",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    ...style,
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={base}
      aria-busy={loading || undefined}
      onPointerDown={(e) => {
        if (!isDisabled) e.currentTarget.style.transform = "scale(0.98)";
      }}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {loading && <MxSpinner />}
      {!loading && leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}

function MxSpinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        display: "inline-block",
        animation: "mx-spin 0.7s linear infinite",
      }}
    />
  );
}
