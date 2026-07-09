# 18 — Mx Screenshot Review Loop

A UI screen is **not done** without screenshot review.

## Process
1. Implement the screen using the Mx kit + a [screen recipe](screen-recipes.md).
2. Run the app or a widget harness.
3. Capture screenshots for: dark loaded · light loaded · loading · empty · error · relevant special states.
4. Compare against the matching [golden screen](golden-screens.md) / recipe.
5. A design-review agent reviews the shots with the [Visual Review Checklist](visual-review-checklist.md).
6. Emit a bug list.
7. Fix bugs.
8. Repeat until **no Blocker/High** issues remain.
9. Only then mark the UI screen done.

## Required screenshot names
```
<screen>__dark__loaded
<screen>__light__loaded
<screen>__dark__empty
<screen>__light__empty
<screen>__dark__error
<screen>__light__error
<screen>__dark__special-state
<screen>__light__special-state
```

## Tooling preference (MemoX / Flutter)
- Prefer a Flutter golden / widget screenshot harness if available.
- Else the project `golden_diff` tool if available.
- Manual screenshot only as a fallback.

Do not claim a UI screen is done without this loop.
