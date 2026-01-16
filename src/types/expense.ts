export type ExpenseCategory = 'Food' | 'Travel' | 'Shopping' | 'Bills';
export const EXPENSE_CATEGORIES = ["Food", "Travel", "Shopping", "Bills"] as const;

export type Expense = {
  id: number;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
};

export type Filters = {
  category: string;
  from: string;
  to: string;
};

export type CategoryTotal = {
  category: ExpenseCategory;
  amount: number;
};
