import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type StatsCardsProps = {
  expenses: number;
  expensesPeriod: string;
  averageCheck: number;
};

export default function StatsCards({ expenses, expensesPeriod, averageCheck }: StatsCardsProps) {
  const fmt = (n: number) =>
    n.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>ВИТРАТИ</Text>
          <Ionicons name="trending-down-outline" size={18} color="#888" />
        </View>
        <Text style={styles.cardValue}>{fmt(expenses)}</Text>
        <Text style={styles.cardSubtitle}>UAH • {expensesPeriod.toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>СЕРЕДНІЙ ЧЕК</Text>
          <Ionicons name="bar-chart-outline" size={18} color="#888" />
        </View>
        <Text style={styles.cardValue}>{fmt(averageCheck)}</Text>
        <Text style={styles.cardSubtitle}>UAH • СЕРЕДНЄ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#888',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    color: '#00E5C4',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});