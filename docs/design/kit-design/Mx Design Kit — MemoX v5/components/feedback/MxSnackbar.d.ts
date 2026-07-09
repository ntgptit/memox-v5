import * as React from "react";

/** Transient bottom toast with optional single action. */
export interface MxSnackbarProps {
  tone?: "success" | "error" | "warning" | "info";
  children: React.ReactNode;
  action?: React.ReactNode;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export function MxSnackbar(props: MxSnackbarProps): React.JSX.Element;
