import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from './design-tokens';
import { useTranslation } from 'react-i18next';

type StatItem = {
  time_value: string;
  energy_value: string;
};


export default function StatsRow({stats}: {stats: StatItem}) {
  const { t, i18n } = useTranslation();
  
  return (
    <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.icon}>⏱</Text>
          <Text style={styles.value}>{stats.time_value}</Text>
          <Text style={styles.label}>{t('main.stats.focus.label')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.icon}>⚡</Text>
          <Text style={styles.value}>{stats.energy_value}</Text>
          <Text style={styles.label}>{t('main.stats.energy.label')}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: spacing.sm,
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 20,
    gap: 6,
  },
  icon: {
    fontSize: 22,
    marginBottom: 4,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#c3c6cf',
  },
});