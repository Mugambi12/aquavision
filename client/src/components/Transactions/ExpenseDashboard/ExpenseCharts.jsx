// ExpenseCharts.jsx
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
import { getShortMonth } from "./utils";

const ExpenseCharts = ({ expenses }) => {
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
    <div className="expense-area-chart">
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
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ right: 20 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="85%" stopColor="#8884d8" stopOpacity={0} />
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

export default ExpenseCharts;
