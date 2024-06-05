import React from "react";
import "./RefundRevenue.css";

const RefundRevenue = ({ revenue, onSubmit }) => {
  return (
    <div className="refund-revenue-container">
      <h2>Refund Revenue</h2>
      <p>Are you sure you want to refund this revenue?</p>
      <p>ID: {revenue.transaction_id}</p>

      <div className="d-flex">
        <button onClick={() => onSubmit(null)}>Cancel</button>
        <button onClick={onSubmit}>Confirm Refund</button>
      </div>
    </div>
  );
};

export default RefundRevenue;
