/**
 * ESLint rule to detect when props are passed with values matching their defaults.
 *
 * This rule checks React components that use ES6 default parameters and warns
 * when a prop is explicitly passed with a value that matches the default.
 *
 * Example:
 * ```tsx
 * // Component definition
 * export const Button = ({ variant = 'primary' }: Props) => { ... }
 *
 * // Usage - this would trigger a warning
 * <Button variant="primary" />
 * ```
 */

const fs = require('node:fs');
const { valuesEqual, getJSXAttributeValue, extractDefaults } = require('../helpers/ast-utils');
const { resolveImportPath } = require('../helpers/file-utils');
const { processPatternMatches, hasKeys } = require('../helpers/default-extraction');
const { createFix } = require('../helpers/fix-utils');

// Regex patterns for matching component definitions
const ARROW_FUNCTION_PATTERN =
  /export\s+const\s+(\w+)\s*=\s*\(\s*\{([^}]+)\}\s*:\s*([^)]+)\s*\)\s*=>/gs;
const FUNCTION_PATTERN = /export\s+function\s+(\w+)\s*\(\s*\{([^}]+)\}\s*:\s*([^)]+)\s*\)/gs;

/**
 * Checks if a node has an identifier name
 * @param {ASTNode} node - Node to check
 * @returns {string|null} Identifier name or null
 */
function getIdentifierName(node) {
  return node?.id?.type === 'Identifier' ? node.id.name : null;
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow passing props with values that match their defaults',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      redundantDefaultProp:
        'Prop "{{propName}}" is passed with value "{{value}}" which matches its default value. Remove this prop.',
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Map to store component defaults: componentName -> { propName: defaultValue }
    const componentDefaults = new Map();

    // Map to store imports: componentName -> importPath
    const importMap = new Map();

    // Cache for parsed component defaults from other files
    const parsedFilesCache = new Map();

    /**
     * Parses a file to extract component defaults
     * @param {string} filePath - Path to the file
     * @returns {Map} Map of componentName -> defaults
     */
    function parseFileForDefaults(filePath) {
      if (parsedFilesCache.has(filePath)) {
        return parsedFilesCache.get(filePath);
      }

      const defaults = new Map();

      try {
        if (!fs.existsSync(filePath)) {
          parsedFilesCache.set(filePath, defaults);
          return defaults;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        // Match exported arrow function components and function declarations with destructured params
        // Pattern: export const ComponentName = ({ prop = 'value', prop2 = false }: Props) => {
        // Supports generic types like Props<T>, React.ComponentProps<Button>, etc.
        const allDefaults = [
          processPatternMatches(ARROW_FUNCTION_PATTERN, content),
          processPatternMatches(FUNCTION_PATTERN, content),
        ];

        // Combine all found defaults into the result map
        for (const patternDefaults of allDefaults) {
          for (const [componentName, componentDefaults] of patternDefaults) {
            defaults.set(componentName, componentDefaults);
          }
        }

        parsedFilesCache.set(filePath, defaults);
      } catch {
        // Silently fail - file might not exist or be unparseable
        parsedFilesCache.set(filePath, defaults);
      }

      return defaults;
    }

    /**
     * Gets defaults for a component, checking both local and imported components
     * @param {string} componentName - Name of the component
     * @returns {Object|null} Defaults object or null
     */
    function getComponentDefaults(componentName) {
      // First check local components
      if (componentDefaults.has(componentName)) {
        return componentDefaults.get(componentName);
      }

      // Check imported components
      const importPath = importMap.get(componentName);
      if (!importPath) {
        return null;
      }

      const resolvedPath = resolveImportPath(importPath, filename);
      if (!resolvedPath) {
        return null;
      }

      const fileDefaults = parseFileForDefaults(resolvedPath);
      if (fileDefaults.has(componentName)) {
        return fileDefaults.get(componentName);
      }

      return null;
    }

    /**
     * Helper to register component defaults
     * @param {string} componentName - Name of the component
     * @param {ASTNode} params - Function parameters
     */
    function registerComponentDefaults(componentName, params) {
      const defaults = extractDefaults(params);
      if (hasKeys(defaults)) {
        componentDefaults.set(componentName, defaults);
      }
    }

    return {
      // Track import statements
      ImportDeclaration: (node) => {
        if (!node.source || !node.source.value) return;

        const importPath = node.source.value;

        for (const specifier of node.specifiers || []) {
          if (specifier.type === 'ImportSpecifier' || specifier.type === 'ImportDefaultSpecifier') {
            const importedName = specifier.local?.name || specifier.imported?.name;
            if (importedName) {
              importMap.set(importedName, importPath);
            }
          }
        }
      },

      // Track exported function components with default parameters
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator': (node) => {
        if (node.init?.type === 'ArrowFunctionExpression' && node.id?.type === 'Identifier') {
          registerComponentDefaults(node.id.name, node.init.params);
        }
      },

      // Also handle function declarations
      'ExportNamedDeclaration > FunctionDeclaration': (node) => {
        const componentName = getIdentifierName(node);
        if (componentName) {
          registerComponentDefaults(componentName, node.params);
        }
      },

      // Check JSX elements for redundant props
      JSXOpeningElement: (node) => {
        if (!node.name || node.name.type !== 'JSXIdentifier') {
          return;
        }

        const componentName = node.name.name;
        const defaults = getComponentDefaults(componentName);

        if (!hasKeys(defaults)) {
          return;
        }

        // Check each attribute
        for (const attribute of node.attributes || []) {
          if (attribute.type !== 'JSXAttribute' || !attribute.name) {
            continue;
          }

          const propName = attribute.name.name;
          const defaultValue = defaults[propName];

          if (defaultValue === undefined) {
            continue;
          }

          const passedValue = getJSXAttributeValue(attribute);

          // Only warn if we can determine the value and it matches the default
          if (passedValue !== undefined && valuesEqual(passedValue, defaultValue)) {
            context.report({
              node: attribute,
              messageId: 'redundantDefaultProp',
              data: {
                propName,
                value: String(passedValue),
              },
              fix(fixer) {
                return createFix(fixer, context, attribute);
              },
            });
          }
        }
      },
    };
  },
};
