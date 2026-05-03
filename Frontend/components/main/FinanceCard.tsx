import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius, shadow } from './design-tokens';
import { useTranslation } from 'react-i18next';

const DEFAULT_BARS = [0.3, 0.45, 0.25, 0.6, 0.85, 0.5, 0.95];

type Props = {
  balance: string;
  changePercent: string;
  changePeriod?: string;
  bars?: number[];
};

export default function FinanceCard({
  balance,
  changePercent,
  bars = DEFAULT_BARS,
}: Props) {
  const { t, i18n } = useTranslation();
  return (
    // surface_container_lowest = background = The Void, with navy ambient shadow
    <View style={styles.card}>
      <Text style={styles.label}>{t('main.mind.balance.label')}</Text>
      <Text style={styles.balance}>{balance}</Text>

      {/* Mini bar chart */}
      <View style={styles.chart}>
        {bars.map((h, i) => {
          const isLast = i === bars.length - 1;
          return (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  flex: 1,
                  height: `${h * 100}%` as any,
                  opacity: isLast ? 1 : 0.15 + h * 0.45,
                },
              ]}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.change}>↑ {changePercent}</Text>
        <Text style={styles.period}>{t("main.mind.balance.period")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background, // The Void
    borderRadius: radius.md,
    padding: spacing.xl,
    ...shadow.ambient,
    // Ghost border fallback for accessibility
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // outlineVariant at 15%
  },
  label: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    fontSize: spacing.sm,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  balance: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 120,
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  bar: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  change: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  period: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    fontSize: 10,
  },
});