import React from "react";
import "./DeleteRevenue.css";

const DeleteRevenue = ({ revenue, onSubmit }) => {
  return (
    <div className="delete-revenue-container">
      <h2 className="delete-revenue-title">Delete Revenue</h2>
      <p className="delete-revenue-info">Are you sure you want to delete this revenue?</p>
      <p className="delete-revenue-id">ID: {revenue.transaction_id}</p>
      <div className="delete-revenue-buttons">
        <button className="cancel-button" onClick={() => onSubmit(null)}>Cancel</button>
        <button className="confirm-button" onClick={onSubmit}>Confirm Delete</button>
      </div>
    </div>
  );
};

export default DeleteRevenue;
