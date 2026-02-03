# React Native Starter

An opinionated Expo/React Native starter template with comprehensive tooling for code quality and developer experience.

## Tech Stack

- **React Native** with **Expo** (SDK 54)
- **TypeScript** for type safety
- **pnpm** as package manager

## Tooling

| Tool | Purpose |
|------|---------|
| ESLint | Linting with auto-import sorting, unused import removal, React Native rules |
| Prettier | Code formatting |
| TypeScript | Type checking |
| Knip | Dead code detection |
| Madge | Circular dependency detection |
| Syncpack | Dependency version management |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm start
```

For platform-specific builds:

```bash
pnpm ios        # Run on iOS simulator
pnpm android    # Run on Android emulator
```

## Scripts

### Development

| Script | Description |
|--------|-------------|
| `pnpm start` | Start Expo dev server |
| `pnpm start:clean` | Start with cache cleared |
| `pnpm ios` | Build and run on iOS |
| `pnpm android` | Build and run on Android |
| `pnpm prebuild` | Generate native projects |

### Code Quality

| Script | Description |
|--------|-------------|
| `pnpm code:lint` | Check for linting errors |
| `pnpm code:lint:fix` | Auto-fix linting errors |
| `pnpm code:format` | Check code formatting |
| `pnpm code:format:fix` | Auto-fix formatting |
| `pnpm code:typecheck` | Run TypeScript type checking |
| `pnpm code:analyse` | Detect dead/unused code with Knip |

### Dependencies

| Script | Description |
|--------|-------------|
| `pnpm deps:lint` | Check dependency issues with Syncpack |
| `pnpm deps:format` | Format package.json with Syncpack |
| `pnpm deps:cyclic` | Detect circular dependencies |
| `pnpm deps:update` | Update dependencies interactively |
| `pnpm deps:verify` | Verify dependency version consistency |

### CI

```bash
pnpm ci:local
```

Runs the full quality check pipeline: dependency lint, code lint, format check, type check, circular dependency check, and dead code analysis.

## Project Structure

```
src/
  app/           # Application screens and navigation
    screens/     # Screen components
```

## Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.mjs` | ESLint flat config with import sorting, React Native rules |
| `.prettierrc.json` | Prettier formatting options |
| `tsconfig.json` | TypeScript configuration |
| `knip.config.ts` | Dead code detection settings |
| `.syncpackrc.js` | Dependency management rules |
