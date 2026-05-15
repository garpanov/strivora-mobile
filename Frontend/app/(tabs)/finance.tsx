import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { colors, spacing } from '@/components/main/design-tokens';
import Header from '@/components/header';
import HeaderFinance from '@/components/finance/financeHeader';
import TodayExpenses from '@/components/finance/expences';
import { ExpenseCategory } from '@shared/types';
import MonthlyIncomeCard from '@/components/finance/monthlyCard';
import MonthlyExpenses, { ExpenseItem } from '@/components/finance/monthlyExpences';
import AutomateAccountingCard from '@/components/finance/CreateCheck';
import InsightCard from '@/components/finance/insightCard';
import FinancialHero from '@/components/finance/financialHero';
import { useExpensesStore } from '@/store/useExpenses';
import { costExpensesForToday, CalculateCostCategoryToday, costExpensesForMonth, CalculateCostCategoryMonth } from '@/utils/finance.utils';

const EXPENSES: ExpenseItem[] = [
  { id: '1', label: 'Необхідне',    icon: '📌', percent: 32, amount: 22400 },
  { id: '2', label: 'Розваги', icon: '🎬', percent: 18, amount: 12600 },
  { id: '3', label: 'Розвиток',  icon: '🎯', percent: 10, amount: 7000  },
  { id: '4', label: 'Інше',  icon: '📦', percent: 10, amount: 7000  },
];

export default function FinanceScreen() {
  const expenses = useExpensesStore((state) => state.expenses);

  const totalExpensesToday = costExpensesForToday(expenses);
  const totalExpensesByCategory = CalculateCostCategoryToday(expenses);
  const totalExpensesThisMonth = costExpensesForMonth(expenses);
  const totalExpensesByCategoryMonth = CalculateCostCategoryMonth(expenses);

  const EXPENSES: ExpenseItem[] = [
  { id: '1', label: 'Необхідне',    icon: '📌', percent: totalExpensesByCategoryMonth.percentages[ExpenseCategory.Necessities], amount: totalExpensesByCategoryMonth.amounts[ExpenseCategory.Necessities] },
  { id: '2', label: 'Розваги', icon: '🎬', percent: totalExpensesByCategoryMonth.percentages[ExpenseCategory.Entertainment], amount: totalExpensesByCategoryMonth.amounts[ExpenseCategory.Entertainment] },
  { id: '3', label: 'Розвиток',  icon: '🎯', percent: totalExpensesByCategoryMonth.percentages[ExpenseCategory.Growth], amount: totalExpensesByCategoryMonth.amounts[ExpenseCategory.Growth] },
  { id: '4', label: 'Інше',  icon: '📦', percent: totalExpensesByCategoryMonth.percentages[ExpenseCategory.Other], amount: totalExpensesByCategoryMonth.amounts[ExpenseCategory.Other] },
];

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderFinance />
        <TodayExpenses
          total={totalExpensesToday}
          expenses={[
            { category: ExpenseCategory.Necessities, amount: totalExpensesByCategory[ExpenseCategory.Necessities] },
            { category: ExpenseCategory.Entertainment, amount: totalExpensesByCategory[ExpenseCategory.Entertainment] },
            { category: ExpenseCategory.Growth, amount: totalExpensesByCategory[ExpenseCategory.Growth] },
            { category: ExpenseCategory.Other, amount: totalExpensesByCategory[ExpenseCategory.Other] },
          ]}
        />
        <MonthlyIncomeCard amount={totalExpensesThisMonth} bars={[30, 60, 45, 80, 95, 55]} />
        <MonthlyExpenses items={EXPENSES} />
        <AutomateAccountingCard
          count={1}
          onAttachScreenshot={() => console.log('screenshot')}
        />
        <InsightCard percentage={15} category="каву" />
        <FinancialHero />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
});