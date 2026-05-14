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

const EXPENSES: ExpenseItem[] = [
  { id: '1', label: 'Житло',    icon: '🏠', percent: 32, amount: 22400 },
  { id: '2', label: 'Продукти', icon: '🛒', percent: 18, amount: 12600 },
  { id: '3', label: 'Розваги',  icon: '🎬', percent: 10, amount: 7000  },
];

export default function FinanceScreen() {
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
          total={1420}
          expenses={[
            { category: ExpenseCategory.Necessities, amount: 320 },
            { category: ExpenseCategory.Entertainment, amount: 1100 },
          ]}
        />
        <MonthlyIncomeCard amount={84000} bars={[30, 60, 45, 80, 95, 55]} />
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