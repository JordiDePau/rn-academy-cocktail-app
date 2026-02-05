
export const tokens = {
  colors: {
    // Core surfaces (deep purple)
    bg0: '#0B0515', // deepest
    bg1: '#140726', // base
    bg2: '#1A0A33', // raised
    bg3: '#23103F', // cards/controls

    // Overlay / glass
    overlay: 'rgba(10, 5, 20, 0.55)',
    overlayStrong: 'rgba(10, 5, 20, 0.75)',

    // Text
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.65)',
    textSubtle: 'rgba(255,255,255,0.45)',

    // Accent (gold)
    accent: '#F3C24B',
    accentSoft: 'rgba(243, 194, 75, 0.25)',

    // Lines / borders
    line: 'rgba(255,255,255,0.08)',
    lineStrong: 'rgba(255,255,255,0.12)',

    // Utility
    shadow: 'rgba(0,0,0,0.35)',
    danger: '#FF5A5F',
    success: '#3DDC97',
  },

  gradient: {
    // Use with LinearGradient (top -> bottom)
    screen: ['#140726', '#1A0A33', '#120522'],
    header: ['rgba(20,7,38,0.0)', 'rgba(20,7,38,0.75)'],
  },

  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 22,
    xl: 28,
    xxl: 34,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 22,
    pill: 999,
  },

  border: {
    hairline: 1,
    thin: 1,
    thick: 2,
  },

  icon: {
    sm: 18,
    md: 22,
    lg: 26,
  },
  typography: {
    // If you use custom fonts, swap these
    fontFamily: {
      regular: 'CrimsonText-Regular',
      italic: 'CrimsonText-Italic',
      semiBold: 'CrimsonText-SemiBold',
      semiBoldItalic: 'CrimsonText-SemiBoldItalic',
      bold: 'CrimsonText-Bold',
      boldItalic: 'CrimsonText-BoldItalic',
      title: 'BondoniModa-Regular',
      titleItalic: 'BondoniModa-Italic',
    },

    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 36,
    },

    lineHeight: {
      xs: 16,
      sm: 20,
      md: 22,
      lg: 26,
      xl: 28,
      xxl: 36,
    },

    letterSpacing: {
      tight: 0.2,
      wide: 2.0, // INGREDIENTS / ABOUT
    },

    weight: {
      regular: '400' as const,
      medium: '500' as const,
      semi: '600' as const,
      bold: '700' as const,
    },
  },
};