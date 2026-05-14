import { create } from "zustand";

import { Expense } from "@shared/types";

type ExpensesStore = {
    expenses: Expense[];

    addExpense: (expense: Expense) => void;
    updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
    deleteExpense: (id: string) => void;
}

export const useExpensesStore = create<ExpensesStore>((set) => ({
    expenses: [],

    addExpense: (expense) => {
        set((state) => ({
            expenses: [...state.expenses, expense]
        }));
    },

    updateExpense: (id, updatedExpense) => {
        set((state) => ({
            expenses: state.expenses.map((expense) =>
                expense.id === id ? { ...expense, ...updatedExpense } : expense
            )
        }));
    },

    deleteExpense: (id) => {
        set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id)
        }));
    }
}));
