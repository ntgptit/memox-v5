import * as React from "react";

/**
 * Bazar-style section / screen header. `size="hero"` = eyebrow + large purple
 * heading; default = bold title + "See all" action.
 * @startingPoint section="Navigation" subtitle="Section header with See all + hero intro" viewport="700x160"
 */
export interface MxSectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  size?: "default" | "hero";
  style?: React.CSSProperties;
}
export function MxSectionHeader(props: MxSectionHeaderProps): React.JSX.Element;
