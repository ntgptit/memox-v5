# Design-Sync Tooling — Design Spec

**Date:** 2026-07-09
**Status:** Approved (brainstorming) → ready for implementation plan
**Scope type:** dev tooling / infra (NOT product feature code — does not touch `src/`, so
AGENTS.md §10 documentation-phase guardrail does not apply).

## 1. Problem & goal

The MemoX v5 design kit is authored in the Claude Design project
`9f138728-8b42-49a6-9af0-feb2abbc737e` ("Mx Design Kit — MemoX v5") and mirrored into the repo at
`docs/design/kit-design/Mx Design Kit — MemoX v5/`. Today there is **no tooling to push local kit
edits back up** to the Claude Design project — the mirror can only drift.

**Goal:** port memox-v4's proven design-push tooling to v5 so that kit changes committed to the repo
are synced up to the Claude Design project — manually via a script and automatically via git hooks —
using **delta-by-git-range** pushes.

Direction is **PUSH only** (repo kit → Claude Design). Pull/import is out of scope (the kit is
already mirrored locally).

## 2. Why a nested `claude -p` driver

A plain `node` script cannot call the `DesignSync` MCP tool directly — only a `claude` session can,
and only one that holds design-system authorization. A pre-push/CI/`node` context does not carry that
auth, but a freshly spawned `claude -p` subprocess **inherits the machine's stored design login**.

So the script computes the change set in `node`, then drives a nested, **plan-bounded**
`claude --dangerously-skip-permissions --max-turns N -p "<prompt>"` that performs the `DesignSync`
calls. `finalize_plan` locks the exact write/delete path set, so the nested agent physically cannot
touch anything outside the computed paths. This mirrors v4's `tool/parity/sync-design.mjs`.

Verified 2026-07-09: a nested `claude -p` on this machine can call `DesignSync` read methods against
the v5 project without an interactive `/design-login`.

## 3. Components

```
.design-sync/config.json              # + lastSyncedCommit (additive; existing fields preserved)
scripts/sync-design.mjs               # push driver — the main entry point
.githooks/pre-push                    # verify gate + push delta of the pushed range (--no-record)
.githooks/post-merge                  # on main: push kit unsynced since lastSyncedCommit (record mode)
docs/design/design-sync-process.md    # process doc + bypass instructions
package.json                          # scripts: design:sync, design:sync:dry
scripts/__tests__/sync-design.test.mjs  # Jest unit test for classifyChanges()
```

### 3.1 `.design-sync/config.json`

Existing v5 fields (`projectId`, `projectName`, `shape`, `status`, `lastSyncDate`,
`syncedFileCount`, `localDir`, `notes`) are **preserved**. Add one field:

- `lastSyncedCommit`: string — the last repo commit whose kit state was pushed. Advanced by the
  script in record mode.

`localDir` stays `docs/design/kit-design/Mx Design Kit — MemoX v5` (spaces + em-dash; all git/path
handling passes it as a single argv element, never via a shell string).

### 3.2 `scripts/sync-design.mjs`

**Responsibility:** compute the kit delta for a git range and drive the nested `claude -p` push.

Flow:
1. Load config; require `projectId` + `localDir` (else exit 2).
2. Resolve range `<from>..HEAD`:
   - `<from>` = positional `<from-ref>` arg, else `config.lastSyncedCommit`, else `HEAD~1` (warn).
3. `git diff --name-status -M <from>..HEAD -- <localDir>` → `classifyChanges()`:
   - status `D` → **delete** (project-relative path = repo path minus `localDir/` prefix)
   - `A`/`M`/`R`/`C` → **write** (for `R`/`C`, the new path)
   - paths not under `localDir/` are ignored.
4. Empty writes+deletes → log "nothing to push", exit 0.
5. Build the plan-bounded prompt and run the nested CLI:
   `claude --dangerously-skip-permissions --max-turns ${SYNC_MAX_TURNS||12} -p "<prompt>"`
   (binary overridable via `CLAUDE_BIN`). The prompt instructs: `finalize_plan(localDir, writes,
   deletes)` → `write_files(planId, [{path, localPath}])` → `delete_files(planId, deletes)` → reply
   exactly `SYNCED w=<n> d=<n>` or `FAILED: <err>`, nothing else.
6. Parse the last non-empty output line. Only on `SYNCED ` → success.
7. Record: unless `--no-record`, write `config.lastSyncedCommit = HEAD`.

Flags: `--dry` (print plan, do not push, exit 0), `--no-record` (push but do not advance the
commit), positional `<from-ref>` (widen range). No `--full` (YAGNI — delta model chosen).

Exit codes: `0` ok / nothing to do · `1` push failed (not confirmed) or `claude` ENOENT · `2` setup
error (missing config / fields).

**Pure, testable unit:** `export function classifyChanges(rawDiff, localDir)` returning
`{ writes: string[], deletes: string[] }`. No git/CLI/fs inside it.

### 3.3 `.githooks/pre-push`

