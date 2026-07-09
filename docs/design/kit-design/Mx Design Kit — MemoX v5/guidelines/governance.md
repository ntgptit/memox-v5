# Mx Kit Governance

This kit is the **living source of truth** for MemoX v5 UI style. Its job is to make style drift
difficult. Read this before designing any screen or writing any UI code.

## Core rules

1. **Tokens first.** No raw colours, spacing, radii, shadows, type sizes, or motion values in screens.
   Every value is an `--mx-*` token. If a value you need doesn't exist, **add a token to the kit first**
   (with a semantic name + usage note), then use it.
2. **Components first.** No component is reused across the app unless it exists in the Mx kit. No screen
   creates a custom style instead of using an Mx component/token.
3. **Prefix contract.**
   - Reusable kit components use **`Mx`** (PascalCase): `MxCard`, `MxActionButton`.
   - Tokens use **`mx`** (dot/camel): `mx.color.surface.card` → `--mx-color-surface-card`.
   - **Screen-specific** components must **not** use the `Mx` prefix until promoted. Example: `DeckHeader`
     is screen-specific; if it becomes reusable, promote it to **`MxDeckHeader`** in the kit first.
4. **Dark + light are non-negotiable.** Every semantic token defines both; every component works in both.
   **No** dark-only/light-only duplicate components (never `MxDarkCard` + `MxLightCard`). One component
   consumes theme tokens.
5. **States are explicit.** Components document default / selected / pressed / disabled / loading / error /
   correct / wrong / unavailable as applicable. `selected ≠ correct`; `wrong ≠ destructive`;
   `disabled ≠ unavailable`; `no-due ≠ error`.
6. **Colour is never the only signal.** Correct/wrong/error/destructive pair colour with icon + text.
7. **No hidden destructive actions.** Destructive/high-risk (delete, restore, cloud overwrite) use the
   destructive token **and** the `MxConfirmDialog` confirm pattern. High-risk never looks like a normal
   confirm.
8. **Read-only stays read-only.** Opening Settings/Statistics/Session Result/Review Words never mutates
   learning data. Visual components must not imply mutation on open.
9. **No fake data.** Charts/metrics render only real, finalized data; unknown formulas show an empty/
   blocked state — never placeholder numbers treated as real.
10. **Progress ≠ mastery.** Study progress (`MxStudyProgressBar`) is mode/session progress, never SRS box
    mastery. SRS state is shown by `MxBadge` tones.

## Change process

- **New token** → add under the right `tokens/*.css` file with a semantic name, define **both** dark and
  light values (colour), and add a usage note. Update the relevant specimen card.
- **New reusable component** → add `Name.jsx` + `Name.d.ts` + `Name.prompt.md` in the right group folder,
  cover its states in the group's `*.card.html`, and list it in `readme.md` → Components.
- **Promote a screen component** → rename to `Mx…`, move into the kit, give it a `.d.ts`/prompt/card.
- **Deprecate** → mark the token/component explicitly as deprecated in its file header and `readme.md`;
  don't silently remove.
- Screens must reference kit component names; implementation agents map
  **screen element → Mx component → mx token**.

## Do

- Use semantic `mx` tokens; reuse `Mx` components; document states.
- Support long Korean/Vietnamese text (wrap, don't shrink).
- Separate read-only from mutating actions.
- Use the `Mx`/`mx` prefix consistently for common assets.
- Define dark and light behavior together.

## Don't

- Use random/raw colours, spacing, or type.
- Make screen-only reusable components without updating the kit.
- Confuse study progress with SRS mastery.
- Hide destructive actions or skip the confirm pattern.
- Use a Drawer as mandatory navigation (Settings/More Hub is a modern screen/tab).
- Treat mock/sample numbers as real data.
- Use generic names (`Card`, `Button`, `Modal`) for reusable kit components.
- Create `MxDarkCard` / `MxLightCard` duplicates.
- Do raw brightness checks inside screens (resolve theme via tokens / one resolver).
