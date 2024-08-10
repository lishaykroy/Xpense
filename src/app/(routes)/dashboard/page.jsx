"use client";

import React , { useEffect , useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { desc , eq , getTableColumns , sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { Budgets , Expenses , Incomes } from "../../../../utils/schema";
import { db } from "../../../../utils/dbConfig";

function Dashboard() {

    const { user } = useUser();
  
    const [ budgetList, setBudgetList ] = useState([]);

    const [ incomeList, setIncomeList ] = useState([]);

    const [ expensesList, setExpensesList ] = useState([]);

    useEffect(() => {user && getBudgetList();}, [user]);

    const getBudgetList = async () => {

      const result = await db
        .select({

          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
          
        })
        .from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id).orderBy(desc(Budgets.id));

      setBudgetList(result);

      getAllExpenses();

      getIncomeList();

    };

    const getIncomeList = async () => {

      try {
        const result = await db
          .select({
            ...getTableColumns(Incomes),
            totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
              Number
            ),
          })
          .from(Incomes)
          .groupBy(Incomes.id); 
  
        setIncomeList(result);
      } catch (error) {
        console.error("Error fetching income list:", error);
      }

    };

    const getAllExpenses = async () => {

      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress)).orderBy(desc(Expenses.id));

      setExpensesList(result);

    };
  
    return (

      <div className="p-8 bg-">

        <h2 className="font-bold text-4xl">
            
            Hi , {user?.fullName} 👋
            
        </h2>

        <p className="text-gray-500">

          Here's what happenning with your money , Lets Manage your expense

        </p>
  
        <CardInfo budgetList={budgetList} incomeList={incomeList} />

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">

          <div className="lg:col-span-2">

            <BarChartDashboard budgetList={budgetList} />
  
            <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()} />

          </div>

          <div className="grid gap-5">

            <h2 className="font-bold text-lg">
              
              Latest Budgets
              
            </h2>

            {budgetList?.length > 0 ? (
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={budget.id || index} />
            ))
          ) : (
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
              />
            ))
          )}

          </div>

        </div>

      </div>

    );

  };
  
  export default Dashboard;