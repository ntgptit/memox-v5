import * as React from "react";

/** A choice in guessMode. Correct/wrong pair colour with a status glyph. */
export interface MxAnswerOptionProps {
  children: React.ReactNode;
  state?: "default" | "selected" | "correct" | "wrong" | "disabled";
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxAnswerOption(props: MxAnswerOptionProps): React.JSX.Element;
