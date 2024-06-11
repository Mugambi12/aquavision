import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./Expenses.css";

const ExpensesHeader = ({ openAddExpenseModal }) => (
  <div className="expenses-header">
    <span className="material-symbols-rounded">arrow_left</span>
    <div className="expenses-header-content">
      <div className="expenses-info">
        <span className="header-title">Expenses</span>
      </div>
    </div>
    <span className="material-symbols-rounded" onClick={openAddExpenseModal}>
      add
    </span>
  </div>
);

const getShortMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};

const ExpensesAreaChart = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [filteredData, setFilteredData] = useState(expenses);

  const years = [
    "All",
    ...new Set(expenses.map((expense) => new Date(expense.date).getFullYear())),
  ];

  useEffect(() => {
    setFilteredData(
      selectedYear === "All"
        ? expenses
        : expenses.filter(
            (expense) =>
              new Date(expense.date).getFullYear() === parseInt(selectedYear)
          )
    );
  }, [selectedYear, expenses]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Summing expenses for each month
  const monthlyExpenses = {};
  filteredData.forEach((expense) => {
    const month = getShortMonth(expense.date);
    monthlyExpenses[month] = (monthlyExpenses[month] || 0) + expense.amount;
  });

  // Transforming data for recharts
  const data = Object.keys(monthlyExpenses).map((month) => ({
    month,
    amount: monthlyExpenses[month],
  }));

  return (
    <div className="expenses-area-chart">
      <div className="chart-data-filter">
        <label htmlFor="year">Year:</label>
        <select
          name="year"
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="area-chart">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ right: 20 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="0.5 0.5" />
            <Tooltip />
            <Area
              dataKey="amount"
              type="monotone"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ExpensesTable = ({ expenses }) => (
  <div className="expenses-table-container">
    <table id="expensesTable" className="expenses-table display">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Date</th>
          <th>Type</th>
          <th>Vendor</th>
          <th>Description</th>
          <th>Payment Method</th>
          <th>Payment Status</th>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={expense._id}>
            <td>#{expense._id}</td>
            <td>{expense.date}</td>
            <td>{expense.type}</td>
            <td>{expense.vendor}</td>
            <td>{expense.description}</td>
            <td>{expense.payment_method}</td>
            <td>{expense.payment_status}</td>
            <td>{expense.transaction_id}</td>
            <td>{expense.amount}</td>
            <td>{expense.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Expenses = ({ expenses, openAddExpenseModal }) => {
  useEffect(() => {
    const table = new DataTable("#expensesTable", { responsive: true });
    return () => {
      table.destroy();
    };
  }, []);

  return (
    <>
      <ExpensesHeader openAddExpenseModal={openAddExpenseModal} />
      <ExpensesAreaChart expenses={expenses} />
      <ExpensesTable expenses={expenses} />
    </>
  );
};

export default Expenses;
