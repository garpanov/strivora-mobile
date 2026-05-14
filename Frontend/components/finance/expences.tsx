import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ExpenseCategory } from '@shared/types';
import { useTranslation } from 'react-i18next';

type CategoryConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export const CATEGORY_CONFIG: Record<ExpenseCategory, CategoryConfig> = {
  [ExpenseCategory.Necessities]: {
    icon: 'restaurant-outline',
    color: '#26a69a',
  },
  [ExpenseCategory.Entertainment]: {
    icon: 'game-controller-outline',
    color: '#ab47bc',
  },
  [ExpenseCategory.Growth]: {
    icon: 'code-slash-outline',
    color: '#42a5f5',
  },
  [ExpenseCategory.Other]: {
    icon: 'ellipsis-horizontal-outline',
    color: '#9e9e9e',
  },
};

export const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  [ExpenseCategory.Necessities]: 'finance_expense_eat',
  [ExpenseCategory.Entertainment]: 'finance_expense_play',
  [ExpenseCategory.Growth]: 'finance_expense_growth',
  [ExpenseCategory.Other]: 'finance_expense_other',
};

type ExpenseItem = {
  category: ExpenseCategory;
  amount: number;
};

type Props = {
  total: number;
  expenses: ExpenseItem[];
};

const formatAmount = (amount: number) =>
  `₴${amount.toLocaleString('uk-UA')}`;

const CategoryRow = ({ category, amount}: ExpenseItem) => {
  const config = CATEGORY_CONFIG[category];
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: config.color + '22' }]}>
        <Ionicons name={config.icon} size={20} color={config.color} />
      </View>
      <Text style={styles.label}>{t(CATEGORY_LABEL[category])}</Text>
      <Text style={styles.amount}>{formatAmount(amount)}</Text>
    </View>
  );
};

const TodayExpenses = ({ total, expenses }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="trending-down-outline" size={18} color="#e53935" />
        <Text style={styles.headerText}>{t("finance_daily_expenses_label")}</Text>
      </View>

      <Text style={styles.total}>{formatAmount(total)}</Text>

      <View style={styles.divider} />

      {total === 0 || expenses.length === 0 ? (
        <Text style={styles.empty}>{t("finance_expense_empty")}</Text>
      ) : (
        expenses.map((item, index) => (
          <React.Fragment key={item.category}>
            <CategoryRow {...item} />
          </React.Fragment>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F0F0F',
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  headerText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  total: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1aff',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    color: '#ccc',
    fontSize: 15,
  },
  amount: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  empty: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default TodayExpenses;