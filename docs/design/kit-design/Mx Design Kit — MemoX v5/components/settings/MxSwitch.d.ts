import * as React from "react";

/** On/off toggle for settings rows. */
export interface MxSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  style?: React.CSSProperties;
}
export function MxSwitch(props: MxSwitchProps): React.JSX.Element;
