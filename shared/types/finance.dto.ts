export enum ExpenseCategory {
  Necessities = "Necessities",
  Entertainment = "Entertainment",
  Growth = "Growth",
  Other = "Other"
}

export type Expense = {
    id: string;
    name: string;
    amount: string;
    category: ExpenseCategory;
    date: Date;
}