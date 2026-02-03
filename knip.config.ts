import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**/*.{ts,tsx,js,jsx}', '!src/{android,ios,plugins}/**'],

  ignore: ['*.config.js', 'app.json', 'eslint.config.mjs', 'package.json', 'eslint-rules/**'],
  // TODO: Remove this once we can remove the approvals module ignore
  ignoreExportsUsedInFile: true,
};

export default config;
