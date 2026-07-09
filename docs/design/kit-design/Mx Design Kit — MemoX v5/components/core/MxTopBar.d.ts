import * as React from "react";

/** The screen header primitive. */
export interface MxTopBarProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Leading slot — usually a back/close MxIconButton. */
  leading?: React.ReactNode;
  /** Trailing action slot — MxIconButtons. */
  actions?: React.ReactNode;
  variant?: "default" | "study" | "settings";
  sticky?: boolean;
  style?: React.CSSProperties;
}

export function MxTopBar(props: MxTopBarProps): React.JSX.Element;
