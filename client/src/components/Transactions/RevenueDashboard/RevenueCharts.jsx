import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { transformData, COLORS } from "./utils";

const RevenueCharts = ({
  revenue,
  filters,
  availableYears,
  handleYearChange,
  handleStatusChange,
}) => {
  const [filteredRevenue, setFilteredRevenue] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);

  useEffect(() => {
    const { lineChartData, pieChartData } = transformData(revenue, filters);
    setFilteredRevenue(lineChartData);
    setPaymentMethodData(pieChartData);
  }, [revenue, filters]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="revenue-charts">
      <div className="charts-revenue-data-filter">
        <div className="filter">
          <label htmlFor="date-filter">Year:</label>
          <select
            id="date-filter"
            value={filters.year}
            onChange={handleYearChange}
          >
            <option value="">All</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option className="completed" value="Completed">
              Completed
            </option>
            <option className="cancelled" value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {filteredRevenue.length > 0 && paymentMethodData.length > 0 ? (
        <div className="revenue-charts-container">
          <div className="area-chart-container">
            <h2 className="chart-header">Monthly Revenue Trends</h2>
            <ResponsiveContainer height={300}>
              <AreaChart
                data={filteredRevenue}
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
                  dataKey="revenue"
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
            <h2 className="chart-header">Revenue by Payment Method</h2>
            <ResponsiveContainer height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
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
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default RevenueCharts;
