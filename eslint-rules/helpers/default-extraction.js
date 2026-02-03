/**
 * Default value extraction utility functions for ESLint rules
 */

/**
 * Checks if an object has any keys
 * @param {Object} obj - Object to check
 * @returns {boolean} True if object has keys
 */
function hasKeys(obj) {
  return obj && Object.keys(obj).length > 0;
}

/**
 * Extracts default values from parameter content string
 * @param {string} paramsContent - Parameter content string
 * @returns {Object} Object mapping prop names to default values
 */
function extractDefaultsFromParams(paramsContent) {
  const componentDefaults = {};
  // Match: propName = 'value' or propName = "value" or propName = true/false/null/-5/10
  // Handle both single and double quotes, and identifiers (including negative numbers)
  const paramPattern = /(\w+)\s*=\s*(?:['"]([^'"]+)['"]|(true|false|null|-?\d+))/g;
  let paramMatch;

  while ((paramMatch = paramPattern.exec(paramsContent)) !== null) {
    const propName = paramMatch[1];
    const stringValue = paramMatch[2];
    const identifierValue = paramMatch[3];

    if (stringValue !== undefined) {
      componentDefaults[propName] = stringValue;
    } else if (identifierValue) {
      // Handle boolean, null, or numeric values
      if (identifierValue === 'true') {
        componentDefaults[propName] = true;
      } else if (identifierValue === 'false') {
        componentDefaults[propName] = false;
      } else if (identifierValue === 'null') {
        componentDefaults[propName] = null;
      } else if (/^-?\d+$/.test(identifierValue)) {
        componentDefaults[propName] = Number.parseInt(identifierValue, 10);
      }
    }
  }

  return componentDefaults;
}

/**
 * Processes a regex pattern match to extract component defaults
 * @param {RegExp} pattern - Regex pattern to match
 * @param {string} content - File content
 * @returns {Map} Map of componentName -> defaults
 */
function processPatternMatches(pattern, content) {
  const defaults = new Map();
  pattern.lastIndex = 0;
  let match;

  while ((match = pattern.exec(content)) !== null) {
    const componentName = match[1];
    const paramsContent = match[2];
    const componentDefaults = extractDefaultsFromParams(paramsContent);

    if (hasKeys(componentDefaults)) {
      defaults.set(componentName, componentDefaults);
    }
  }

  return defaults;
}

module.exports = {
  extractDefaultsFromParams,
  processPatternMatches,
  hasKeys,
};
