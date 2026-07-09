import * as React from "react";

interface MxChartSeries { name: React.ReactNode; tone: "word" | "time" | "correct" | "wrong" | "neutral"; points: number[]; }

/**
 * Long-term Statistics chart. Real data only; empty → friendly empty state.
 * @startingPoint section="Data" subtitle="Per-day multi-series stats chart panel" viewport="700x300"
 */
export interface MxStatsChartPanelProps {
  title?: React.ReactNode;
  legend?: boolean;
  series?: MxChartSeries[];
  xLabels?: React.ReactNode[];
  height?: number;
  /** Force the no-data empty state. */
  empty?: boolean;
  style?: React.CSSProperties;
}
export function MxStatsChartPanel(props: MxStatsChartPanelProps): React.JSX.Element;
