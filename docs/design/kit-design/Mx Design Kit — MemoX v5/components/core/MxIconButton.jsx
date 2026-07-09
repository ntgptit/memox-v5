import React from "react";

/**
 * MxIconButton — a square, icon-only tap target (≥44px). Used for top-bar
 * actions, audio, close, more, delete. Because icon-only actions lose meaning,
 * `label` is REQUIRED and applied as aria-label (accessibility rule).
 */
export function MxIconButton({
  icon,
  label,
  variant = "ghost",
  size = "medium",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const dim = size === "small" ? 36 : "var(--mx-size-touch-target)";

  const palette = {
    ghost: { bg: "transparent", color: "var(--mx-color-text-secondary)" },
    surface: {
      bg: "var(--mx-color-surface-elevated)",
      color: "var(--mx-color-text-primary)",
    },
    destructive: {
      bg: "transparent",
      color: "var(--mx-color-destructive-text)",
    },
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        flex: "0 0 auto",
        borderRadius: "var(--mx-radius-full)",
        border: "none",
        background: palette.bg,
        color: disabled ? "var(--mx-color-text-disabled)" : palette.color,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onPointerEnter={(e) => {
        if (!disabled && variant === "ghost")
          e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)";
      }}
      onPointerLeave={(e) => {
        if (variant === "ghost") e.currentTarget.style.background = "transparent";
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}
