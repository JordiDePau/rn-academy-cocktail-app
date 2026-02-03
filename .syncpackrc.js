module.exports = {
  sortFirst: [
    'name',
    'version',
    'description',
    'author',
    'private',
    'license',
    'type',
    'main',
    'exports',
    'workspaces',
    'scripts',
    'engines',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ],
  dependencyTypes: ['prod', 'dev'],
  semverGroups: [
    {
      // See: https://jamiemason.github.io/syncpack/guide/getting-started/#semver-ranges
      label: 'Use exact version numbers',
      packages: ['**'],
      dependencyTypes: ['prod', 'dev'],
      dependencies: ['**'],
      range: '',
    },
  ],
  versionGroups: [
    {
      // See: https://jamiemason.github.io/syncpack/examples/pnpm-workspace-protocol/
      label: 'Use workspace protocol when developing local packages',
      packages: ['**'],
      dependencies: ['$LOCAL'],
      dependencyTypes: ['dev', 'prod'],
      pinVersion: 'workspace:*',
    },
  ],
};
