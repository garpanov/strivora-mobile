import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../main/design-tokens';
import { useTranslation } from 'react-i18next';

type Props = {
  streakDays: number;
  aiInsight: string;
};

export default function HeaderTask() {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{t("tasks.title")}</Text>
      <Text style={styles.subtitle}>{t("tasks.subtitle")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  display: {
    ...typography.display,
    color: '#ffffff'
  },
  subtitle: {
    fontSize: 14,
    color: "#A1A1AA",
  },
});