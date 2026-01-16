import { z } from 'zod';

export const expenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.enum(['Food', 'Travel', 'Shopping', 'Bills']),
  date: z.string(),
  description: z.string().min(3),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;