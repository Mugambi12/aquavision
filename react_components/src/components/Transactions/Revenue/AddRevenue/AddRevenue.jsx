// AddRevenue.js
import React, { useState } from "react";
import "./AddRevenue.css";

const AddRevenue = ({ onSubmit }) => {
  const [newRevenue, setNewRevenue] = useState({
    customer: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRevenue({ ...newRevenue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newRevenue);
  };

  return (
    <div className="add-revenue-container">
      <h2>Add Revenue</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer"
            value={newRevenue.customer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={newRevenue.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={newRevenue.date}
            onChange={handleChange}
            required
          />
        </label>

        <div className="d-flex">
          <button type="button" onClick={() => onSubmit(null)}>
            Cancel
          </button>
          <button type="submit">Add Revenue</button>
        </div>
      </form>
    </div>
  );
};

export default AddRevenue;
