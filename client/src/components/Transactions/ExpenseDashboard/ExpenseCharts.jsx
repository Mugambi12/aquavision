// ExpenseCharts.jsx
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { COLORS, getShortMonth } from "./utils";

const ExpenseCharts = ({ expenses, highestExpenses }) => {
  // Default selected year is "All"
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

  // Summing expenses for each month, combining months from different years if "All" is selected
  const monthlyExpenses = {};
  filteredData.forEach((expense) => {
    const date = new Date(expense.date);
    const month = getShortMonth(date);
    if (selectedYear === "All") {
      monthlyExpenses[month] = (monthlyExpenses[month] || 0) + expense.amount;
    } else {
      const yearMonth = `${date.getFullYear()}-${month}`;
      monthlyExpenses[yearMonth] =
        (monthlyExpenses[yearMonth] || 0) + expense.amount;
    }
  });

  // Transforming data for ECharts
  const data = Object.keys(monthlyExpenses).map((month) => ({
    month,
    amount: monthlyExpenses[month],
  }));

  // Get top 5 highest expenses
  const topFiveExpenses = highestExpenses
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Transform highestExpenses data for PieChart
  const pieData = topFiveExpenses.map((expense) => ({
    name: expense.type,
    value: expense.amount,
  }));

  const getLineChartOptions = (data) => ({
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
      legend: {
        bottom: "0%",
      },
    },
    yAxis: {
      type: "value",
      legend: {
        bottom: "0%",
      },
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
  });

  const getPieChartOptions = (pieData) => ({
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
  });

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

      {data.length > 0 && pieData.length > 0 ? (
        <div className="expense-charts-container">
          <div className="area-chart-container">
            <ReactECharts
              option={getLineChartOptions(data)}
              style={{ height: 300 }}
            />
          </div>

          <div className="doughnut-chart-container">
            <ReactECharts
              option={getPieChartOptions(pieData)}
              style={{ height: 300 }}
            />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ExpenseCharts;
