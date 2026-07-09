# 19 — Mx Composition Governance

The layers, and the question each answers:

| Layer | Answers |
|---|---|
| Mx Base Kit | **what to use** (tokens + components) |
| Mx Composition Grammar | **how to compose** |
| Mx Screen Recipes | **which structure** to use |
| Mx Golden Screens | **what good looks like** |
| Mx UI Definition of Done | **when it's done** |
| Mx Screenshot Review Loop | **who verifies it** visually |

## Rules
- Every future screen **picks one recipe** and **mimics one golden screen** pattern.
- A new screen **cannot invent** composition grammar.
- If a screen needs a new composition pattern → **update the recipes first**.
- If a reusable visual asset appears → **promote it to the Mx kit first** (see kit governance).
- If screenshot review finds a **repeated** issue → update the grammar or the recipe (fix the system, not
  just the screen).
- A screen may be rejected for being **token-correct but composition-wrong**.

## Change flow
1. Propose the pattern/recipe change (with the screen that motivated it).
2. Update grammar/recipe/golden as needed.
3. Update the Definition of Done if a new checkable rule was added.
4. Only then implement screens against the updated system.

See also: [kit governance](governance.md) (component/token promotion + prefix rules) and the
[React Native handoff](../kit-screens/14-react-native-handoff-gallery.html).
