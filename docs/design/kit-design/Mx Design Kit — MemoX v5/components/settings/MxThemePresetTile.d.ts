import * as React from "react";

interface MxThemePreview { bg: string; surface: string; accent: string; }

/** Selectable appearance preset (day/night theme or app-icon variant). */
export interface MxThemePresetTileProps {
  name: React.ReactNode;
  /** Preview colours, or a custom preview node. */
  preview: MxThemePreview | React.ReactNode;
  selected?: boolean;
  unavailable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MxThemePresetTile(props: MxThemePresetTileProps): React.JSX.Element;
