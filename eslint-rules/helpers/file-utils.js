/**
 * File system utility functions for ESLint rules
 */

const fs = require('node:fs');
const path = require('node:path');

// Common file extensions for TypeScript/React files
const TS_EXTENSIONS = ['.tsx', '.ts'];
const TS_EXTENSIONS_WITH_INDEX = ['.tsx', '.ts', '/index.tsx', '/index.ts'];

/**
 * Tries to find a file with the given base path and extensions
 * @param {string} basePath - Base file path without extension
 * @param {string[]} extensions - Array of extensions to try
 * @returns {string|null} First existing file path or null
 */
function tryExtensions(basePath, extensions) {
  for (const ext of extensions) {
    const filePath = basePath + ext;
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

/**
 * Finds the project root by looking for package.json
 * @param {string} startPath - Starting path
 * @returns {string|null} Project root path or null
 */
function findProjectRoot(startPath) {
  let current = path.resolve(startPath);
  const root = path.parse(current).root;

  while (current !== root) {
    const packageJson = path.join(current, 'package.json');
    if (fs.existsSync(packageJson)) {
      return current;
    }
    current = path.dirname(current);
  }

  return null;
}

/**
 * Resolves an import path to an absolute file path
 * @param {string} importPath - The import path (e.g., 'ui/components/button/Button')
 * @param {string} currentFile - The current file path
 * @returns {string|null} The resolved file path or null if not found
 */
function resolveImportPath(importPath, currentFile) {
  const currentDir = path.dirname(currentFile);
  const projectRoot = findProjectRoot(currentFile);

  if (!projectRoot) return null;

  // Handle absolute imports (starting with 'src/' or project root)
  if (importPath.startsWith('src/')) {
    return path.join(projectRoot, importPath);
  }

  // Handle relative imports
  if (importPath.startsWith('.')) {
    const resolved = path.resolve(currentDir, importPath);
    return tryExtensions(resolved, TS_EXTENSIONS);
  }

  // Handle module imports (e.g., 'ui/components/button/Button')
  // Try common patterns
  const possiblePaths = [
    path.join(projectRoot, 'src', importPath),
    path.join(projectRoot, importPath),
  ];

  for (const basePath of possiblePaths) {
    const filePath = tryExtensions(basePath, TS_EXTENSIONS_WITH_INDEX);
    if (filePath) return filePath;
  }

  return null;
}

module.exports = {
  findProjectRoot,
  resolveImportPath,
};
