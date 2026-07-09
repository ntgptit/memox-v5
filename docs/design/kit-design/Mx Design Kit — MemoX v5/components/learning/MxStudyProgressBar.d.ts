import * as React from "react";

/** Session/mode progress. Labelled as MODE progress, never SRS mastery. */
export interface MxStudyProgressBarProps {
  /** 0–100. */
  percent?: number;
  /** e.g. "3 / 12". */
  stepLabel?: React.ReactNode;
  /** e.g. "Fill". */
  modeLabel?: React.ReactNode;
  style?: React.CSSProperties;
}
export function MxStudyProgressBar(props: MxStudyProgressBarProps): React.JSX.Element;
