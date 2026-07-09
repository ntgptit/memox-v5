import * as React from "react";

/**
 * The list-row primitive for deck/content lists.
 * @startingPoint section="Core" subtitle="Leading + title/subtitle + trailing list row" viewport="700x200"
 */
export interface MxListRowProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  variant?: "default" | "error";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showChevron?: boolean;
  style?: React.CSSProperties;
}

export function MxListRow(props: MxListRowProps): React.JSX.Element;
