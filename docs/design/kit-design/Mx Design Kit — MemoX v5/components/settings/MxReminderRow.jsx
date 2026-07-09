import React from "react";
import { MxWeekdayChip } from "./MxWeekdayChip.jsx";

/**
 * MxReminderRow — one reminder in Reminder Settings: a time, a row of weekday
 * chips, an enable switch, and a delete action. Invalid state (no weekday
 * selected) is surfaced inline. Reminders never start a session or mutate data.
 */
export function MxReminderRow({
  time = "13:00",
  weekdays = [], // array of { label, key, selected }
  enabled = true,
  invalid = false,
  onToggleWeekday,
  onToggleEnabled,
  onDelete,
  onEditTime,
  style,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-16)",
        background: "var(--mx-color-surface-card)",
        border: invalid ? "var(--mx-border-wrong)" : "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-lg)",
        opacity: enabled ? 1 : 0.6,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--mx-space-12)" }}>
        <button
          type="button"
          onClick={onEditTime}
          aria-label="Edit reminder time"
          className="mx-tabular"
          style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-title-large-size)", fontWeight: 700, color: "var(--mx-color-text-primary)", letterSpacing: "-0.01em" }}
        >
          {time}
        </button>
        <div style={{ flex: 1 }} />
        <button type="button" role="switch" aria-checked={enabled} aria-label="Toggle reminder" onClick={() => onToggleEnabled && onToggleEnabled(!enabled)}
          style={{ width: 46, height: 28, borderRadius: 999, border: "none", padding: 3, background: enabled ? "var(--mx-color-action-primary)" : "var(--mx-color-border-strong)", cursor: "pointer", display: "flex" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", transform: enabled ? "translateX(18px)" : "translateX(0)", transition: "transform var(--mx-motion-fast) var(--mx-ease-standard)" }} />
        </button>
        <button type="button" aria-label="Delete reminder" onClick={onDelete}
          style={{ width: "var(--mx-size-touch-target)", height: "var(--mx-size-touch-target)", border: "none", background: "transparent", color: "var(--mx-color-destructive-text)", cursor: "pointer", borderRadius: "var(--mx-radius-full)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "calc(-1 * var(--mx-space-8))" }}>
          <i data-lucide="trash-2" style={{ width: 20, height: 20 }}></i>
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--mx-space-6)" }}>
        {weekdays.map((d) => (
          <MxWeekdayChip key={d.key} label={d.label} selected={d.selected} disabled={!enabled} onClick={() => onToggleWeekday && onToggleWeekday(d.key)} />
        ))}
      </div>

      {invalid && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--mx-space-6)", fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-feedback-wrong)" }}>
          <i data-lucide="alert-circle" style={{ width: 15, height: 15 }}></i>
          Select at least one weekday.
        </div>
      )}
    </div>
  );
}
