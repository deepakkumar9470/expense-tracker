import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/expenses.api';

export const useExpenses = () => {
  const qc = useQueryClient();

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: api.fetchExpenses,
  });

  const addExpense = useMutation({
    mutationFn: api.createExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }),
  });

  const removeExpense = useMutation({
    mutationFn: api.deleteExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses'] }),
  });

  return { ...expensesQuery, addExpense, removeExpense };
};
