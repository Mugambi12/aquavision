import React from "react";
import "./ViewExpense.css";

const ViewExpense = ({ expense, openEditExpenseModal }) => {
  return (
    <div className="view-expense">
      <h2>Expense Details</h2>
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
        <span className="label">Expense Type:</span>
        <span className="value">{expense.type}</span>
      </div>
      <div className="expense-detail">
        <span className="label">Description:</span>
        <span className="value">{expense.description}</span>
      </div>
      <div className="expense-detail">
        <span className="label">Payment Method:</span>
        <span className="value">{expense.payment_method}</span>
      </div>
      <div className="expense-detail">
        <span className="label">Transaction ID:</span>
        <span className="value">{expense.transaction_id}</span>
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
      <div className="expense-detail">
        <span className="label">Payment Status:</span>
        <span className="value">{expense.payment_status}</span>
      </div>
    </div>
  );
};

export default ViewExpense;
