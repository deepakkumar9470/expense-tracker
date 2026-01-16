import { useState, useMemo } from "react";
import SummaryCards from "../components/SummaryCards";
import ExpenseFilters from "../components/ExpenseFilters";
import { useExpenses } from "../hooks/useExpenses";
import type { Filters } from "../types/expense";
import { lazy, Suspense } from "react";
import LoadingButton from "../components/shared/LoadingButton";
import LoadingSkeleton from "../components/shared/LoadingSkeleton";
import ChartSkeleton from "../components/shared/ChartSkeleton";

const ExpenseFormLazy = lazy(() => import("../components/ExpenseForm"));
const ExpensesChartLazy = lazy(() => import("../components/ExpensesChart"));
const ExpenseListLazy = lazy(() => import("../components/ExpenseList"));

const Dashboard = () => {
  const { data = [] } = useExpenses();
  const [filters, setFilters] = useState<Filters>({
    category: "",
    from: "",
    to: "",
  });

  const filteredExpenses = useMemo(() => {
    return data.filter((exp) => {
      const matchCategory = filters.category
        ? exp.category === filters.category
        : true;
      const expDate = new Date(exp.date).getTime();
      const fromDate = filters.from ? new Date(filters.from).getTime() : null;
      const toDate = filters.to ? new Date(filters.to).getTime() : null;
      const matchFrom = fromDate ? expDate >= fromDate : true;
      const matchTo = toDate ? expDate <= toDate : true;
      return matchCategory && matchFrom && matchTo;
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Expense Tracker</h1>
          <Suspense fallback={<LoadingButton />}>
            <ExpenseFormLazy />
          </Suspense>
        </div>

        <div className="mb-6">
          <SummaryCards expenses={filteredExpenses} />
        </div>

        {/* Show empty state if no data */}
        {filteredExpenses.length === 0 ? (
          <div className="text-center text-zinc-400 py-20">
            <p className="text-xl font-medium">No expenses found</p>
            <p className="text-sm mt-2">
              Add your first expense to see analytics & filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <ExpenseFilters filters={filters} setFilters={setFilters} />
              <Suspense fallback={<LoadingSkeleton />}>
                <ExpenseListLazy expenses={filteredExpenses} />
              </Suspense>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-6">
                <Suspense fallback={<ChartSkeleton />}>
                  <ExpensesChartLazy expenses={filteredExpenses} />
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
