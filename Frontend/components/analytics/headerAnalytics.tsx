import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../main/design-tokens';
import { useTranslation } from 'react-i18next';

export default function HeaderAnalytics() {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Analyze your life</Text>
      <Text style={styles.display}>{t('analysis_hero_title')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  display: {
    ...typography.display,
    letterSpacing: 0.7,
    lineHeight: 50,
    color: '#FFFFFF',
    marginLeft: 3,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: spacing.xs,
    color: "#8BF1E6",
    fontFamily: "Manrope_600SemiBold",
    letterSpacing: 1.5,
  },
});