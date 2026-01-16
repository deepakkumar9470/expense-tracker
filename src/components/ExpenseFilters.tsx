import { EXPENSE_CATEGORIES, type Filters } from "../types/expense";

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const ExpenseFilters = ({ filters, setFilters }: Props) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {EXPENSE_CATEGORIES?.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={() => setFilters({ category: '', from: '', to: '' })}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg px-4 
          py-2 text-sm font-medium transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilters;
