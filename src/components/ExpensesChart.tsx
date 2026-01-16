import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { CategoryTotal, Expense, ExpenseCategory } from '../types/expense';

const ExpensesChart = ({ expenses }: { expenses: Expense[] }) => {
  const chartData: CategoryTotal[] = Object.values(
    expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { category: item.category, amount: 0 };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {} as Record<ExpenseCategory, CategoryTotal>)
  );
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">
        Expenses by Category
      </h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="category" 
              stroke="#71717a" 
              tick={{ fill: '#a1a1aa' }}
              tickLine={false}
            />
            <YAxis 
              stroke="#71717a" 
              tick={{ fill: '#a1a1aa' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#18181b', 
                border: '1px solid #27272a',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              labelStyle={{ color: '#fff', fontWeight: '500' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Bar 
              dataKey="amount" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesChart;
