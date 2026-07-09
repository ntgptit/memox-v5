import * as React from "react";

/** A titled group of settings rows. */
export interface MxSettingsSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function MxSettingsSection(props: MxSettingsSectionProps): React.JSX.Element;
