import { Expense, ExpenseCategory } from "@shared/types";

export function costExpensesForToday(expenses: Expense[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const expenses_today = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= today && expenseDate < tomorrow;
  });

  const all_cost = expenses_today.reduce((acc, expense) => acc + Number(expense.amount), 0);
  return all_cost;
}

export function costExpensesForMonth(expenses: Expense[]) {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const expenses_month = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
  });

  const all_cost = expenses_month.reduce((acc, expense) => acc + Number(expense.amount), 0);
  return all_cost;
}

export function CalculateCostCategoryToday(expenses: Expense[]) {
  const categories = {
    [ExpenseCategory.Necessities]: 0,
    [ExpenseCategory.Entertainment]: 0,
    [ExpenseCategory.Growth]: 0,
    [ExpenseCategory.Other]: 0,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const expenses_today = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= today && expenseDate < tomorrow;
  });

  expenses_today.forEach((expense) => {
    categories[expense.category] += Number(expense.amount);
  });

  return categories;
}

export function CalculateCostCategoryMonth(expenses: Expense[]) {
  const categories = {
    [ExpenseCategory.Necessities]: 0,
    [ExpenseCategory.Entertainment]: 0,
    [ExpenseCategory.Growth]: 0,
    [ExpenseCategory.Other]: 0,
  };

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  
  const expenses_month = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
  });

  expenses_month.forEach((expense) => {
    categories[expense.category] += Number(expense.amount);
  });

  const total = Object.values(categories).reduce((sum, val) => sum + val, 0);

  const percentages = Object.fromEntries(
    Object.entries(categories).map(([key, val]) => [
      key,
      total > 0 ? Math.round((val / total) * 100) : 0,
    ])
  ) as Record<ExpenseCategory, number>;

  return { amounts: categories, percentages };
}