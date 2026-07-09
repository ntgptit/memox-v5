import * as React from "react";

/** Failure state with retry. Copy must reassure data is preserved. */
export interface MxErrorStateProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  message?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function MxErrorState(props: MxErrorStateProps): React.JSX.Element;
