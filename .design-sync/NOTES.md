# design-sync notes — MemoX v5

## What this sync is
- Target project: **Mx Design Kit — MemoX v5** (`9f138728-8b42-49a6-9af0-feb2abbc737e`), a
  `PROJECT_TYPE_DESIGN_SYSTEM` on claude.ai/design owned by Giap Nguyen.
- Source of truth = the local folder `docs/design/kit-design/Mx Design Kit — MemoX v5/` (untracked in git).
  It is a **download/export of that same project** — the manifest namespace `MxDesignKitMemoXV5_9f1387`
  matches the project id prefix `9f138728`.
- This is a **hand-authored / pre-built kit already in the claude.ai/design upload layout**
  (bundle `@ds-bundle` format 4, `_ds_manifest.json`, group-level `*.card.html` with `@dsCard` markers,
  `tokens/*.css`, `guidelines/`, `ui_kits/memox-app/`, `uploads/`). It is **not** produced by the
  design-sync converter — the repo is an Expo/RN app with no component-library `dist/` to build from, and
  `src/components` is reference-only starter template code.
- Because of that: **no `_ds_sync.json` anchor** (by design). The app compiles `_ds_manifest.json` from the
  `@dsCard` first-line comments via its self-check. Next sync has no anchor and re-verifies/re-uploads.

## Sync = faithful re-upload
- Re-adopted (non-empty) project → **atomic** upload path. Local file set matched remote 1:1 (172 files),
  so reconciliation deleted nothing. A sync here just pushes the local kit folder back up, capturing any
  local edits; idempotent if nothing changed.
- Upload order used: write `_ds_needs_recompile` sentinel → 162 text files → 10 `uploads/*.png` →
  re-arm `_ds_needs_recompile`.

## Environment quirks (Windows)
- The kit dir name contains an **em-dash** (`—`, U+2014). Passing it as a shell argument (Bash `node -e`,
  PowerShell string literal) **mangles the character** and the path fails to resolve. Work around by
  resolving the dir via `Get-ChildItem docs/design/kit-design -Directory` (wildcard) or by passing the
  literal absolute path directly as a **tool parameter** (the `DesignSync.finalize_plan` `localDir` param
  accepted the em-dash fine — only the shell layer corrupts it).
- Bash working directory persists across calls; a `cd` into the kit dir made later relative paths double.
  Prefer absolute paths.

## Not committed automatically
- `.design-sync/` and `docs/design/kit-design/` are untracked. Left the commit decision to the user
  (repo commit conventions + docs-phase guardrails).
