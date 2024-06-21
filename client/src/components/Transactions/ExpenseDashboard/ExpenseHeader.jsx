// ExpenseHeader.jsx
import React from "react";

const ExpenseHeader = ({ openCreateExpenseModal }) => (
  <div className="expense-header">
    <span className="material-symbols-rounded">arrow_left</span>
    <div className="expense-header-content">
      <div className="expense-info">
        <span className="header-title">Expense</span>
      </div>
    </div>
    <span className="material-symbols-rounded" onClick={openCreateExpenseModal}>
      add
    </span>
  </div>
);

export default ExpenseHeader;
