import * as React from "react";

/** A tile in matchMode. `side` picks the Korean font for prompt tiles. */
export interface MxMatchTileProps {
  children: React.ReactNode;
  side?: "prompt" | "meaning";
  state?: "default" | "selected" | "correct" | "wrong" | "completed";
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxMatchTile(props: MxMatchTileProps): React.JSX.Element;
