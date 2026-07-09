import * as React from "react";

/** Circular avatar; shows `src` image or initials from `name`. */
export interface MxAvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  style?: React.CSSProperties;
}
export function MxAvatar(props: MxAvatarProps): React.JSX.Element;
