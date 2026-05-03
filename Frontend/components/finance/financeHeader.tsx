import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../main/design-tokens';
import { useTranslation } from 'react-i18next';

export default function HeaderFinance() {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{t("finance_section_label")}</Text>
      <Text style={styles.display}>{t("finance_main_heading")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs
  },
  display: {
    ...typography.display,
    letterSpacing: 0.5,
    lineHeight: 50,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: spacing.xs,
    color: "#006A63",
    fontFamily: 'Inter_600SemiBold',
  },
});