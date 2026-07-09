import * as React from "react";

interface MxBottomNavItem { key: string; label: React.ReactNode; icon: string; }

/** Fixed bottom tab bar. `icon` is a Lucide glyph name. Controlled. */
export interface MxBottomNavProps {
  items: MxBottomNavItem[];
  value: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}
export function MxBottomNav(props: MxBottomNavProps): React.JSX.Element;
