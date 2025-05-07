//import { Card, Form, Input } from "antd";
import React from "react";
import AddIncome from "./addIncome";
import AddExpenses from "./addExpenses";

function Income() {
  return (
    <>
      Expenses Add, edit, and delete income and expense entries Categorization
      of transactions (e.g., groceries, rent, salary) Recurring transactions for
      regular bills or income
      <AddIncome />
      <AddExpenses />
    </>
  );
}

export default Income;
