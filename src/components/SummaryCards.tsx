import type { Expense } from "../types/expense";
import { IndianRupee, TrendingUp } from "lucide-react";

const SummaryCards = ({ expenses }: { expenses: Expense[] }) => {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg border border-blue-500/20">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/10 p-2 rounded-lg">
          <TrendingUp size={20} className="text-white" />
        </div>
        <p className=" text-blue-100 text-sm font-medium">Total Expenses</p>
      </div>
      <p className="flex items-center text-4xl font-bold text-white">
        <IndianRupee size={45} /> {total.toLocaleString()}/-
      </p>
    </div>
  );
};

export default SummaryCards;
