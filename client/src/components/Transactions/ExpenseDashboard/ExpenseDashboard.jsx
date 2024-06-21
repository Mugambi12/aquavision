import "./ExpenseDashboard.css";
import React, { useState, useEffect } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseCharts from "./ExpenseCharts";
import ExpenseTable from "./ExpenseTable";
import { fetchExpenses } from "../../../resources/apiExpenses";

const ExpenseDashboard = ({
  openViewExpenseModal,
  openCreateExpenseModal,
  openDeleteExpenseModal,
}) => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ year: "", status: "all" });
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchExpenses()
      .then((data) => {
        console.log("Fetched expenses successfully.");
        setExpenses(data);
        const years = Array.from(
          new Set(
            data.map((exp) =>
              new Date(exp.expense_date).getFullYear().toString()
            )
          )
        ).sort();
        setAvailableYears(["", ...years]);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
