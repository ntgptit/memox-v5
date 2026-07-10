#!/usr/bin/env node
/**
 * Design-token guard for MemoX kit screens (Mobile UI Construction Contract §4/§9).
 * Fails if any screen contains:
 *   - raw hex colours (#rgb / #rrggbb) in markup — must use var(--mx-color-*)
 *   - off-scale `gap:` values — spacing must be in {4,8,12,16,24,32,48}
 *
 * Run:  node "docs/design/kit-design/Mx Design Kit — MemoX v5/ui_kits/memox-app/check-screen-tokens.mjs"
 * Scope: *.card.html + index.html in this folder. Legacy appearance-reminders.card.html
 *        (not part of the MX WBS backlog) is excluded.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ALLOWED_SPACING = new Set([4, 8, 12, 16, 24, 32, 48]);
const EXCLUDE = new Set(['appearance-reminders.card.html']);

const files = readdirSync(DIR).filter(
  (f) => (f.endsWith('.card.html') || f === 'index.html' || f === 'deck-card-list.js') && !EXCLUDE.has(f),
);

let failures = 0;
for (const f of files) {
  const src = readFileSync(join(DIR, f), 'utf8');
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
    console.error(`✗ ${f}`);
    for (const p of uniq) console.error(`    ${p}`);
  }
}

if (failures) {
  console.error(`\nFAIL: ${failures} token/spacing violation(s) across kit screens.`);
  process.exit(1);
}
console.log(`OK: ${files.length} kit screens — no raw hex, no off-scale gap.`);
