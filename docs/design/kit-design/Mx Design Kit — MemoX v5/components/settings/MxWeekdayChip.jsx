import React from "react";

/**
 * MxWeekdayChip — a selectable weekday pill for Reminder Settings. Selected /
 * unselected / disabled. Selection is shown by fill + weight, not colour alone.
 */
export function MxWeekdayChip({ label, selected = false, disabled = false, onClick, style }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => !disabled && onClick && onClick()}
      style={{
        minWidth: 40,
        height: "var(--mx-size-chip-height)",
        padding: "0 var(--mx-space-8)",
        borderRadius: "var(--mx-radius-pill)",
        border: selected ? "1.5px solid transparent" : "var(--mx-border-default)",
        background: selected ? "var(--mx-color-action-primary)" : "transparent",
        color: selected ? "var(--mx-color-text-onAction)" : disabled ? "var(--mx-color-text-disabled)" : "var(--mx-color-text-secondary)",
        font: `${selected ? "var(--mx-weight-semibold)" : "var(--mx-weight-medium)"} var(--mx-text-label-medium-size)/1 var(--mx-font-display)`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
