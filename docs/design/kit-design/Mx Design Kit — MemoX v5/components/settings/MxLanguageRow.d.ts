import * as React from "react";

/** Row in the Native Language Picker. Icon is a visual hint, never the id. */
export interface MxLanguageRowProps {
  nativeName: React.ReactNode;
  secondaryName?: React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxLanguageRow(props: MxLanguageRowProps): React.JSX.Element;
