import * as React from "react";

/**
 * The surface container primitive. `state` drives feedback outlines while
 * keeping the base surface — selection is never confused with correctness.
 * @startingPoint section="Core" subtitle="Surface container with selection / correct / wrong states" viewport="700x220"
 */
export interface MxCardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive";
  state?: "none" | "selected" | "correct" | "wrong" | "disabled";
  /** Padding token number, e.g. "12" | "16" | "20". @default "16" */
  padding?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function MxCard(props: MxCardProps): React.JSX.Element;
