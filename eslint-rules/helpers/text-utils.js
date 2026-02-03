/**
 * Text and line manipulation utility functions for ESLint rules
 */

/**
 * Finds the position after a newline character, handling both \n and \r\n
 * @param {string} fullText - Full source text
 * @param {number} newlinePos - Position of the newline character
 * @returns {number} Position after the newline
 */
function getPositionAfterNewline(fullText, newlinePos) {
  if (
    fullText[newlinePos] === '\r' &&
    newlinePos + 1 < fullText.length &&
    fullText[newlinePos + 1] === '\n'
  ) {
    return newlinePos + 2;
  }
  return newlinePos + 1;
}

/**
 * Finds the start of the line by searching backwards for a newline
 * @param {string} fullText - Full source text
 * @param {number} attributeStart - Start position of attribute
 * @param {number} parentStart - Start position of parent element
 * @returns {number|null} Line start position or null if not found
 */
function findNewlineBackwards(fullText, attributeStart, parentStart) {
  for (let i = attributeStart - 1; i >= parentStart; i--) {
    if (fullText[i] === '\n' || fullText[i] === '\r') {
      return getPositionAfterNewline(fullText, i);
    }
  }
  return null;
}

/**
 * Finds the start position after the opening tag, skipping whitespace
 * @param {string} fullText - Full source text
 * @param {number} parentStart - Start position of parent element
 * @param {number} attributeStart - Start position of attribute
 * @returns {number} Line start position
 */
function findStartAfterOpeningTag(fullText, parentStart, attributeStart) {
  for (let i = parentStart; i < attributeStart; i++) {
    if (fullText[i] === '>') {
      let lineStart = i + 1;
      // Skip whitespace after >
      while (
        lineStart < attributeStart &&
        (fullText[lineStart] === ' ' || fullText[lineStart] === '\t')
      ) {
        lineStart++;
      }
      return lineStart;
    }
  }
  return attributeStart;
}

/**
 * Finds the start of the line containing the attribute
 * @param {string} fullText - Full source text
 * @param {number} attributeStart - Start position of attribute
 * @param {number} parentStart - Start position of parent element
 * @returns {number} Line start position
 */
function findLineStart(fullText, attributeStart, parentStart) {
  const newlineStart = findNewlineBackwards(fullText, attributeStart, parentStart);
  if (newlineStart !== null) {
    return newlineStart;
  }

  // If we didn't find a newline, start from after the opening tag
  return findStartAfterOpeningTag(fullText, parentStart, attributeStart);
}

/**
 * Finds the end of the line containing the attribute
 * @param {string} fullText - Full source text
 * @param {number} attributeEnd - End position of attribute
 * @returns {number} Line end position
 */
function findLineEnd(fullText, attributeEnd) {
  for (let i = attributeEnd; i < fullText.length; i++) {
    if (fullText[i] === '\n' || fullText[i] === '\r') {
      return getPositionAfterNewline(fullText, i);
    }
  }
  return attributeEnd;
}

module.exports = {
  findLineStart,
  findLineEnd,
};
