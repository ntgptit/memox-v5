import * as React from "react";

/**
 * Deck card-list building blocks for MemoX mockup screens, exposed at runtime on
 * `window.MxDeckList` by `_shared/deck-card-list.jsx` (loaded via
 * <script type="text/babel">). A self-contained composite: given a deck array +
 * an i18n dictionary it renders the whole subdeck list (ring · title · status ·
 * play) plus its header controls.
 */

/** A deck / subdeck row datum. */
export interface Deck {
  name: string;
  /** total word count. */
  words: number;
  /** mastery percentage, 0–100. */
  progress: number;
  /** cards currently due. */
  due: number;
  /** new (pre-SRS) cards. */
  newc: number;
  /** render as non-interactive (also implied when `words === 0`). */
  disabled?: boolean;
}

/** i18n content dictionary the list components read from. */
export interface DeckListText {
  search: string;
  dir: string;
  sort: string;
  newDeck: string;
  addCard: string;
  words(n: number): string;
  subdecks(n: number, w: number): string;
  results(n: number, q: string): string;
}

/** Named layout constants (no scattered magic numbers) shared by the blocks. */
export interface DeckListLayout {
  ringSize: number;
  playSize: number;
  playIcon: number;
  cardMinH: number;
  gapRingContent: number;
  gapContentPlay: number;
  gapTitleMeta: number;
  searchH: number;
  filterH: number;
  primaryBtnH: number;
}

export type DeckStatusKind = "due" | "new" | "done" | "empty";

export const L: DeckListLayout;
export const EN: DeckListText;
export const VI: DeckListText;
export const STATUS: Record<DeckStatusKind, { bg: string; fg: string; icon: string | null }>;

/** Lucide icon wrapper (private copy — see kit-helpers for the shared one). */
export function Ic(props: { n: string; s?: number }): React.JSX.Element;
/** Thousands-grouped integer (en-US). */
export function fmt(n: number): string;
/** Progress ring showing mastery %; lower visual weight than the play button. */
export function Ring(props: { p: number; size?: number }): React.JSX.Element;
/** Semantic status pill at exactly 24px (token-only; MxBadge is fixed at 20px). */
export function StatusChip(props: { kind: DeckStatusKind; children: React.ReactNode }): React.JSX.Element;
/** Picks the right StatusChip for a deck (new / due / empty / up-to-date). */
export function DueBadge(props: { d: Deck }): React.JSX.Element;
/** A deck row: [ring · title+meta · play]. */
export function DeckRow(props: { d: Deck; pressed?: boolean; t?: DeckListText }): React.JSX.Element;
/** A 40px filter capsule. */
export function Chip(props: {
  selected?: boolean;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
  label?: string;
}): React.JSX.Element;
/** The 48px search field (elevated surface). */
export function SearchField(props: { value?: string; focused?: boolean; t?: DeckListText }): React.JSX.Element;
/** Header control area: search → direction (read-only) + sort chips. */
export function ControlArea(props: { query?: string; focused?: boolean; t?: DeckListText }): React.JSX.Element;
/** The reusable card list (16px gutter, 12px item gap). */
export function DeckList(props: { items: Deck[]; t?: DeckListText }): React.JSX.Element;

/** Shape of the `window.MxDeckList` global bag. */
export interface MxDeckList {
  L: DeckListLayout;
  EN: DeckListText;
  VI: DeckListText;
  Ic: typeof Ic;
  fmt: typeof fmt;
  Ring: typeof Ring;
  STATUS: typeof STATUS;
  StatusChip: typeof StatusChip;
  DueBadge: typeof DueBadge;
  DeckRow: typeof DeckRow;
  Chip: typeof Chip;
  SearchField: typeof SearchField;
  ControlArea: typeof ControlArea;
  DeckList: typeof DeckList;
}
