import * as React from "react";

/**
 * The one button primitive for MemoX. All text actions are variants of this.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / destructive actions" viewport="700x260"
 */
export interface MxActionButtonProps {
  children: React.ReactNode;
  /** Visual role. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  /** Height preset. "bottom" = large sticky CTA. @default "medium" */
  size?: "small" | "medium" | "bottom";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Shows a spinner and blocks taps. @default false */
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export function MxActionButton(props: MxActionButtonProps): React.JSX.Element;
