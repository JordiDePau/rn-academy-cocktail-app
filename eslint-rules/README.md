# Custom ESLint Rules

This directory contains custom ESLint rules for the codebase.

## Rules

### `no-redundant-default-props`

Warns when props are passed with values that match their default values. This rule supports autofix to automatically remove redundant props.

#### Example

```tsx
// Component definition
export const Button = ({ variant = 'primary', disabled = false }: Props) => {
  // ...
};

// ❌ This would trigger a warning
<Button variant="primary" disabled={false} />

// ✅ This is correct
<Button />
<Button variant="secondary" />
```

#### Features

- **Cross-file component tracking**: The rule tracks components defined in other files by parsing import statements and resolving component definitions.
- **Autofix support**: Automatically removes redundant props with proper spacing handling for both single-line and multi-line JSX formatting.
- **Multi-line JSX support**: When a redundant prop is on its own line, the entire line (including newline) is removed to avoid leaving empty lines.

#### Current Limitations

1. **Static values only**: The rule only works with static values (strings, numbers, booleans, null). It cannot detect redundant props when the value is computed or comes from a variable.

2. **ES6 default parameters only**: The rule only works with ES6 default parameters in function signatures. It does not support `defaultProps` (which is deprecated in modern React anyway).

3. **Regex-based parsing for imported components**: When parsing imported component files, the rule uses regex patterns to extract default values. This means it may not handle all edge cases (e.g., complex default value expressions, template literals, etc.).

#### Future Improvements

- Support for computed default values
- Better handling of complex expressions in default parameters
- TypeScript-aware parsing for more accurate default value detection
