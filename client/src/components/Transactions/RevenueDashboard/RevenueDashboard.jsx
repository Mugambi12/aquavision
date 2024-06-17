import "./RevenueDashboard.css";
import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
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

// Define colors for the PieChart
const COLORS = ["#8884d8", "#a4de6c", "#ffc658", "#82ca9d", "#ff8042"];

// Component for the RevenueHeader
const RevenueHeader = ({ openAddRevenueModal }) => (
  <div className="revenue-header">
    <span className="material-symbols-rounded">arrow_left</span>
    <div className="revenue-header-content">
      <div className="revenue-invoice-info">
        <span className="cust-invoice">Revenue</span>
      </div>
    </div>
    <span className="material-symbols-rounded" onClick={openAddRevenueModal}>
      add
    </span>
  </div>
);

// Function to transform revenue data based on filters
const transformData = (revenue, filters) => {
  const filteredData = revenue.filter((rev) => {
    const revDate = new Date(rev.payment_date);
    const revYear = revDate.getFullYear().toString();
    const statusMatch =
      filters.status === "all" || rev.payment_status === filters.status;
    const yearMatch = !filters.year || revYear === filters.year;
    return statusMatch && yearMatch;
  });

  // Calculate monthly revenue for the AreaChart
  const monthlyRevenue = filteredData.reduce((acc, rev) => {
    const month = new Date(rev.payment_date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + rev.amount;
    return acc;
  }, {});

  const lineChartData = Object.keys(monthlyRevenue).map((month) => ({
    month,
    revenue: monthlyRevenue[month],
  }));

  // Calculate payment method data for the PieChart
  const paymentMethodData = filteredData.reduce((acc, rev) => {
    acc[rev.payment_method] = (acc[rev.payment_method] || 0) + rev.amount;
    return acc;
  }, {});

  const pieChartData = Object.keys(paymentMethodData).map((method) => ({
    name: method,
    value: paymentMethodData[method],
  }));

  return { lineChartData, pieChartData };
};

// Component for the RevenueCharts
const RevenueCharts = ({
  filteredRevenue,
  paymentMethodData,
  availableYears,
  filters,
  handleYearChange,
  handleStatusChange,
  renderCustomizedLabel,
}) => (
  <div className="revenue-charts">
    <div className="charts-revenue-data-filter">
      {/* Year filter */}
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

      {/* Status filter */}
      <div className="filter">
        <label htmlFor="filter">Status:</label>
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

    {/* Conditionally render charts only if there is data */}
    {filteredRevenue.length > 0 && paymentMethodData.length > 0 && (
      <div className="revenue-charts-container">
        {/* AreaChart */}
        <div className="area-chart-container">
          <h2 className="chart-header">Monthly Revenue Trends</h2>
          <ResponsiveContainer height={300}>
            <AreaChart
              data={filteredRevenue}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" type="category" />
              <YAxis type="number" />
              <CartesianGrid strokeDasharray="0.5 0.5" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
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

        {/* PieChart */}
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
    )}

    {/* Optionally, you can add a message or alternative content when there's no data */}
    {(filteredRevenue.length === 0 || paymentMethodData.length === 0) && (
      <p>No data available</p>
    )}
  </div>
);

// Component for the RevenueTableContainer
const RevenueTableContainer = ({
  revenue,
  openDropdownId,
  toggleDropdown,
  openDeleteRevenueModal,
  openEditRevenueModal,
  openRefundRevenueModal,
}) => (
  <div className="revenue-table-container">
    <table id="revenueTable" className="revenue-table display nowrap">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Transaction ID</th>
          <th>Payment Method</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {revenue.map((rev) => (
          <tr key={rev._id}>
            {/* Table rows */}
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              #{rev._id}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {new Date(rev.payment_date).toLocaleDateString()}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.full_name}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.transaction_id}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.payment_method}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td
              className={`revenue-table-row ${
                rev.payment_status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.payment_status}
            </td>
            <td
              className={`revenue-table-row options ${
                openDropdownId === rev._id ? "active" : ""
              }`}
            >
              <span
                className="material-symbols-rounded"
                onClick={() => toggleDropdown(rev._id)}
              >
                {openDropdownId === rev._id ? "close" : "more_vert"}
              </span>
              {openDropdownId === rev._id && (
                <div className="revenue-options-dropdown">
                  {/* Dropdown options */}
                  <button
                    className="revenue-option"
                    onClick={() => openEditRevenueModal(rev)}
                  >
                    <span className="material-symbols-rounded edit">edit</span>
                    <span className="dropdown-option-label edit">Edit</span>
                  </button>
                  <button
                    className="revenue-option"
                    onClick={() => openRefundRevenueModal(rev)}
                  >
                    <span className="material-symbols-rounded refund">
                      money_off
                    </span>
                    <span className="dropdown-option-label refund">Refund</span>
                  </button>
                  <button
                    className="revenue-option"
                    onClick={() => openDeleteRevenueModal(rev)}
                  >
                    <span className="material-symbols-rounded delete">
                      delete
                    </span>
                    <span className="dropdown-option-label delete">Delete</span>
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main component for the RevenueDashboard
const RevenueDashboard = ({
  revenue,
  openDeleteRevenueModal,
  openEditRevenueModal,
  openRefundRevenueModal,
  openAddRevenueModal,
}) => {
  const [filteredRevenue, setFilteredRevenue] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [filters, setFilters] = useState({ year: "", status: "all" });
  const [availableYears, setAvailableYears] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Update data when revenue or filters change
  useEffect(() => {
    const years = new Set(
      revenue.map((rev) => new Date(rev.payment_date).getFullYear().toString())
    );
    setAvailableYears(["", ...Array.from(years)]);

    // Transform data based on filters
    const { lineChartData, pieChartData } = transformData(revenue, filters);

    setFilteredRevenue(lineChartData);
    setPaymentMethodData(pieChartData);
  }, [revenue, filters]);

  // Initialize DataTable on component mount
  useEffect(() => {
    const table = new DataTable("#revenueTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  // Handle year filter change
  const handleYearChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: e.target.value,
    }));
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: e.target.value,
    }));
  };

  // Toggle dropdown for options in table
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Render customized label for PieChart
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

  // Return the main RevenueDashboard component
  return (
    <div id="revenue" className="revenue-container">
      {/* Header component */}
      <RevenueHeader openAddRevenueModal={openAddRevenueModal} />

      {/* Charts component */}
      <RevenueCharts
        filteredRevenue={filteredRevenue}
        paymentMethodData={paymentMethodData}
        availableYears={availableYears}
        filters={filters}
        handleYearChange={handleYearChange}
        handleStatusChange={handleStatusChange}
        renderCustomizedLabel={renderCustomizedLabel}
      />

      {/* Table component */}
      <RevenueTableContainer
        revenue={revenue}
        openDropdownId={openDropdownId}
        toggleDropdown={toggleDropdown}
        openDeleteRevenueModal={openDeleteRevenueModal}
        openEditRevenueModal={openEditRevenueModal}
        openRefundRevenueModal={openRefundRevenueModal}
      />
    </div>
  );
};

export default RevenueDashboard;
