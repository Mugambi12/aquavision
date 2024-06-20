import React from "react";
import "./ViewRevenue.css";

const ViewRevenue = ({ revenue }) => {
  if (!revenue) return null;

  return (
    <div className="view-invoice-container">
      <h2 className="view-invoice-title">
        Viewing Invoice of {revenue.full_name}
      </h2>
      <div className="view-invoice-details">
        <p>
          <strong>Revenue ID:</strong> {revenue._id}
        </p>
        <p>
          <strong>Revenue Amount:</strong> {revenue.total_amount}
        </p>
      </div>
    </div>
  );
};

export default ViewRevenue;
