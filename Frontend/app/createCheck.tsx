// CreateTaskScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { spacing } from '@/components/main/design-tokens';
import Return from '@/components/menu/return';
import HeaderCreateCheck from '@/components/createCheck/header';
import { TransactionInput } from '@/components/createCheck/inputCurrency';
import CategorySelector from '@/components/createCheck/setCategory';
import { ExpenseCategory, Expense } from '@shared/types';
import DescriptionSection from '@/components/createCheck/inputDescription';
import WhenPicker from '@/components/createCheck/setDate';
import { useCreateExpense } from '@/hooks/finance/createExpenses';
import SaveButton from '@/components/create_tasks/buttonCreate';

const defaultExpense: Expense = {
  id: "1",
  name: "",
  amount: "",
  category: ExpenseCategory.Necessities,
  date: new Date(),
};

export default function CreateCheckScreen() {
  const {
      name, setName,
      amount, setAmount,
      category, setCategory,
      date, setDate,
      errors,
      handleSave,
    } = useCreateExpense({
      expense: defaultExpense
    });
  

  return (
    <View style={styles.screen}>
      <Return />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ ...styles.content, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCreateCheck />

        <TransactionInput onChange={(value) => console.log(value)} />
        <CategorySelector selected={category} onSelect={setCategory} />

        <DescriptionSection />

        <WhenPicker
          date={date}
          onSelect={({ date: picked }) => {
          if (picked) setDate(picked);
          }}
        />

        <SaveButton onPress={handleSave} />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 15,
    flex: 1,
    backgroundColor: '#0d0d0d',
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