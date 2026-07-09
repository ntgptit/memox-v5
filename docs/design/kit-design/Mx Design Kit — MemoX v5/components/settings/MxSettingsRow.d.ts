import * as React from "react";

/**
 * The settings-line primitive. Reflects + navigates; opening never mutates.
 * @startingPoint section="Settings" subtitle="Settings row with value / control / states" viewport="700x220"
 */
export interface MxSettingsRowProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  /** Trailing text value, e.g. "English". */
  value?: React.ReactNode;
  /** Trailing custom control, e.g. an MxSwitch. */
  control?: React.ReactNode;
  tone?: "default" | "destructive";
  disabled?: boolean;
  /** Shows a "Soon" (future/unavailable) affordance and blocks tap. */
  unavailable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxSettingsRow(props: MxSettingsRowProps): React.JSX.Element;
