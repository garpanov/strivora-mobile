import { useState } from 'react';
import { useExpensesStore } from '@/store/useExpenses';
import { Expense, ExpenseCategory } from '@shared/types';
import { useRouter } from 'expo-router';

export type Props = {
  expense: Expense;
};

export function useCreateExpense({ expense }: Props) {
  const router = useRouter();
  const createExpense = useExpensesStore((state) => state.addExpense);
  const updateExpense = useExpensesStore((state) => state.updateExpense);
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState<Date>(expense.date);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: name.trim().length === 0 || name.trim().length < 3 || name.trim().length > 100,
    amount: Number(amount) < 1,
    category: !category,
    date: !date,
  };

  const isValid = Object.values(errors).every((e) => e === false);

  const handleSave = async () => {
    setSubmitted(true);
    if (!isValid) return;
    try {
        createExpense({
          id: "1",
          name: name.trim(),
          amount: amount,
          category,
          date,
        });
      router.back();

    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleUpdate = async () => {
    setSubmitted(true);
    if (!isValid) return;
    try {
      updateExpense(expense.id, {
        name: name.trim(),
        amount,
        category,
        date,
      });
      router.back();

    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return {
    name, setName,
    amount, setAmount,
    category, setCategory,
    date, setDate,
    isValid,
    errors: {
      name: submitted && errors.name,
      amount: submitted && errors.amount,
      category: submitted && errors.category,
      date: submitted && errors.date,
    },
    handleSave,
    handleUpdate,
  };
}


export function useDeleteExpense() {
  const router = useRouter();
  const deleteExpense = useExpensesStore((state) => state.deleteExpense);

  const handleDelete = (expenseId: string) => {
    deleteExpense(expenseId);
    router.back();
  };

  return { handleDelete };
}
