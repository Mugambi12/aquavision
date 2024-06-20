// RevenueHeader.jsx

import React from "react";

const RevenueHeader = ({ openCreateRevenueModal }) => (
  <div className="revenue-header">
    <span className="material-symbols-rounded">arrow_left</span>
    <div className="revenue-header-content">
      <div className="revenue-invoice-info">
        <span className="cust-invoice">Revenue</span>
      </div>
    </div>
    <span className="material-symbols-rounded" onClick={openCreateRevenueModal}>
      add
    </span>
  </div>
);

export default RevenueHeader;
