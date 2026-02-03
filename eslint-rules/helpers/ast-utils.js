/**
 * AST-related utility functions for ESLint rules
 */

/**
 * Extracts the actual value from an AST node
 * @param {ASTNode} node - AST node
 * @returns {*} The extracted value or undefined
 */
function getDefaultValue(node) {
  if (!node) return undefined;

  switch (node.type) {
    case 'Literal':
    case 'BooleanLiteral':
    case 'StringLiteral':
    case 'NumericLiteral':
      return node.value;
    case 'NullLiteral':
      return null;
    case 'Identifier': {
      // For identifiers like 'true', 'false', 'undefined', 'null'
      const identifierValues = {
        true: true,
        false: false,
        undefined: undefined,
        null: null,
      };
      return identifierValues[node.name] ?? undefined;
    }
    default:
      return undefined;
  }
}

/**
 * Compares two values for equality
 * @param {*} value1
 * @param {*} value2
 * @returns {boolean}
 */
function valuesEqual(value1, value2) {
  // Handle null and undefined
  if (value1 === null && value2 === null) return true;
  if (value1 === undefined && value2 === undefined) return true;

  // Strict equality for primitives
  return value1 === value2;
}

/**
 * Extracts default value from a single property
 * @param {ASTNode} prop - Property node
 * @returns {Object|null} Object with propName and defaultValue, or null
 */
function extractPropertyDefault(prop) {
  if (prop.type !== 'Property' || !prop.key || !prop.value) {
    return null;
  }

  const propName = prop.key.name || prop.key.value;
  if (prop.value.type !== 'AssignmentPattern') {
    return null;
  }

  const defaultValue = getDefaultValue(prop.value.right);
  if (defaultValue === undefined) {
    return null;
  }

  return { propName, defaultValue };
}

/**
 * Gets the value from a JSX attribute
 * @param {ASTNode} attribute - JSX attribute node
 * @returns {*} The extracted value or undefined
 */
function getJSXAttributeValue(attribute) {
  if (!attribute.value) {
    // Boolean attribute without value (e.g., <Button disabled />)
    return true;
  }

  // JSX string literal (e.g., variant="primary")
  if (attribute.value.type === 'Literal') {
    return attribute.value.value;
  }

  // JSX expression container (e.g., variant={"primary"} or variant={true})
  if (attribute.value.type === 'JSXExpressionContainer') {
    const expression = attribute.value.expression;
    return getDefaultValue(expression);
  }

  return undefined;
}

/**
 * Extracts default values from function parameters
 * @param {ASTNode} params - Function parameters node
 * @returns {Object} Object mapping parameter names to their default values
 */
function extractDefaults(params) {
  const defaults = {};

  if (!params || !Array.isArray(params)) {
    return defaults;
  }

  // Handle single parameter (destructured object)
  if (params.length !== 1 || params[0].type !== 'ObjectPattern') {
    return defaults;
  }

  const properties = params[0].properties || [];
  for (const prop of properties) {
    const result = extractPropertyDefault(prop);
    if (result) {
      defaults[result.propName] = result.defaultValue;
    }
  }

  return defaults;
}

module.exports = {
  getDefaultValue,
  valuesEqual,
  extractPropertyDefault,
  getJSXAttributeValue,
  extractDefaults,
};
