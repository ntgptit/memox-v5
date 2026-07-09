# 15 — Mx UI Definition of Done

A future screen is **not done** until every applicable item passes.

## Composition
- [ ] Uses an approved [screen recipe](screen-recipes.md).
- [ ] Uses only Mx components + tokens — no raw colors, spacing, or one-off typography.
- [ ] No reusable component left unpromoted (screen-specific stays unprefixed; reusable → `Mx` in the kit first).
- [ ] Clear hierarchy (L1–L4 mapped); spacing follows the recipe.
- [ ] **One** primary action per screen/region; destructive action separated.
- [ ] No card-in-card nesting unless the recipe explicitly allows it.

## States
- [ ] loading · loaded · empty · error
- [ ] unavailable (if platform/feature dependent)
- [ ] no-due (if SRS due cards involved)
- [ ] finalize-failed (if a session finalizes) — **preserves user data**
- [ ] destructive-confirm (if delete/restore/discard exists)
- [ ] long-text / overflow handled
- [ ] dark loaded + light loaded

## Accessibility
- [ ] Touch targets ≥ 44px.
- [ ] Critical icon-only actions have labels/semantics.
- [ ] Color is never the only signal (correct/wrong/error pair icon + text).
- [ ] Text scaling considered.
- [ ] Long Korean/Vietnamese content wraps, doesn't overflow.

## Business
- [ ] Mutation boundary documented; read-only screens don't mutate learning data.
- [ ] New Learning vs SRS Repeat are visually/behaviorally distinct.
- [ ] Review Words is read-only.
- [ ] Statistics is long-term analytics, not a Session Result.
- [ ] High-risk data actions have confirmation / policy state.

## Flutter handoff
- [ ] Component-mapping table complete.
- [ ] State list complete.
- [ ] Data dependencies listed; mutation actions listed.
- [ ] Dark/light behavior listed.
- [ ] **Screenshot review** ([loop](screenshot-review-loop.md)) done before "complete".
