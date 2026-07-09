const {
  classifyChanges,
  buildPrompt,
  isSynced,
} = require('../sync-design.core.js');

const LOCAL_DIR = 'docs/design/kit-design/Mx Design Kit — MemoX v5';

describe('classifyChanges', () => {
  it('splits added/modified into writes and deleted into deletes (project-relative)', () => {
    const raw = [
      `A\t${LOCAL_DIR}/ui_kits/memox-app/new.html`,
      `M\t${LOCAL_DIR}/styles.css`,
      `D\t${LOCAL_DIR}/tokens/old.css`,
    ].join('\n');

    expect(classifyChanges(raw, LOCAL_DIR)).toEqual({
      writes: ['ui_kits/memox-app/new.html', 'styles.css'],
      deletes: ['tokens/old.css'],
    });
  });

  it('uses the new path for renames and copies', () => {
    const raw = [
      `R100\t${LOCAL_DIR}/a.html\t${LOCAL_DIR}/b.html`,
      `C075\t${LOCAL_DIR}/c.css\t${LOCAL_DIR}/d.css`,
    ].join('\n');

    expect(classifyChanges(raw, LOCAL_DIR)).toEqual({
      writes: ['b.html', 'd.css'],
      deletes: [],
    });
  });

  it('ignores paths outside the kit localDir', () => {
    const raw = [
      `M\tsrc/app/index.tsx`,
      `M\t${LOCAL_DIR}/readme.md`,
      `M\tdocs/design/wireframes/home-wireframe.md`,
    ].join('\n');

    expect(classifyChanges(raw, LOCAL_DIR)).toEqual({
      writes: ['readme.md'],
      deletes: [],
    });
  });

  it('tolerates a trailing slash on localDir and blank lines', () => {
    const raw = `\nM\t${LOCAL_DIR}/x.css\n\n`;
    expect(classifyChanges(raw, `${LOCAL_DIR}/`)).toEqual({
      writes: ['x.css'],
      deletes: [],
    });
  });

  it('returns empty arrays for an empty diff', () => {
    expect(classifyChanges('', LOCAL_DIR)).toEqual({ writes: [], deletes: [] });
  });
});

describe('buildPrompt', () => {
  it('embeds projectId, JSON-quoted localDir, and the path lists', () => {
    const prompt = buildPrompt({
      projectId: 'proj-123',
      localDir: LOCAL_DIR,
      writes: ['a.html', 'b.css'],
      deletes: ['c.css'],
    });

    expect(prompt).toContain('Target projectId = proj-123');
    expect(prompt).toContain(`localDir=${JSON.stringify(LOCAL_DIR)}`);
    expect(prompt).toContain('writes (2):');
    expect(prompt).toContain('deletes (1):');
    expect(prompt).toContain('SYNCED w=2 d=1');
  });
});

describe('isSynced', () => {
  it('is true only when the last non-empty line starts with SYNCED', () => {
    expect(isSynced('some log\nSYNCED w=3 d=1')).toBe(true);
    expect(isSynced('SYNCED w=0 d=0\n\n')).toBe(true);
    expect(isSynced('FAILED: boom')).toBe(false);
    expect(isSynced('SYNCED in the middle\nFAILED: nope')).toBe(false);
    expect(isSynced('')).toBe(false);
  });
});
