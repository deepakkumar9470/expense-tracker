import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, type ExpenseFormData } from "../schemas/expense.schema";
import { useExpenses } from "../hooks/useExpenses";
import { Plus, X } from "lucide-react";
import { EXPENSE_CATEGORIES } from "../types/expense";
import Spinner from "./shared/Spinner";

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: ExpenseFormData) => {
    addExpense.mutate(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
        <Plus size={18} />
        Add Expense
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-xl p-6 shadow-2xl border border-zinc-800 animate-in fade-in zoom-in-95">
          <Dialog.Title className="text-xl font-semibold text-white mb-6 cursor-pointer">
            Add New Expense
          </Dialog.Title>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Amount
              </label>
              <input
                {...form.register("amount")}
                type="number"
                placeholder="1000"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Category
              </label>
              <select
                {...form.register("category")}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select Category</option>
                {EXPENSE_CATEGORIES?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Date
              </label>
              <input
                type="date"
                {...form.register("date")}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Description
              </label>
              <textarea
                {...form.register("description")}
                placeholder="Enter description"
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={addExpense.isPending}
              className="w-full mt-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addExpense.isPending ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save Expense"
              )}
            </button>
          </form>

          <Dialog.Close className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ExpenseForm;
