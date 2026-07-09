import React from "react";

/**
 * MxSegmentedControl — a pill-track tab switcher (Statistics tabs Words/Time/
 * Quality, filter toggles). Controlled: pass `value` + `onChange`. Options
 * can be disabled. Selected segment uses an elevated surface, never a raw hue.
 */
export function MxSegmentedControl({ options, value, onChange, style }) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: "var(--mx-space-2)",
        padding: "var(--mx-space-4)",
        background: "var(--mx-color-surface-base)",
        border: "var(--mx-border-subtle)",
        borderRadius: "var(--mx-radius-pill)",
        ...style,
      }}
    >
      {options.map((opt) => {
        const key = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const disabled = typeof opt === "object" && opt.disabled;
        const selected = key === value;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={selected}
            disabled={disabled}
            onClick={() => !disabled && onChange && onChange(key)}
            style={{
              flex: 1,
              height: 34,
              border: "none",
              borderRadius: "var(--mx-radius-pill)",
              background: selected ? "var(--mx-color-surface-elevated)" : "transparent",
              boxShadow: selected ? "var(--mx-elevation-low)" : "none",
              color: disabled
                ? "var(--mx-color-text-disabled)"
                : selected
                ? "var(--mx-color-text-primary)"
                : "var(--mx-color-text-secondary)",
              fontFamily: "var(--mx-font-display)",
              fontSize: "var(--mx-text-label-large-size)",
              fontWeight: selected ? "var(--mx-weight-semibold)" : "var(--mx-weight-medium)",
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
              whiteSpace: "nowrap",
              padding: "0 var(--mx-space-12)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
