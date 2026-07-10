#!/usr/bin/env node
/**
 * Design-token guard for MemoX kit screens (Mobile UI Construction Contract §4/§9).
 * Fails if any screen/partial contains:
 *   - raw hex colours (#rgb / #rrggbb) in markup — must use var(--mx-color-*)
 *   - off-scale `gap:` values — spacing must be in {4,8,12,16,24,32,48}
 *
 * Run:  node "docs/design/kit-design/Mx Design Kit — MemoX v5/ui_kits/memox-app/tools/check-screen-tokens.mjs"
 * Scope (folder layout — see ../README.md):
 *   - screens/*.card.html   the per-screen mockups
 *   - _shared/*.js          reusable, non-generated partials (window.Mx*)
 *   - index.html            the gallery at the kit root
 * Legacy appearance-reminders.card.html (not part of the MX WBS backlog) is excluded.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLS_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(TOOLS_DIR, '..'); // ui_kits/memox-app
const ALLOWED_SPACING = new Set([4, 8, 12, 16, 24, 32, 48]);
const EXCLUDE = new Set(['appearance-reminders.card.html']);

/** collect the files to lint: screens + shared partials + the gallery index */
function collect() {
  const targets = [];
  const push = (dir, filter) => {
    for (const f of readdirSync(join(ROOT, dir))) {
      if (filter(f) && !EXCLUDE.has(f)) targets.push(join(ROOT, dir, f));
    }
  };
  push('screens', (f) => f.endsWith('.card.html'));
  push('_shared', (f) => f.endsWith('.js'));
  push('.', (f) => f === 'index.html');
  return targets;
}

let failures = 0;
const files = collect();
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const problems = [];

  for (const m of src.matchAll(/#[0-9a-fA-F]{3,6}\b/g)) {
    problems.push(`raw hex ${m[0]}`);
  }
  for (const m of src.matchAll(/gap: (\d+)/g)) {
    const v = Number(m[1]);
    if (!ALLOWED_SPACING.has(v)) problems.push(`off-scale gap: ${v}`);
  }

  if (problems.length) {
    failures += problems.length;
    const uniq = [...new Set(problems)];
    console.error(`✗ ${relative(ROOT, file)}`);
    for (const p of uniq) console.error(`    ${p}`);
  }
}

if (failures) {
  console.error(`\nFAIL: ${failures} token/spacing violation(s) across kit screens.`);
  process.exit(1);
}
console.log(`OK: ${files.length} kit files — no raw hex, no off-scale gap.`);
