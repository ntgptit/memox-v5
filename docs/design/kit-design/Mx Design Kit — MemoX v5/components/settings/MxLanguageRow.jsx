import React from "react";

/**
 * MxLanguageRow — a row in the Native Language Picker. Optional flag/icon
 * (visual hint ONLY, never the identifier — text always shows), native name +
 * secondary/script name, and a clear selected state. Text-only fallback when
 * no icon is available.
 */
export function MxLanguageRow({
  nativeName,
  secondaryName = null,
  icon = null, // visual hint only
  selected = false,
  onClick,
  style,
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-12)",
        minHeight: "var(--mx-size-list-row-height-two-line)",
        padding: "var(--mx-space-10, 10px) var(--mx-space-16)",
        cursor: "pointer",
        transition: "background var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
      onPointerEnter={(e) => (e.currentTarget.style.background = "var(--mx-color-state-loadingSurface)")}
      onPointerLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          flex: "0 0 auto",
          borderRadius: "var(--mx-radius-full)",
          background: "var(--mx-color-state-loadingSurface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "var(--mx-color-text-secondary)",
        }}
      >
        {icon || nativeName?.[0]}
      </span>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-body-large-size)", fontWeight: "var(--mx-weight-medium)", color: "var(--mx-color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {nativeName}
        </div>
        {secondaryName && (
          <div style={{ fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {secondaryName}
          </div>
        )}
      </div>
      {selected && (
        <span style={{ flex: "0 0 auto", display: "flex", color: "var(--mx-color-action-primary)" }}>
          <i data-lucide="check" style={{ width: 22, height: 22 }}></i>
        </span>
      )}
    </div>
  );
}
