import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { COLORS, getShortMonth } from "./utils";

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

  // Transforming data for ECharts
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
            <ReactECharts
              option={{
                title: {
                  text: "Monthly Expense Trends",
                  textStyle: {
                    fontSize: 14,
                  },
                },
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "category",
                  data: data.map((d) => d.month),
                },
                yAxis: {
                  type: "value",
                },
                series: [
                  {
                    data: data.map((d) => d.amount),
                    type: "line",
                    smooth: true,
                    areaStyle: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          { offset: 0, color: COLORS[0] },
                          { offset: 1, color: COLORS[1] },
                        ],
                        global: false,
                      },
                    },
                    itemStyle: {
                      color: "#8884d8",
                    },
                  },
                ],
              }}
              style={{ height: 300 }}
            />
          </div>

          <div className="doughnut-chart-container">
            <ReactECharts
              option={{
                title: {
                  text: "Top 5 Expenses by Category",
                  left: "center",
                  textStyle: {
                    fontSize: 14,
                  },
                },
                tooltip: {
                  trigger: "item",
                },
                legend: {
                  bottom: "0%",
                },
                series: [
                  {
                    name: "Expenses",
                    type: "pie",
                    radius: "50%",
                    data: pieData,
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                      },
                    },
                  },
                ],
              }}
              style={{ height: 300 }}
            />
          </div>
        </div>
      )}

      {(data.length === 0 || pieData.length === 0) && <p>No data available</p>}
    </div>
  );
};

export default ExpenseCharts;
