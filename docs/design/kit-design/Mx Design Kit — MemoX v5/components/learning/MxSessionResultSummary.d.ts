import * as React from "react";

interface MxResultStat { label: React.ReactNode; value: React.ReactNode; tone?: "correct" | "wrong" | "active" | "due"; }

/**
 * End-of-session summary. Read-only — never activates cards or schedules SRS.
 * @startingPoint section="Learning" subtitle="New Learning / SRS Repeat result summary" viewport="700x420"
 */
export interface MxSessionResultSummaryProps {
  type?: "newLearning" | "srsRepeat";
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  stats?: MxResultStat[];
  style?: React.CSSProperties;
}
export function MxSessionResultSummary(props: MxSessionResultSummaryProps): React.JSX.Element;
