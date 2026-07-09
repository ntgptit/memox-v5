import * as React from "react";

type MxTabOption = string | { value: string; label: React.ReactNode };

/** Underline filter tabs (All / Books / Poems). Controlled. Scrolls on overflow. */
export interface MxTabsProps {
  options: MxTabOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export function MxTabs(props: MxTabsProps): React.JSX.Element;
