import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getShortMonth, COLORS, renderCustomizedLabel } from "./utils";

const ExpenseCharts = ({ expenses, highestExpenses }) => {
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

  // Get top 5 highest expenses
  const topFiveExpenses = highestExpenses
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  // Transform highestExpenses data for PieChart
  const pieData = topFiveExpenses.map((expense) => ({
    name: expense.type,
    value: expense.amount,
  }));

  return (
    <div className="expense-charts">
      <div className="charts-expense-data-filter">
        <div className="filter">
          <label htmlFor="year-filter">Year:</label>
          <select
            id="year-filter"
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
      </div>

      {data.length > 0 && pieData.length > 0 && (
        <div className="expense-charts-container">
          <div className="area-chart-container">
            <h2 className="chart-header">Monthly Expense Trends</h2>
            <ResponsiveContainer height={300}>
              <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="85%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" type="category" />
                <YAxis type="number" />
                <CartesianGrid strokeDasharray="0.5 0.5" />
                <Tooltip />
                <Area
                  dataKey="amount"
                  type="monotone"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#areaColor)"
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="doughnut-chart-container">
            <h2 className="chart-header">Top 5 Expenses by Category</h2>
            <ResponsiveContainer height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: "14px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {(data.length === 0 || pieData.length === 0) && <p>No data available</p>}
    </div>
  );
};

export default ExpenseCharts;
