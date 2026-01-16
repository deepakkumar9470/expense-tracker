import { test, expect } from '@playwright/test';

const EXPENSE = {
  amount: '500',
  category: 'Food',
  date: '2025-01-15',
  description: 'Lunch at cafe',
};

test.describe('Expense Tracker E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can add a new expense', async ({ page }) => {
    await page.getByRole('button', { name: /add expense/i }).click();
    await page.getByPlaceholder('1000').fill(EXPENSE.amount);
    await page.getByRole('combobox').selectOption({ label: EXPENSE.category });
    await page.locator('input[type="date"]').fill(EXPENSE.date);
    await page.getByPlaceholder('Enter description').fill(EXPENSE.description);

    await page.getByRole('button', { name: /save expense/i }).click();
    await expect(page.getByText(EXPENSE.description)).toBeVisible();
    await expect(page.getByText(`₹${EXPENSE.amount}`)).toBeVisible();
  });

  test('User can delete an expense', async ({ page }) => {
    const expenseItem = page.getByText(EXPENSE.description);
    await expect(expenseItem).toBeVisible();

    await expenseItem.locator('xpath=..').getByRole('button', { name: /✕/ }).click();

    await expect(page.getByText(EXPENSE.description)).not.toBeVisible();
  });

  test('User can filter expenses by category and date', async ({ page }) => {
    const expenses = [
      { amount: '100', category: 'Food', date: '2025-01-10', description: 'Breakfast' },
      { amount: '200', category: 'Travel', date: '2025-01-12', description: 'Taxi' },
    ];

    for (const exp of expenses) {
      await page.getByRole('button', { name: /add expense/i }).click();
      await page.getByPlaceholder('1000').fill(exp.amount);
      await page.getByRole('combobox').selectOption({ label: exp.category });
      await page.locator('input[type="date"]').fill(exp.date);
      await page.getByPlaceholder('Enter description').fill(exp.description);
      await page.getByRole('button', { name: /save expense/i }).click();
      await expect(page.getByText(exp.description)).toBeVisible();
    }

    const categoryFilter = page.getByRole('combobox', { name: '' });
    const fromDate = page.locator('input[type="date"]').first();
    const toDate = page.locator('input[type="date"]').nth(1);

    await categoryFilter.selectOption('Food');
    await fromDate.fill('2025-01-09');
    await toDate.fill('2025-01-11');

    await page.getByRole('button', { name: /apply/i }).click();

    await expect(page.getByText('Breakfast')).toBeVisible();
    await expect(page.getByText('Taxi')).not.toBeVisible();
  });
});
