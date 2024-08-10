
import { eq } from "drizzle-orm";
import React from "react";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";

function ExpenseListTable({ expensesList, refreshData }) {

  const deleteExpense = async (expense) => {

    const result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning();

    if (result) {

      toast.success("Expense Deleted !", {style: {backgroundColor: "#28a745", color: "#fff" },});

      refreshData();

    }

  };

  return (

    <div className="mt-3">

      <h2 className="font-bold text-lg">
        
        Latest Expenses
        
    </h2>

      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">

        <h2 className="font-bold">
            
            Name
            
        </h2>

        <h2 className="font-bold">
            
            Amount
            
        </h2>

        <h2 className="font-bold">
            
            Date
            
        </h2>

        <h2 className="font-bold">
            
            Action
            
        </h2>

      </div>

      {expensesList.map((expenses, index) => (

        <div className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">

          <h2>
            
            {expenses.name}
            
          </h2>

          <h2>
            
            {expenses.amount}
            
          </h2>

          <h2>
            
            {expenses.createdAt}
            
          </h2>

          <h2 onClick={() => deleteExpense(expenses)} className="text-red-500 cursor-pointer">

            Delete

          </h2>

        </div>
        
      ))}

    </div>

  );

};

export default ExpenseListTable;