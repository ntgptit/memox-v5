import * as React from "react";

/**
 * Confirmation dialog. High-risk never looks like a normal confirm.
 * @startingPoint section="Feedback" subtitle="Normal / destructive / high-risk confirm dialog" viewport="700x420"
 */
export interface MxConfirmDialogProps {
  open?: boolean;
  variant?: "normal" | "destructive" | "highRisk";
  title: React.ReactNode;
  message?: React.ReactNode;
  /** Extra warning line (auto-shown for highRisk). */
  warning?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: React.CSSProperties;
}
export function MxConfirmDialog(props: MxConfirmDialogProps): React.JSX.Element;
