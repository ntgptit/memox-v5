import * as React from "react";

/** Square, icon-only tap target (≥44px). `label` is required for a11y. */
export interface MxIconButtonProps {
  icon: React.ReactNode;
  /** Accessible name — applied as aria-label + title. Required. */
  label: string;
  variant?: "ghost" | "surface" | "destructive";
  size?: "small" | "medium";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function MxIconButton(props: MxIconButtonProps): React.JSX.Element;
