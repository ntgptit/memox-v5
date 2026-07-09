import * as React from "react";

/** Selectable weekday pill for Reminder Settings. */
export interface MxWeekdayChipProps {
  label: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxWeekdayChip(props: MxWeekdayChipProps): React.JSX.Element;
