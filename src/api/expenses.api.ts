import axios from 'axios';
import type { Expense } from '../types/expense';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const fetchExpenses = async (): Promise<Expense[]> =>
  (await api.get('/expenses')).data;

export const createExpense = (data: Omit<Expense, 'id'>) =>
  api.post('/expenses', data);

export const deleteExpense = (id: number) =>
  api.delete(`/expenses/${id}`);
