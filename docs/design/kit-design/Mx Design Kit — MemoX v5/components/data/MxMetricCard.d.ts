import * as React from "react";

/**
 * A labelled stat tile. Numbers are always real, finalized data.
 * @startingPoint section="Data" subtitle="Metric tile with value / unit / delta" viewport="700x160"
 */
export interface MxMetricCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** Signed change; positive = correct tone, negative = wrong tone. */
  delta?: number;
  tone?: "neutral" | "word" | "time" | "correct" | "wrong";
  style?: React.CSSProperties;
}
export function MxMetricCard(props: MxMetricCardProps): React.JSX.Element;
