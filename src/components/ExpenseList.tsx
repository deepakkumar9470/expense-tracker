import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import type { Expense, ExpenseCategory } from '../types/expense';
import { IndianRupee, Trash2 } from 'lucide-react';

const ExpenseList = ({ expenses }: { expenses: Expense[] }) => {
const { removeExpense } = useExpenses();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const paginated = expenses.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(expenses.length / pageSize);

  const categoryColors: Record<ExpenseCategory, string> = {
    Food: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Travel: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Shopping: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Bills: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return (
    <div className="space-y-3">
      {paginated?.map((exp) => (
        <div
          key={exp?.id}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium mb-1 truncate">{exp.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-1 rounded-md border ${categoryColors[exp.category]}`}>
                  {exp.category}
                </span>
                <span className="text-xs text-zinc-500">{exp.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className=" flex items-center text-lg font-semibold text-white whitespace-nowrap">
                <IndianRupee size={15}/>{" "} {exp.amount.toLocaleString()}/-
              </span>
              <button
                onClick={() => removeExpense.mutate(exp.id)}
                className="text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 
            transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            Prev
          </button>
          <span className="text-zinc-400 text-sm px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 
            transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