POSIX `sh`. Steps:
1. `node` present? no → skip (exit 0).
2. **Verify gate:** unless `MEMOX_SKIP_VERIFY=1` or `MEMOX_SKIP_DESIGN_SYNC=1`, run `npm run check`
   (tsc + Biome + Jest + boundaries). Failure blocks the push (`set -e`).
3. **Design sync:** if `MEMOX_SKIP_DESIGN_SYNC=1` → exit 0. If no `.design-sync/config.json` → exit
   0. If no `claude` CLI → warn + exit 0 (do not block). Read `localDir` from config. For each ref
   update on stdin, if the pushed range `<remote_sha>..<local_sha>` touches `localDir`, run
   `node scripts/sync-design.mjs <remote_sha> --no-record`. New branch (`remote_sha` all-zero) →
   `node scripts/sync-design.mjs --no-record`.

Bypass: `MEMOX_SKIP_DESIGN_SYNC=1 git push` or `git push --no-verify`.

### 3.4 `.githooks/post-merge`

POSIX `sh`. Closes the gap pre-push cannot cover: server-side PR merges and agent pushes
(`MEMOX_SKIP_DESIGN_SYNC=1`) land kit edits on `main` without syncing. Steps:
1. `MEMOX_SKIP_DESIGN_SYNC=1` set, or `node` missing, or no config → exit 0.
2. Only on branch `main` → else exit 0.
3. Read `localDir` + `lastSyncedCommit`; both required → else exit 0.
4. If `git diff --name-only <lastSyncedCommit>..HEAD -- <localDir>` is empty → exit 0.
5. `claude` missing → warn (kit changed but cannot push) + exit 0.
6. Else `node scripts/sync-design.mjs` in **record mode** (advances `lastSyncedCommit`).

Bypass: `MEMOX_SKIP_DESIGN_SYNC=1 git pull`.

### 3.5 Hook enablement

`core.hooksPath` is already set to `.githooks` in this repo, but the directory does not exist yet.
Implementation creates `.githooks/` with both hooks, LF line endings, and executable bit
(`git update-index --chmod=+x`). No husky. A short note in the process doc tells a fresh clone that
`core.hooksPath=.githooks` must be set (document `git config core.hooksPath .githooks`).

### 3.6 `package.json` scripts

- `"design:sync": "node scripts/sync-design.mjs"`
- `"design:sync:dry": "node scripts/sync-design.mjs --dry"`

## 4. Prerequisite (one-time, done in the implementation branch)

The kit folder `docs/design/kit-design/` is currently **untracked**. Git-range diff requires it to
be committed. The implementation commits the kit, then sets `config.lastSyncedCommit` to that commit
so the first delta is empty until the next kit edit.

## 5. Error handling summary

| Condition | Script | Hook |
|-----------|--------|------|
| No config / missing fields | exit 2 | exit 0 (skip) |
| No `lastSyncedCommit` | warn, fall back `HEAD~1..HEAD` | post-merge skips (needs it) |
| Empty delta | exit 0 "nothing to push" | exit 0 |
| `claude` CLI not found | exit 1 (ENOENT) | warn + exit 0 (never block) |
| Nested push not `SYNCED` | exit 1, do NOT record | propagates non-zero (pre-push blocks) |
| Agent/CI (no design TTY) | n/a | `MEMOX_SKIP_DESIGN_SYNC=1` required to avoid hang |

## 6. Testing & verification

- **Unit (Jest):** `classifyChanges()` — added file, modified file, deleted file, rename (`R100`),
  copy, and a path outside `localDir` (ignored). Also `localDir` with spaces/em-dash.
- **Manual/integration:** `npm run design:sync:dry` prints the plan without pushing (safe check); a
  real push requires a design-authorized `claude` login and is not CI-able (documented).
- **Gate:** `npm run check` must pass. Note the tooling files (`scripts/`, `.githooks/`) are JS/sh;
  Biome lints `scripts/` (not excluded). `.githooks/*` are shell, outside Biome/tsc.

## 7. Out of scope (YAGNI)

- Pull/import from Claude Design (kit already mirrored).
- `--full` re-upload mode (delta model chosen).
- CI-side push (needs interactive design auth; explicitly not CI-able).
- Any change under `src/` or product behavior.

## 8. Acceptance criteria

- `node scripts/sync-design.mjs --dry` prints correct writes/deletes for a kit change range.
- A real run pushes only the changed kit files and advances `lastSyncedCommit` (record mode).
- `pre-push` runs `npm run check`, pushes the kit delta of the pushed range in `--no-record` mode,
  and is bypassable via `MEMOX_SKIP_DESIGN_SYNC=1` / `--no-verify`.
- `post-merge` on `main` pushes kit unsynced since `lastSyncedCommit` in record mode; no-ops off
  `main` or when the kit is unchanged.
- Missing `claude` CLI never blocks a push (hooks warn + exit 0).
- `classifyChanges()` unit tests pass; `npm run check` is green.
