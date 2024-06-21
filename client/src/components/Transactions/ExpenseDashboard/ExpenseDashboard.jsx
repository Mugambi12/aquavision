import "./ExpenseDashboard.css";
import React, { useState, useEffect } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseCharts from "./ExpenseCharts";
import ExpenseTable from "./ExpenseTable";

const ExpenseDashboard = ({
  expenses,
  highestExpenses,
  openViewExpenseModal,
  openCreateExpenseModal,
  openDeleteExpenseModal,
}) => {
  return (
    <div id="expenses" className="expenses-container">
      <ExpenseHeader openCreateExpenseModal={openCreateExpenseModal} />
      <ExpenseCharts expenses={expenses} highestExpenses={highestExpenses} />
      <ExpenseTable
        expenses={expenses}
        openViewExpenseModal={openViewExpenseModal}
        openDeleteExpenseModal={openDeleteExpenseModal}
      />
    </div>
  );
};

export default ExpenseDashboard;
