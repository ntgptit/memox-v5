/**
 * Pure, side-effect-free helpers for the design-sync push tool.
 *
 * Kept separate from `sync-design.mjs` (which does git / fs / child_process) so
 * this logic can be unit-tested without a repo, a config file, or the `claude`
 * CLI. No imports, no I/O.
 */

const SYNCED_LINE = /^SYNCED /;

/**
 * Classify a `git diff --name-status -M` block for the kit `localDir` into the
 * project-relative writes (added/modified/renamed/copied) and deletes.
 *
 * @param {string} rawDiff  stdout of `git diff --name-status -M <range> -- <localDir>`
 * @param {string} localDir kit directory, repo-relative (may contain spaces)
 * @returns {{ writes: string[], deletes: string[] }} project-relative paths
 */
function classifyChanges(rawDiff, localDir) {
  const prefix = `${String(localDir).replace(/\\/g, '/').replace(/\/$/, '')}/`;
  const writes = [];
  const deletes = [];

  for (const line of String(rawDiff).split('\n')) {
    if (!line.trim()) {
      continue;
    }
    const parts = line.split('\t');
    const status = parts[0][0]; // A M D R C
    // For renames/copies git emits <status>\t<old>\t<new>; the last column is
    // always the current path.
    const repoPath = parts[parts.length - 1].replace(/\\/g, '/');
    if (!repoPath.startsWith(prefix)) {
      continue;
    }
    const projPath = repoPath.slice(prefix.length);
    if (status === 'D') {
      deletes.push(projPath);
    } else {
      writes.push(projPath);
    }
  }

  return { writes, deletes };
}

/**
 * Build the plan-bounded prompt for the nested `claude -p` DesignSync push.
 *
 * @param {{ projectId: string, localDir: string, writes: string[], deletes: string[] }} input
 * @returns {string}
 */
function buildPrompt({ projectId, localDir, writes, deletes }) {
  const list = (arr) => arr.map((p) => `   ${p}`).join('\n');
  return `You have a DesignSync tool with design-system access. Perform an OFF-SCRIPT, as-is sync to an EXISTING project. DO NOT run any design-sync skill, DO NOT run any converter/build, DO NOT create a project.

Target projectId = ${projectId}

Steps, using ONLY DesignSync tool calls:
1. finalize_plan with: localDir=${JSON.stringify(localDir)}, and EXACTLY these arrays:
   writes (${writes.length}):
${list(writes)}
   deletes (${deletes.length}):
${list(deletes)}
2. If writes is non-empty: write_files with the returned planId, one entry per write path { path: <p>, localPath: <p> }.
3. If deletes is non-empty: delete_files with the planId and the deletes paths.
4. Reply with EXACTLY one final line: "SYNCED w=${writes.length} d=${deletes.length}" on success, or "FAILED: <short error>".
Do nothing else.`;
}

/**
 * Did the nested CLI confirm a successful sync? Inspects the last non-empty line.
 *
 * @param {string} output combined stdout+stderr of the nested `claude` run
 * @returns {boolean}
 */
function isSynced(output) {
  const lastLine =
    String(output)
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .pop() || '';
  return SYNCED_LINE.test(lastLine);
}

module.exports = { classifyChanges, buildPrompt, isSynced };
