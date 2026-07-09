import React from "react";

/**
 * MxErrorState — the failure counterpart to MxEmptyState. Load/save/finalize/
 * restore/permission failures. Uses feedback-wrong tint + a retry action.
 * Copy must reassure that user data is preserved (finalize-failed keeps data).
 */
export function MxErrorState({
  icon = null,
  title = "Something went wrong",
  message,
  action = null,
  style,
}) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-40) var(--mx-space-24)",
        ...style,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--mx-radius-full)",
          background: "var(--mx-color-feedback-wrongSurface)",
          color: "var(--mx-color-feedback-wrong)",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {icon || "!"}
      </div>
      <div
        style={{
          fontFamily: "var(--mx-font-display)",
          fontSize: "var(--mx-text-title-medium-size)",
          lineHeight: "var(--mx-text-title-medium-line)",
          fontWeight: "var(--mx-weight-bold)",
          color: "var(--mx-color-text-primary)",
        }}
      >
        {title}
      </div>
      {message && (
        <div
          style={{
            fontSize: "var(--mx-text-body-medium-size)",
            lineHeight: "var(--mx-text-body-medium-line)",
            color: "var(--mx-color-text-secondary)",
            maxWidth: 300,
            textWrap: "pretty",
          }}
        >
          {message}
        </div>
      )}
      {action && <div style={{ marginTop: "var(--mx-space-8)" }}>{action}</div>}
    </div>
  );
}
