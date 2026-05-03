import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../main/design-tokens';
import { useTranslation } from 'react-i18next';

type Props = {
  streakDays: number;
  aiInsight: string;
};

export default function HeaderProfile() {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.display}>Профіль</Text>
      <Text style={styles.subtitle}>DISCIPLINED OBSERVER IDENTITY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  display: {
    ...typography.display,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: "#A1A1AA",
    letterSpacing: 2.2,
  },
});