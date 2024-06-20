import React from "react";
import "./RefundRevenue.css";

const RefundRevenue = ({ revenue, onSubmit, submitting }) => {
  return (
    <div className="refund-revenue-container">
      <h2 className="refund-revenue-title">Refund Revenue</h2>
      <p className="refund-revenue-info">
        Are you sure you want to refund this revenue?
      </p>
      <p className="refund-revenue-id">ID: {revenue.transaction_id}</p>

      <div className="refund-revenue-buttons">
        <button className="confirm-button" onClick={onSubmit}>
          {submitting ? "Submitting..." : "Confirm Refund"}
        </button>
      </div>
    </div>
  );
};

export default RefundRevenue;
