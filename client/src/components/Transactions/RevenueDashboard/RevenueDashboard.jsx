import React, { useEffect, useState } from "react";
import "./RevenueDashboard.css";
import RevenueHeader from "./RevenueHeader";
import RevenueTableContainer from "./RevenueTableContainer";
import RevenueCharts from "./RevenueCharts";

// Main component for the RevenueDashboard
const RevenueDashboard = ({
  revenue,
  openDeleteRevenueModal,
  openEditRevenueModal,
  openRefundRevenueModal,
  openCreateRevenueModal,
}) => {
  const [filters, setFilters] = useState({ year: "", status: "all" });
  const [availableYears, setAvailableYears] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Update available years when revenue changes
  useEffect(() => {
    const years = Array.from(
      new Set(
        revenue.map((rev) =>
          new Date(rev.payment_date).getFullYear().toString()
        )
      )
    ).sort(); // Ensure years are unique and sorted
    setAvailableYears(["", ...years]);
  }, [revenue]);

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

  return (
    <div id="revenue" className="revenue-container">
      {/* Header component */}
      <RevenueHeader openCreateRevenueModal={openCreateRevenueModal} />

      {/* Charts component */}
      <RevenueCharts
        revenue={revenue}
        filters={filters}
        availableYears={availableYears}
        handleYearChange={handleYearChange}
        handleStatusChange={handleStatusChange}
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
