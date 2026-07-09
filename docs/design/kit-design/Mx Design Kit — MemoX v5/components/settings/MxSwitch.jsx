import React from "react";

/**
 * MxSwitch — the on/off toggle used inside settings rows. Token-driven so the
 * "on" state reads as the primary action colour in both themes.
 */
export function MxSwitch({ checked = false, disabled = false, onChange, label, style }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        width: 46,
        height: 28,
        flex: "0 0 auto",
        borderRadius: "var(--mx-radius-pill)",
        border: "none",
        padding: 3,
        background: checked ? "var(--mx-color-action-primary)" : "var(--mx-color-border-strong)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        display: "flex",
        ...style,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          transform: checked ? "translateX(18px)" : "translateX(0)",
          transition: "transform var(--mx-motion-fast) var(--mx-ease-standard)",
        }}
      />
    </button>
  );
}
