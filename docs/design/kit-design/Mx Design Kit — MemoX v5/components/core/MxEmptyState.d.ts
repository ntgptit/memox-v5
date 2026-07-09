import * as React from "react";

/** Calm "nothing here" state. Never styled like an error. */
export interface MxEmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  message?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "neutral" | "positive" | "unavailable";
  style?: React.CSSProperties;
}

export function MxEmptyState(props: MxEmptyStateProps): React.JSX.Element;
