export const colors = {
  // Foundations
  background:               '#000000', // The Void
  surface:                  '#131313', // Base Layer
  surfaceContainerLow:      '#080808ff', // Cards
  surfaceContainerMedium:   '#0b0b0bff', // Medium emphasis
  surfaceContainerHigh:     '#303030ff', // Nested elements
  surfaceContainerHighest:  '#353535', // Closest to user

  // Primary accent — use sparingly, like a laser
  primary:                  '#8bf1e6',
  primaryFixed:             '#8ef4e9',
  onPrimary:                '#003733',

  // Secondary / neutral slate
  secondary:                '#b8c8da',
  secondaryContainer:       '#394857',
  onSecondaryContainer:     '#a7b7c8',

  // Text
  onSurface:                '#e2e2e2',
  onSurfaceVariant:         '#bdc9c6',

  // Ghost border fallback (use at 15% opacity)
  outlineVariant:           '#3d4947',
};

export const typography = {
  // Display — hero moments only
  display: {
    fontSize: 46,
    fontWeight: '800' as const,
    letterSpacing: -1.2,
    lineHeight: 60,
    fontFamily: 'Manrope-ExtraBold'
  },
  // Headline — section starts
  headline: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
    fontFamily: 'Manrope-Bold',
  },
  // Body
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 26,
    color: colors.onSurface,
    fontFamily: 'Manrope-Regular',
  },
  // Label — metadata, always uppercase
  label: {
    fontSize: 14,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    fontFamily: 'Manrope-Bold',
  },
};

export const radius = {
  sm: 4,
  md: 8,   // lg in design system — standard for all components
  full: 9999,
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const shadow = {
  ambient: {
    shadowColor: '#001a2c',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
  },
};