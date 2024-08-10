"use client";

import React , { useEffect , useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { desc , eq , getTableColumns , sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses , Incomes } from "../../../../../../utils/schema";
import { toast } from "sonner";

function IncomeList() {

  const [ incomelist , setIncomelist ] = useState([]);

  const { user } = useUser();

  useEffect(() => {user && getIncomelist();}, [user]);

  const getIncomelist = async () => {

    const result = await db.select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      }).from(Incomes).leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Incomes.id).orderBy(desc(Incomes.id));

    setIncomelist(result);

  };

  const deleteIncome = async (id) => {

    try {
      await db.delete(Incomes).where(eq(Incomes.id, id));
      toast.success("Income deleted successfully", {style: {backgroundColor: "#28a745", color: "#fff" },});
      getIncomelist();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
    }

  };

  const editIncome = async (id, updatedData) => {

    try {
      await db.update(Incomes)
        .set(updatedData)
        .where(eq(Incomes.id, id));
      toast.success("Income updated successfully", {style: {backgroundColor: "#28a745", color: "#fff" },});
      getIncomelist();
    } catch (error) {
      console.error("Error updating income:", error);
      toast.error("Failed to update income");
    }
    
  };

  return (

    <div className="mt-7">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <CreateIncomes refreshData={getIncomelist} />

        {incomelist?.length > 0 ? (
          incomelist.map((income, index) => (
            <IncomeItem key={index} income={income} onDelete={deleteIncome} onEdit={editIncome}/>
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
          ))
        )}

      </div>

    </div>

  );

}

export default IncomeList;
