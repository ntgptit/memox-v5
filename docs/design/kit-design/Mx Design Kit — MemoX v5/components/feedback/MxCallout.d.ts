import * as React from "react";

/** Inline context banner. No-due is calm/positive, never an error. */
export interface MxCalloutProps {
  tone?: "info" | "warning" | "destructive" | "noDue" | "unavailable";
  title?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}
export function MxCallout(props: MxCalloutProps): React.JSX.Element;
