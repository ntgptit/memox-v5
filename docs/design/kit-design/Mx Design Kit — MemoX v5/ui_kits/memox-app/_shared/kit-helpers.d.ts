import * as React from "react";

/**
 * Shared atoms for MemoX mockup screens, exposed at runtime on `window.MxKit`
 * by `_shared/kit-helpers.jsx` (loaded via <script type="text/babel">). These
 * are the small primitives every screen used to re-declare — kept here once.
 */

/** Lucide icon wrapper — renders `<i data-lucide={n}>` at `s`×`s` px (lucide swaps it for an `<svg>`). */
export interface IcProps {
  /** lucide icon name (must exist in lucide 0.454.0). */
  n: string;
  /** square size in px. Default 20. */
  s?: number;
}
export function Ic(props: IcProps): React.JSX.Element;

/** Skeleton block — a loading placeholder on the neutral loading surface. */
export interface SkelProps {
  /** width (px number or CSS length). */
  w: number | string;
  /** height (px number or CSS length). */
  h: number | string;
  /** border radius; defaults to `var(--mx-radius-md)`. */
  r?: number | string;
}
export function Skel(props: SkelProps): React.JSX.Element;

/** Thousands-grouped integer (en-US), e.g. `1234` → `"1,234"`. */
export function fmt(n: number): string;

/** Shape of the `window.MxKit` global bag. */
export interface MxKit {
  Ic: typeof Ic;
  Skel: typeof Skel;
  fmt: typeof fmt;
}
