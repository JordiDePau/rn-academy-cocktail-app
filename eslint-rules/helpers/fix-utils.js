/**
 * Fix creation utility functions for ESLint rules
 */

const { findLineStart, findLineEnd } = require('./text-utils');

/**
 * Creates a fix to remove a redundant attribute
 * @param {Object} fixer - ESLint fixer
 * @param {Object} context - ESLint context
 * @param {ASTNode} attribute - JSX attribute node
 * @returns {Object} Fix object
 */
function createFix(fixer, context, attribute) {
  const sourceCode = context.getSourceCode();
  const parent = attribute.parent; // JSXOpeningElement

  if (!parent || parent.type !== 'JSXOpeningElement') {
    return fixer.remove(attribute);
  }

  const attributes = parent.attributes || [];
  const attributeIndex = attributes.indexOf(attribute);
  const isLastAttribute = attributeIndex === attributes.length - 1;

  const tokenBefore = sourceCode.getTokenBefore(attribute);
  const tokenAfter = sourceCode.getTokenAfter(attribute);

  // Get text before and after the attribute
  const textBefore = tokenBefore
    ? sourceCode.getText().slice(tokenBefore.range[1], attribute.range[0])
    : '';
  const textAfter = tokenAfter
    ? sourceCode.getText().slice(attribute.range[1], tokenAfter.range[0])
    : '';

  // Check if the attribute is on its own line
  const isOnOwnLine = textBefore.includes('\n') || textBefore.includes('\r');

  // Determine the range to remove
  let start = attribute.range[0];
  let end = attribute.range[1];

  if (isOnOwnLine) {
    // Attribute is on its own line - remove the entire line including newline
    const fullText = sourceCode.getText();
    start = findLineStart(fullText, attribute.range[0], parent.range[0]);
    end = findLineEnd(fullText, attribute.range[1]);
  } else if (isLastAttribute) {
    // If it's the last attribute on the same line, remove the leading space
    if (textBefore.trim() === '' && textBefore.length > 0 && !textBefore.includes('\n')) {
      start = attribute.range[0] - textBefore.length;
    }
  } else if (textAfter.trim() === '' && textAfter.length > 0 && !textAfter.includes('\n')) {
    // If it's not the last attribute on the same line, remove the trailing space
    end = attribute.range[1] + textAfter.length;
  }

  return fixer.removeRange([start, end]);
}

module.exports = {
  createFix,
};
