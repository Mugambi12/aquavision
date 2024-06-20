import React from "react";
import "./ViewRevenue.css";

const ViewRevenue = ({ revenue, openEditRevenueModal }) => {
  return (
    <div className="view-revenue">
      <h2>Revenue Details</h2>
      <div className="revenue-detail">
        <span className="label">ID:</span>
        <span className="value">{revenue._id}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">Date:</span>
        <span className="value">
          {new Date(revenue.payment_date).toLocaleDateString()}
        </span>
      </div>
      <div className="revenue-detail">
        <span className="label">Customer Name:</span>
        <span className="value">{revenue.full_name}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">House Section:</span>
        <span className="value">{revenue.house_section}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">House Number:</span>
        <span className="value">{revenue.house_number}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">Transaction ID:</span>
        <span className="value">{revenue.transaction_id}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">Payment Method:</span>
        <span className="value">{revenue.payment_method}</span>
      </div>
      <div className="revenue-detail">
        <span className="label">Amount:</span>
        <span className="value">
          {revenue.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "KES",
          })}
        </span>
      </div>
      <div className="revenue-detail">
        <span className="label">Status:</span>
        <span className="value">{revenue.payment_status}</span>
      </div>
      <button
        className="edit-button"
        onClick={() => openEditRevenueModal(revenue)}
      >
        <span className="material-symbols-rounded">Edit</span> Edit
      </button>
    </div>
  );
};

export default ViewRevenue;
