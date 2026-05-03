import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  amount: number;
  currency?: string;
  label?: string;
  // Heights as relative values (0–100)
  bars?: number[];
};

const DEFAULT_BARS = [45, 55, 40, 65, 90, 70];

export default function MonthlyIncomeCard({
  amount,
  currency = '₴',
  bars = DEFAULT_BARS,
}: Props) {
  const { t } = useTranslation();
  const isEmpty = amount === 0;

  const maxBar = Math.max(...bars);

  return (
    <View style={styles.card}>
      {/* Logo icon top-right */}
      <View style={styles.logoWrap}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner} />
        </View>
      </View>

      {/* Label */}
      <Text style={styles.label}>{t("finance_monthly_income_label")}</Text>

      {/* Amount */}
      <Text style={styles.amount}>
        {currency}{amount.toLocaleString('uk-UA')}
      </Text>

      {/* Bottom section */}
      {isEmpty ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Даних за цей місяць ще немає</Text>
        </View>
      ) : (
        <View style={styles.barsWrap}>
          {bars.map((h, i) => {
            const heightPct = (h / maxBar) * 100;
            const isHighest = h === maxBar;
            return (
              <View
                key={i}
                style={[
                  styles.bar,
                  {
                    height: `${heightPct}%` as any,
                    backgroundColor: isHighest ? '#2DC4A0' : '#1A4A40',
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0D2B25',
    borderRadius: 20,
    padding: 24,
    paddingBottom: 17,
    overflow: 'hidden',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    // Fixed size — adjust to fit your layout
    width: '100%',
    aspectRatio: 1.75,
  },

  // ── Logo ──────────────────────────────────────────────────
  logoWrap: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  logoOuter: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#1A4A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#1A4A40',
  },

  // ── Text ──────────────────────────────────────────────────
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#2DC4A0',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  amount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  // ── Bars ─────────────────────────────────────────────────
  barsWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 16,
  },
  bar: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  // ── Empty state ───────────────────────────────────────────
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  emptyText: {
    color: '#4A8070',
    fontSize: 14,
    textAlign: 'center',
  },
});