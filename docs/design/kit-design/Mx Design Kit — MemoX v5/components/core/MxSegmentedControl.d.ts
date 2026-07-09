import * as React from "react";

type MxSegmentOption = string | { value: string; label: React.ReactNode; disabled?: boolean };

/** Pill-track tab switcher (Statistics tabs, filter toggles). Controlled. */
export interface MxSegmentedControlProps {
  options: MxSegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function MxSegmentedControl(props: MxSegmentedControlProps): React.JSX.Element;
