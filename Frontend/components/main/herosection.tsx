import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from './design-tokens';
import { useTranslation } from 'react-i18next';

type Props = {
  streakDays: number;
  aiInsight: string;
};

export default function HeroSection({ streakDays, aiInsight }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Display — hero moment, tight tracking, big scale */}
      <Text style={styles.display}>{streakDays} {t('main.hero.title.more')}</Text>

      {/* AI Insight card — surfaceContainerLow, no border */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>◈</Text>
          <Text style={styles.cardLabel}>{t("main.ai.analysis.label")}</Text>
        </View>
        <Text style={styles.cardBody}>{aiInsight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    gap: spacing.xl,
  },
  display: {
    ...typography.display,
    color: '#ffffff',
    marginHorizontal: spacing.md,
  },
  card: {
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderColor: 'rgba(195,198,207,0.05)',
    borderWidth: 1,
    padding: spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cardIcon: {
    fontSize: 16,
    color: colors.primary,
  },
  cardLabel: {
    ...typography.label,
    color: colors.primary,
  },
  cardBody: {
    ...typography.body,
    color: colors.onSurfaceVariant,
  },
});