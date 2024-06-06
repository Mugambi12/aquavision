import React, { useState } from "react";
import "./AddExpense.css";

const AddExpense = ({ onSubmit }) => {
  const [newExpense, setNewExpense] = useState({
    customer: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newExpense);
  };

  return (
    <div className="add-expense-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer"
            value={newExpense.customer}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleChange}
            required
          />
        </label>

        <div className="d-flex">
          <button type="button" onClick={() => onSubmit(null)}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
