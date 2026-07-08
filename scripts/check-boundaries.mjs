/**
 * Architecture boundary check (no dependencies).
 *
 * Rules:
 *  a) src/features/<A> must not import from src/features/<B> (A !== B)
 *  b) src/shared must not import from src/features
 *
 * Handles relative imports and the "@/" alias (mapped to ./src).
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');
const scanRoots = ['features', 'shared'].map((dir) => path.join(srcRoot, dir));

const IMPORT_PATTERNS = [
  /\bfrom\s+['"]([^'"]+)['"]/g, // import ... from / export ... from
  /\bimport\s+['"]([^'"]+)['"]/g, // side-effect import
  /\bimport\s*\(\s*['"]([^'"]+)['"]/g, // dynamic import()
  /\brequire\s*\(\s*['"]([^'"]+)['"]/g, // require()
];

const collectSourceFiles = (dir) => {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectSourceFiles(fullPath);
    }
    return /\.tsx?$/.test(entry.name) ? [fullPath] : [];
  });
};

const resolveSpecifier = (specifier, importerDir) => {
  if (specifier.startsWith('@/')) {
    return path.join(srcRoot, specifier.slice(2));
  }
  if (specifier.startsWith('.')) {
    return path.resolve(importerDir, specifier);
  }
  return null; // bare package import — not our concern
};

const segmentsUnderSrc = (absolutePath) => {
  const relative = path.relative(srcRoot, absolutePath);
  if (relative.startsWith('..')) {
    return null;
  }
  return relative.split(path.sep);
};

const featureOf = (segments) =>
  segments?.[0] === 'features' ? (segments[1] ?? null) : null;

const violations = [];

for (const file of scanRoots.flatMap(collectSourceFiles)) {
  const source = readFileSync(file, 'utf8');
  const fileSegments = segmentsUnderSrc(file);
  const fileFeature = featureOf(fileSegments);
  const fileInShared = fileSegments?.[0] === 'shared';
  const relativeFile = path.relative(projectRoot, file);

  for (const pattern of IMPORT_PATTERNS) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1];
      const resolved = resolveSpecifier(specifier, path.dirname(file));
      if (!resolved) {
        continue;
      }
      const targetFeature = featureOf(segmentsUnderSrc(resolved));
      if (!targetFeature) {
        continue;
      }
      const line = source.slice(0, match.index).split('\n').length;
      if (fileInShared) {
        violations.push(
          `${relativeFile}:${line} — shared code imports from feature "${targetFeature}" (${specifier})`,
        );
      } else if (fileFeature && targetFeature !== fileFeature) {
        violations.push(
          `${relativeFile}:${line} — feature "${fileFeature}" imports from feature "${targetFeature}" (${specifier})`,
        );
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Boundary violations found:\n');
  for (const violation of violations) {
    console.error(`  ${violation}`);
  }
  console.error(
    '\nRules: features must not import other features; shared must not import features.',
  );
  process.exit(1);
}

console.log('Boundary check passed.');
