# Design-Sync Process

How MemoX v5 keeps the repo's design-kit mirror in sync **up** to the Claude Design project
(`claude.ai/design`). Direction is **push only**: repo kit → Claude Design.

- **Source of truth:** the Claude Design project `9f138728-8b42-49a6-9af0-feb2abbc737e`
  ("Mx Design Kit — MemoX v5").
- **Repo mirror:** `docs/design/kit-design/Mx Design Kit — MemoX v5/` (the `localDir` pinned in
  [`.design-sync/config.json`](../../.design-sync/config.json)).
- **What gets pushed:** only kit files that changed in a git range (delta), as writes (added /
  modified / renamed) and deletes (removed). Tracked by `lastSyncedCommit` in the config.

## Why it needs the `claude` CLI (not CI)

Pushing to a Claude Design project needs design-system auth that only a **logged-in `claude` CLI**
carries — it is **not CI-able**. A plain `node` script cannot call the `DesignSync` MCP tool, so
[`scripts/sync-design.js`](../../scripts/sync-design.js) computes the delta and drives a nested,
plan-bounded `claude -p` session that performs the actual `DesignSync` calls. `finalize_plan` locks
the exact write/delete set, so the nested run cannot touch anything outside the computed paths.

You must have run `/design-login` once in an interactive `claude` terminal on this machine.

## Manual push

```bash
npm run design:sync:dry     # print the plan (writes/deletes) — never pushes
npm run design:sync         # push delta lastSyncedCommit..HEAD, then record HEAD
node scripts/sync-design.js <from-ref>    # widen the range
node scripts/sync-design.js --no-record   # push but don't advance lastSyncedCommit
```

Exit codes: `0` ok / nothing to do · `1` push failed (not confirmed) or `claude` not found ·
`2` setup error (missing config / fields).

## Automatic push (git hooks)

Hooks live in `.githooks/` and require `core.hooksPath` to point there. On a fresh clone:

```bash
git config core.hooksPath .githooks
```

- **`pre-push`** — runs `npm run check` (verify gate), then, if the pushed range changes the kit,
  pushes that delta in `--no-record` mode.
- **`post-merge`** — on `main` only: if the kit changed since `lastSyncedCommit`, pushes the delta in
  record mode. Closes the gap left by server-side PR merges and agent pushes.

### Bypasses

| Variable / flag | Effect |
|-----------------|--------|
| `MEMOX_SKIP_VERIFY=1 git push` | skip the `npm run check` gate, still design-sync |
| `MEMOX_SKIP_DESIGN_SYNC=1 git push` | skip design-sync (and the verify gate) |
| `MEMOX_SKIP_DESIGN_SYNC=1 git pull` | skip the post-merge push |
| `git push --no-verify` | skip the whole hook |

**Agents / CI without a design-authorized TTY MUST set `MEMOX_SKIP_DESIGN_SYNC=1`** on push/pull,
or the nested `claude` will hang. If the `claude` CLI is simply absent, the hooks warn and exit 0 —
they never block a push.

## Notes

- The kit folder is committed to git so the delta range can be computed; `lastSyncedCommit` records
  the last pushed commit.
- Biome and TypeScript ignore `docs/design/**`, so the kit's own HTML/CSS/JS is not linted or
  type-checked by `npm run check`. The tooling under `scripts/` is.
- The pure delta/prompt logic lives in `scripts/sync-design.core.js` and is unit-tested by
  `scripts/__tests__/sync-design.core.test.js`; the real push is integration-only (needs design auth)
  — use `--dry` as the safe local check.
