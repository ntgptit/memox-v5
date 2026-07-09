import * as React from "react";

/**
 * The central prompt/answer study surface. Korean prompt + Vietnamese meaning.
 * @startingPoint section="Learning" subtitle="Prompt / answer study card with audio" viewport="700x360"
 */
export interface MxStudyCardProps {
  prompt?: React.ReactNode;
  meaning?: React.ReactNode;
  note?: React.ReactNode;
  variant?: "prompt" | "answer" | "both";
  /** Audio action; renders a labelled speaker button when provided. */
  onAudio?: () => void;
  style?: React.CSSProperties;
}
export function MxStudyCard(props: MxStudyCardProps): React.JSX.Element;
