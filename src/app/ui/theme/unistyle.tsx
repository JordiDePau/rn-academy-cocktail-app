import { StyleSheet } from 'react-native-unistyles';

import { tokens } from './tokens';

export const dark = {
  colors: {
    ...tokens.colors,
    background: tokens.colors.bg1,
    surface: tokens.colors.bg2,
  },
  spacing: { ...tokens.spacing },
  typography: { ...tokens.typography },
  border: { ...tokens.border },
  icon: { ...tokens.icon },
  gradient: { ...tokens.gradient },
} as const;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    dark: typeof dark;
  }
}

StyleSheet.configure({
  themes: { dark },
  settings: {
    initialTheme: 'dark',
    adaptiveThemes: false,
  },
});