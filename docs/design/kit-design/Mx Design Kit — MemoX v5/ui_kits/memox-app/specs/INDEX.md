# `specs/` — screen registry & build records

Source-of-truth docs for the kit screens. Kept out of `../screens/` so the HTML folder stays pure.

| Doc | What it is |
|-----|------------|
| [`SCREENS-WBS.md`](SCREENS-WBS.md) | The authoritative screen × state backlog (MX-01…MX-20): every screen, its child states, and Done evidence. Update this when adding/removing a screen or state. |
| [`deck-management.contract.md`](deck-management.contract.md) | Per-screen build/verify contract record (objective → composition → state matrix → measured DoD, incl. the VIS-001…020 defect fixes). Add one `<screen>.contract.md` here when a screen goes through the Mobile UI Construction Contract. |

**Verification:** the gallery is `../index.html`; the token/spacing guard is
`../tools/check-screen-tokens.mjs`. Rendered proof screenshots (optional) go in `../shots/`.
