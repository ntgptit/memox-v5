import React from "react";

/**
 * MxConfirmDialog — centred confirmation dialog. `variant` scales the risk
 * signal: normal, destructive (delete), high-risk (restore/cloud-sync — extra
 * warning callout). High-risk actions must never look like a normal confirm.
 * Sits at the dialog layer, above sheets.
 */
export function MxConfirmDialog({
  open = true,
  variant = "normal", // normal | destructive | highRisk
  title,
  message,
  warning = null, // extra warning line for high-risk
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  style,
}) {
  if (!open) return null;
  const isDestructive = variant === "destructive" || variant === "highRisk";

  return (
    <div
      onClick={onCancel}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: "var(--mx-layer-dialog)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--mx-space-24)",
        background: "var(--mx-color-overlay-scrim)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        style={{
          width: "100%",
          maxWidth: "var(--mx-size-modal-width)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--mx-space-16)",
          padding: "var(--mx-space-24)",
          background: "var(--mx-color-surface-modal)",
          border: "var(--mx-border-default)",
          borderRadius: "var(--mx-radius-xl)",
          boxShadow: "var(--mx-elevation-modal)",
          ...style,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--mx-space-8)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--mx-space-8)" }}>
            {isDestructive && (
              <span style={{ display: "flex", color: "var(--mx-color-destructive-text)" }}>
                <i data-lucide={variant === "highRisk" ? "shield-alert" : "alert-triangle"} style={{ width: 22, height: 22 }}></i>
              </span>
            )}
            <h2 style={{ margin: 0, fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-title-medium-size)", lineHeight: "var(--mx-text-title-medium-line)", fontWeight: 700, color: "var(--mx-color-text-primary)" }}>
              {title}
            </h2>
          </div>
          {message && (
            <p style={{ margin: 0, fontSize: "var(--mx-text-body-medium-size)", lineHeight: "var(--mx-text-body-medium-line)", color: "var(--mx-color-text-secondary)", textWrap: "pretty" }}>
              {message}
            </p>
          )}
        </div>

        {(warning || variant === "highRisk") && (
          <div style={{ display: "flex", gap: "var(--mx-space-8)", padding: "var(--mx-space-12)", background: "var(--mx-color-feedback-warningSurface)", border: "1px solid var(--mx-color-feedback-warning)", borderRadius: "var(--mx-radius-md)" }}>
            <span style={{ flex: "0 0 auto", color: "var(--mx-color-feedback-warning)", display: "flex", marginTop: 1 }}>
              <i data-lucide="alert-triangle" style={{ width: 16, height: 16 }}></i>
            </span>
            <span style={{ fontSize: "var(--mx-text-body-small-size)", lineHeight: "var(--mx-text-body-small-line)", color: "var(--mx-color-text-secondary)", textWrap: "pretty" }}>
              {warning || "This is a high-risk action that may overwrite your data. Make sure you have a backup."}
            </span>
          </div>
        )}

        <div style={{ display: "flex", gap: "var(--mx-space-12)", marginTop: "var(--mx-space-4)" }}>
          <button type="button" onClick={onCancel} style={dlgBtn("cancel")}>{cancelLabel}</button>
          <button type="button" onClick={onConfirm} style={dlgBtn(isDestructive ? "destructive" : "primary")}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function dlgBtn(kind) {
  const base = {
    flex: 1,
    height: "var(--mx-size-button-height)",
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer",
  };
  if (kind === "cancel")
    return { ...base, background: "var(--mx-color-action-secondary)", color: "var(--mx-color-text-primary)", border: "var(--mx-border-default)" };
  if (kind === "destructive")
    return { ...base, background: "var(--mx-color-destructive-text)", color: "var(--mx-color-text-onDestructive)", border: "none" };
  return { ...base, background: "var(--mx-color-action-primary)", color: "var(--mx-color-text-onAction)", border: "none" };
}
