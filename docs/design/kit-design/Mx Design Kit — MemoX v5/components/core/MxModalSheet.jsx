import React from "react";

/**
 * MxModalSheet — bottom sheet primitive (Play Menu, Repeat Mode Menu, Sort
 * Menu, pickers). Rounded top, grab handle, title + close, scrollable content,
 * optional sticky action row. Scrim closes on tap. `destructive` tints the
 * action row for confirm-style sheets. Overlay + sheet sit at the modal layer.
 */
export function MxModalSheet({
  open = true,
  title,
  onClose,
  children,
  actions = null,
  style,
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: "var(--mx-layer-modal)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "var(--mx-color-overlay-scrim)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%",
          maxHeight: "var(--mx-size-sheet-max-height)",
          display: "flex",
          flexDirection: "column",
          background: "var(--mx-color-surface-modal)",
          borderTopLeftRadius: "var(--mx-radius-xl)",
          borderTopRightRadius: "var(--mx-radius-xl)",
          borderTop: "var(--mx-border-subtle)",
          boxShadow: "var(--mx-elevation-sheet)",
          ...style,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "var(--mx-space-8) 0 var(--mx-space-4)" }}>
          <span aria-hidden="true" style={{ width: 36, height: 4, borderRadius: 999, background: "var(--mx-color-border-strong)" }} />
        </div>
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--mx-space-8) var(--mx-space-20) var(--mx-space-12)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--mx-font-display)",
                fontSize: "var(--mx-text-title-medium-size)",
                lineHeight: "var(--mx-text-title-medium-line)",
                fontWeight: "var(--mx-weight-bold)",
                color: "var(--mx-color-text-primary)",
              }}
            >
              {title}
            </h2>
            {onClose && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                style={{
                  width: "var(--mx-size-touch-target)",
                  height: "var(--mx-size-touch-target)",
                  marginRight: "calc(-1 * var(--mx-space-8))",
                  border: "none",
                  background: "transparent",
                  color: "var(--mx-color-text-secondary)",
                  fontSize: 22,
                  cursor: "pointer",
                  borderRadius: "var(--mx-radius-full)",
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        <div
          style={{
            overflowY: "auto",
            padding: "0 var(--mx-space-20) var(--mx-space-16)",
          }}
        >
          {children}
        </div>
        {actions && (
          <div
            style={{
              display: "flex",
              gap: "var(--mx-space-12)",
              padding: "var(--mx-space-12) var(--mx-space-20)",
              paddingBottom: "calc(var(--mx-space-20) + env(safe-area-inset-bottom, 0px))",
              borderTop: "var(--mx-divider-default)",
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
