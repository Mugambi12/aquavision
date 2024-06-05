import React from "react";
import "./DeleteRevenue.css";

const DeleteRevenue = ({ revenue, onSubmit }) => {
  return (
    <div className="delete-revenue-container">
      <h2>Delete Revenue</h2>
      <p>Are you sure you want to delete this revenue?</p>
      <p>ID: {revenue.transaction_id}</p>
      <div className="d-flex">
        <button onClick={() => onSubmit(null)}>Cancel</button>
        <button onClick={onSubmit}>Confirm Delete</button>
      </div>
    </div>
  );
};

export default DeleteRevenue;
