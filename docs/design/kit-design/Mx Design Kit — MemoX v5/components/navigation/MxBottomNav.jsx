import React from "react";

/**
 * MxBottomNav — the fixed bottom tab bar (Bazar's Home / Category / Cart /
 * Profile). Each item is an icon + label; the active item is purple. Icons are
 * Lucide glyph names rendered via <i data-lucide>. Controlled via `value` +
 * `onChange`. Respects the Android gesture / safe-area inset.
 */
export function MxBottomNav({ items, value, onChange, style }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "var(--mx-color-surface-base)",
        borderTop: "var(--mx-border-subtle)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        ...style,
      }}
    >
      {items.map((it) => {
        const active = it.key === value;
        const color = active ? "var(--mx-color-action-primary)" : "var(--mx-color-text-tertiary)";
        return (
          <button
            key={it.key}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onChange && onChange(it.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "var(--mx-space-8) 0 var(--mx-space-6)",
              minHeight: "var(--mx-size-touch-target)",
              border: "none",
              background: "transparent",
              color,
              cursor: "pointer",
            }}
          >
            <i data-lucide={it.icon} style={{ width: 22, height: 22 }}></i>
            <span style={{ fontFamily: "var(--mx-font-display)", fontSize: 11, fontWeight: active ? 700 : 500, color }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
