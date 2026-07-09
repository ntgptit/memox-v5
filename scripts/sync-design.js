#!/usr/bin/env node
/**
 * scripts/sync-design.js — push MemoX v5 design-kit changes UP to the Claude
 * Design project deterministically, without asking a human each time.
 *
 * Why this exists: the kit is mirrored in the repo under the localDir pinned in
 * `.design-sync/config.json`, but pushing edits back to claude.ai/design needs
 * design-system auth that only a logged-in `claude` CLI carries (it is NOT
 * CI-able). This script computes the kit files changed in a git range, then
 * drives a nested, plan-bounded `claude -p` DesignSync push that writes the
 * added/modified files and deletes the removed ones. `finalize_plan` bounds the
 * write/delete set, so the nested agent cannot touch anything outside it.
 *
 * Usage:
 *   node scripts/sync-design.js                # range = lastSyncedCommit..HEAD
 *                                              #         (or HEAD~1..HEAD on first run)
 *   node scripts/sync-design.js <from-ref>     # range = <from-ref>..HEAD
 *   node scripts/sync-design.js --dry          # print the plan, do not push
 *   node scripts/sync-design.js --no-record    # push but do not advance lastSyncedCommit
 *
 * On success (record mode) it writes `lastSyncedCommit = HEAD` so the next run
 * only pushes the new delta. Exit: 0 ok / nothing to do · 1 push failed · 2 setup error.
 */

const { execFileSync, spawnSync } = require('node:child_process');
const { existsSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const {
  classifyChanges,
  buildPrompt,
  isSynced,
} = require('./sync-design.core.js');

const REPO = process.cwd();
const CONFIG = path.join(REPO, '.design-sync', 'config.json');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const noRecord = args.includes('--no-record');
const fromRefArg = args.find((a) => !a.startsWith('--'));

const git = (...a) =>
  execFileSync('git', a, { cwd: REPO, encoding: 'utf8' }).trim();

function fail(message, code) {
  console.error(`sync-design: ${message}`);
  process.exit(code);
}

if (!existsSync(CONFIG)) {
  fail(
    'no .design-sync/config.json — run /design-sync once to pin the project.',
    2,
  );
}

const cfg = JSON.parse(readFileSync(CONFIG, 'utf8'));
const { projectId, localDir } = cfg;
if (!projectId || !localDir) {
  fail('config.json missing projectId or localDir.', 2);
}

const head = git('rev-parse', 'HEAD');
let from = fromRefArg || cfg.lastSyncedCommit;
if (!from) {
  from = git('rev-parse', 'HEAD~1');
  console.warn(
    'sync-design: no lastSyncedCommit recorded — syncing HEAD~1..HEAD only. Pass a <from-ref> to widen.',
  );
}

const rawDiff = git(
  'diff',
  '--name-status',
  '-M',
  `${from}..${head}`,
  '--',
  localDir,
);
const { writes, deletes } = classifyChanges(rawDiff, localDir);

if (writes.length === 0 && deletes.length === 0) {
  console.log(
    `sync-design: no kit changes in ${from.slice(0, 8)}..${head.slice(0, 8)} — nothing to push.`,
  );
  process.exit(0);
}

console.log(`sync-design: project ${projectId} · localDir "${localDir}"`);
console.log(
  `range ${from.slice(0, 8)}..${head.slice(0, 8)} → ${writes.length} write(s), ${deletes.length} delete(s):`,
);
for (const w of writes) {
  console.log(`  W ${w}`);
}
for (const d of deletes) {
  console.log(`  D ${d}`);
}

if (dry) {
  console.log('sync-design: --dry, not pushing.');
  process.exit(0);
}

const prompt = buildPrompt({ projectId, localDir, writes, deletes });
const claudeBin = process.env.CLAUDE_BIN || 'claude';
const maxTurns = process.env.SYNC_MAX_TURNS || '12';
console.log(
  `sync-design: pushing via nested \`${claudeBin} -p\` (max-turns ${maxTurns}; needs a design-authorized CLI login)…`,
);

const res = spawnSync(
  claudeBin,
  ['--dangerously-skip-permissions', '--max-turns', maxTurns, '-p', prompt],
  {
    cwd: REPO,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 12 * 60_000,
  },
);

if (res.error && res.error.code === 'ENOENT') {
  fail(
    '`claude` CLI not found. Install it / set CLAUDE_BIN, or run `/design-sync` in a design-authorized CLI.',
    1,
  );
}

const out = `${res.stdout || ''}${res.stderr || ''}`.trim();
const lastLine = out.split('\n').filter(Boolean).pop() || '';
console.log(`sync-design: CLI said → ${lastLine}`);

if (!isSynced(out)) {
  fail(
    'push did not confirm success — NOT recording lastSyncedCommit. Re-run after fixing.',
    1,
  );
}

if (noRecord) {
  console.log('sync-design: done (--no-record, lastSyncedCommit unchanged).');
  process.exit(0);
}

cfg.lastSyncedCommit = head;
writeFileSync(CONFIG, `${JSON.stringify(cfg, null, 2)}\n`);
console.log(`sync-design: done. lastSyncedCommit → ${head.slice(0, 8)}`);
process.exit(0);
