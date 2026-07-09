import * as React from "react";

interface MxWeekday { key: string; label: React.ReactNode; selected?: boolean; }

/** One reminder: time + weekday chips + enable switch + delete. */
export interface MxReminderRowProps {
  time?: string;
  weekdays?: MxWeekday[];
  enabled?: boolean;
  invalid?: boolean;
  onToggleWeekday?: (key: string) => void;
  onToggleEnabled?: (next: boolean) => void;
  onDelete?: () => void;
  onEditTime?: () => void;
  style?: React.CSSProperties;
}
export function MxReminderRow(props: MxReminderRowProps): React.JSX.Element;
