import "./ExpenseDashboard.css";
import React, { useState, useEffect } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseCharts from "./ExpenseCharts";
import ExpenseTable from "./ExpenseTable";

const ExpenseDashboard = ({
  expenses,
  openViewExpenseModal,
  openCreateExpenseModal,
  openDeleteExpenseModal,
}) => {
  const [filters, setFilters] = useState({ year: "", status: "all" });
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const years = Array.from(
      new Set(
        expenses.map((exp) =>
          new Date(exp.expense_date).getFullYear().toString()
        )
      )
    ).sort();
    setAvailableYears(["", ...years]);
  }, [expenses]);

  const handleYearChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: e.target.value,
    }));
  };

  return (
    <div id="expenses" className="expenses-container">
      <ExpenseHeader openCreateExpenseModal={openCreateExpenseModal} />
      <ExpenseCharts
        expenses={expenses}
        filters={filters}
        availableYears={availableYears}
        handleYearChange={handleYearChange}
        handleStatusChange={handleStatusChange}
      />
      <ExpenseTable
        expenses={expenses}
        openViewExpenseModal={openViewExpenseModal}
        openDeleteExpenseModal={openDeleteExpenseModal}
      />
    </div>
  );
};

export default ExpenseDashboard;
