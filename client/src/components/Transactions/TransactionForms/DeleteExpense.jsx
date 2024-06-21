import React from "react";
import "./DeleteExpense.css";

const DeleteExpense = ({ expense, onDelete, submitting }) => {
  if (!expense) return null;

  return (
    <div className="delete-expense">
      <h2>Confirm Delete Expense</h2>
      <p>Are you sure you want to delete the following expense?</p>
      <div className="expense-detail">
        <span className="label">ID:</span>
        <span className="value">{expense._id}</span>
      </div>
      <div className="expense-detail">
        <span className="label">Date:</span>
        <span className="value">
          {new Date(expense.date).toLocaleDateString()}
        </span>
      </div>
      <div className="expense-detail">
        <span className="label">Merchant Name:</span>
        <span className="value">{expense.vendor}</span>
      </div>
      <div className="expense-detail">
        <span className="label">Amount:</span>
        <span className="value">
          {expense.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "KES",
          })}
        </span>
      </div>
      <div className="buttons">
        <button onClick={onDelete} disabled={submitting}>
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteExpense;
