import React from "react";
import AddIncome from "./addIncome";
import IncomeData from "../components/incomeData.js";

function Income() {
  return (
    <>
      Expenses Add, edit, and delete income and expense entries Categorization
      of transactions (e.g., groceries, rent, salary) Recurring transactions for
      regular bills or income Total Income: The sum of all income sources. Total
      Expenses: The sum of all expense categories. Net Income (Surplus/Deficit):
      Total Income minus Total Expenses. This crucial field shows whether you
      are earning more than you spend (surplus) or spending more than you earn
      (deficit). Percentage of Income Spent on Each Category: This can provide
      valuable insights into where the bulk of your money is going. For example,
      calculating (Housing Expenses / Total Income) * 100%.
      <AddIncome />
      <IncomeData />
    </>
  );
}

export default Income;
