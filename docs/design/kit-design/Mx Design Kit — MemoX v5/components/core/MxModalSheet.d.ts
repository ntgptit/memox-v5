import * as React from "react";

/** Bottom sheet primitive (Play Menu, Repeat Mode Menu, pickers). */
export interface MxModalSheetProps {
  open?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
  /** Sticky action row at the bottom. */
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export function MxModalSheet(props: MxModalSheetProps): React.JSX.Element;
