import * as React from "react";

/** Status pill for SRS lifecycle, due workload, and generic states. */
export interface MxBadgeProps {
  children: React.ReactNode;
  tone?:
    | "neutral"
    | "preSrs"
    | "active"
    | "due"
    | "noDue"
    | "mastered"
    | "lapse"
    | "correct"
    | "wrong"
    | "info";
  size?: "small" | "medium";
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function MxBadge(props: MxBadgeProps): React.JSX.Element;
