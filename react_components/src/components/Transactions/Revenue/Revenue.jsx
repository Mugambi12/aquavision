import React, { useEffect, useState } from "react";
import "./Revenue.css";
import {
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
  ResponsiveContainer,
} from "recharts";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

const COLORS = ["#8884d8", "#a4de6c", "#ffc658", "#82ca9d", "#ff8042"];

const transformData = (revenue, filters) => {
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

  const lineChartData = Object.keys(monthlyRevenue).map((month) => ({
    month,
    revenue: monthlyRevenue[month],
  }));

  // Group by payment method and sum amounts for the pie chart
  const paymentMethodData = filteredData.reduce((acc, rev) => {
    if (!acc[rev.payment_method]) {
      acc[rev.payment_method] = 0;
    }
    acc[rev.payment_method] += rev.amount;
    return acc;
  }, {});

  const pieChartData = Object.keys(paymentMethodData).map((method) => ({
    name: method,
    value: paymentMethodData[method],
  }));

  return { lineChartData, pieChartData };
};

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
);

const RevenueTableContainer = ({
  revenue,
  openDropdownId,
  toggleDropdown,
  openDeleteRevenueModal,
  openEditRevenueModal,
  openRefundRevenueModal,
}) => (
  <div className="revenue-table-container">
    <table id="revenueTable" className="revenue-table display">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Date</th>
          <th>Customer_Name</th>
          <th>Transaction_ID</th>
          <th>Payment_Method</th>
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
              #{rev._id}
            </td>
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
              className={`revenue-table-row ${
                rev.status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.transaction_id}
            </td>
            <td
              className={`revenue-table-row ${
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
              {rev.description}
            </td>
            <td
              className={`revenue-table-row ${
                rev.status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td
              className={`revenue-table-row ${
                rev.status === "Cancelled" ? "Cancelled" : ""
              }`}
            >
              {rev.status}
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
                {`${openDropdownId === rev._id ? "close" : "more_vert"}`}
              </span>
              {openDropdownId === rev._id && (
                <div className="revenue-options-dropdown">
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

const Revenue = ({
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

  useEffect(() => {
    const years = new Set(
      revenue.map((rev) => new Date(rev.date).getFullYear().toString())
    );
    setAvailableYears(Array.from(years));

    // Transform data based on filters
    const { lineChartData, pieChartData } = transformData(revenue, filters);

    setFilteredRevenue(lineChartData);
    setPaymentMethodData(pieChartData);
  }, [filters]);

  useEffect(() => {
    const table = new DataTable("#revenueTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

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
      <RevenueHeader openAddRevenueModal={openAddRevenueModal} />
      <RevenueCharts
        filteredRevenue={filteredRevenue}
        paymentMethodData={paymentMethodData}
        availableYears={availableYears}
        filters={filters}
        handleYearChange={handleYearChange}
        handleStatusChange={handleStatusChange}
        renderCustomizedLabel={renderCustomizedLabel}
      />
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

export default Revenue;
