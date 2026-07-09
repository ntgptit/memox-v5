import * as React from "react";

/** recallMode panel: hidden (20s countdown) → revealed → self-grade. */
export interface MxRecallPanelProps {
  phase?: "hidden" | "revealed";
  /** Live countdown value for the reveal button. */
  seconds?: number;
  meaning?: React.ReactNode;
  onReveal?: () => void;
  onForgot?: () => void;
  onRemembered?: () => void;
  style?: React.CSSProperties;
}
export function MxRecallPanel(props: MxRecallPanelProps): React.JSX.Element;
