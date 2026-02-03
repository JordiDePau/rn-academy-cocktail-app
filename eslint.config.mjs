import expoConfig from 'eslint-config-expo/flat.js';
import reactHooksAddons from 'eslint-plugin-react-hooks-addons';
import reactNative from 'eslint-plugin-react-native';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

import customRules from './eslint-rules/index.js';

const importsConfig = [
  /* Auto-sort imports */
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'sort-imports': 'off', // disabled to not conflict with simple-import-sort
      'import/order': 'off', // disabled to not conflict with simple-import-sort
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // External packages (where `react` related packages come first)
            ['^react', '^@?\\w'],
            // Internal packages
            [`^(core|ui|app|utils|types|test-utils|services)(/.*|$)`], // Side effect imports.
            ['^\\u0000'], // Other relative imports.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
  /* Auto-remove unused imports */
  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  /* Other import rules */
  {
    rules: {
      'import/newline-after-import': ['error', { count: 1 }],
    },
  },
  /* React rules */
  {
    rules: {
      'react/self-closing-comp': ['warn', { component: true, html: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    },
  },
  /* Custom rules */
  {
    plugins: {
      custom: customRules,
    },
    rules: {
      'custom/no-redundant-default-props': 'error',
    },
  },
  /* React Hooks rules */
  {
    plugins: {
      'react-hooks-addons': reactHooksAddons,
    },
    rules: {
      'react-hooks-addons/no-unused-deps': 'warn',
    },
  },
  /* Arrow function style rules */
  {
    rules: {
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      'no-nested-ternary': 'error',
    },
  },
];

export default [
  ...expoConfig,
  ...importsConfig,
  {
    plugins: {
      'react-native': reactNative,
    },
    rules: {
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/no-unused-styles': 'error', // doesn't work with unistyles :(
      'react-native/sort-styles': 'error',
    },
  },
  {
    files: ['.maestro/**/*.js'],
    rules: {
      'no-undef': 'off',
      'object-shorthand': 'off',
    },
  },
];
