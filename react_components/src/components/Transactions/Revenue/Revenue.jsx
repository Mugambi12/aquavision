import React, { useEffect, useState } from "react";
import "./Revenue.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import revenue from "../../../db/revenue";

// Define color palette for the pie chart
const COLORS = ["#8884d8", "#a4de6c", "#ffc658", "#82ca9d", "#ff8042"];

const Revenue = () => {
  const [filteredRevenue, setFilteredRevenue] = useState(revenue);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [filters, setFilters] = useState({ year: "", status: "all" });
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    // Extract unique years from the revenue data
    const years = new Set(
      revenue.map((rev) => new Date(rev.date).getFullYear().toString())
    );
    setAvailableYears(Array.from(years));

    // Filter revenue data based on filters
    const filteredData = revenue.filter((rev) => {
      const revDate = new Date(rev.date);
      const revYear = revDate.getFullYear().toString();
      const statusMatch =
        filters.status === "all" || rev.status === filters.status;
      const yearMatch = !filters.year || revYear === filters.year;
      return statusMatch && yearMatch;
    });

    // Group by month and sum amounts for the line chart
    const monthlyRevenue = filteredData.reduce((acc, rev) => {
      const month = new Date(rev.date).toLocaleString("default", {
        month: "short",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += rev.amount;
      return acc;
    }, {});

    setFilteredRevenue(
      Object.keys(monthlyRevenue).map((month) => ({
        month,
        revenue: monthlyRevenue[month],
      }))
    );

    // Group by payment method and sum amounts for the pie chart
    const paymentMethodData = filteredData.reduce((acc, rev) => {
      if (!acc[rev.payment_method]) {
        acc[rev.payment_method] = 0;
      }
      acc[rev.payment_method] += rev.amount;
      return acc;
    }, {});

    setPaymentMethodData(
      Object.keys(paymentMethodData).map((method) => ({
        name: method,
        value: paymentMethodData[method],
      }))
    );
  }, [filters, revenue]);

  useEffect(() => {
    const table = new DataTable("#revenueTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, [revenue]);

  const handleYearChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, year: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, status: e.target.value }));
  };

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
    <div id="revenue" className="revenue-container">
      <div className="revenue-header">
        <span className="material-symbols-rounded">arrow_left</span>
        <div className="revenue-header-content">
          <div className="revenue-invoice-info">
            <span className="cust-invoice">Revenue</span>
          </div>
        </div>
        <span className="material-symbols-rounded">more_horiz</span>
      </div>

      <div className="revenue-charts">
        <div className="charts-data-filter">
          <div className="filter">
            <label htmlFor="filter">Year:</label>
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
            <label htmlFor="filter">Status:</label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={handleStatusChange}
            >
              <option value="all">All</option>
              <option className="received" value="Received">
                Received
              </option>
              <option className="cancelled" value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>

        <div className="revenue-charts-container">
          <div className="line-chart-container">
            <h2 className="chart-header">Monthly Revenue Trends</h2>
            <ResponsiveContainer height={300}>
              <LineChart
                data={filteredRevenue}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" type="category" />
                <YAxis type="number" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
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
      </div>

      <div className="revenue-table-container">
        <table id="revenueTable" className="revenue-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Transaction ID</th>
              <th>Payment Method</th>
              <th>Source</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((rev, index) => (
              <tr key={rev._id}>
                <td
                  className={`revenue-table-row ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {new Date(rev.date).toLocaleDateString()}
                </td>
                <td
                  className={`revenue-table-row ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.customer}
                </td>

                <td
                  className={`revenue-table-row  ${rev.method} ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.transaction_id}
                </td>
                <td
                  className={`revenue-table-row  ${rev.method} ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.payment_method}
                </td>
                <td
                  className={`revenue-table-row ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.source}
                </td>

                <td
                  className={`revenue-table-row ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.description}
                </td>
                <td
                  className={`revenue-table-row  ${rev.method} ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  ${rev.amount}
                </td>
                <td
                  className={`revenue-table-row  ${rev.status} ${
                    rev.status === "Cancelled" ? "Cancelled" : ""
                  }`}
                >
                  {rev.status}
                </td>
                <td className="revenue-table-row">
                  <span className="material-symbols-rounded options">
                    more_vert
                  </span>
                  <div className="revenue-options-dropdown">
                    <button className="revenue-option">
                      {" "}
                      <span className="material-symbols-rounded">
                        edit
                      </span>{" "}
                      Edit
                    </button>
                    <button className="revenue-option">
                      {" "}
                      <span className="material-symbols-rounded">
                        money_off
                      </span>{" "}
                      Refund
                    </button>
                    <button className="revenue-option">
                      {" "}
                      <span className="material-symbols-rounded">
                        delete
                      </span>{" "}
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;
