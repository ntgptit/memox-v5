import React from "react";

/**
 * MxTabs — underline filter tabs (Bazar's All / Books / Poems pattern). Active
 * tab is bold with a purple underline; inactive is grey. Controlled via `value`
 * + `onChange`. Horizontally scrollable when the set overflows. This is the
 * flat-content filter counterpart to MxSegmentedControl (which is a pill track).
 */
export function MxTabs({ options, value, onChange, style }) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: "var(--mx-space-24)",
        borderBottom: "var(--mx-border-subtle)",
        overflowX: "auto",
        scrollbarWidth: "none",
        ...style,
      }}
    >
      {options.map((o) => {
        const key = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const selected = key === value;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange && onChange(key)}
            style={{
              position: "relative",
              flex: "0 0 auto",
              border: "none",
              background: "transparent",
              padding: "0 0 var(--mx-space-8)",
              cursor: "pointer",
              fontFamily: "var(--mx-font-display)",
              fontSize: "var(--mx-text-label-large-size)",
              fontWeight: selected ? 700 : 500,
              color: selected ? "var(--mx-color-text-primary)" : "var(--mx-color-text-tertiary)",
              whiteSpace: "nowrap",
              transition: "color var(--mx-motion-fast) var(--mx-ease-standard)",
            }}
          >
            {label}
            {selected && (
              <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2.5, borderRadius: 3, background: "var(--mx-color-action-primary)" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
