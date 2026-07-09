import * as React from "react";

/** fillMode panel (SRS activation gate): Hint + Check, idle/correct/wrong. */
export interface MxFillInputPanelProps {
  value?: string;
  onChange?: (value: string) => void;
  state?: "idle" | "correct" | "wrong";
  /** Correct answer, shown on wrong to explain the difference. */
  expected?: React.ReactNode;
  onHint?: () => void;
  onCheck?: () => void;
  onRetry?: () => void;
  style?: React.CSSProperties;
}
export function MxFillInputPanel(props: MxFillInputPanelProps): React.JSX.Element;
