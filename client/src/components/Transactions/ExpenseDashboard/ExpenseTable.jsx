// ExpenseTable.jsx
import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

const ExpenseTable = ({
  expenses,
  openViewExpenseModal,
  openDeleteExpenseModal,
}) => {
  useEffect(() => {
    const table = new DataTable("#expenseTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="expense-table-container">
      <table id="expenseTable" className="expense-table display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Expense Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                #{exp._id}
              </td>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {new Date(exp.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </td>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.vendor}
              </td>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.type}
              </td>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </td>
              <td
                className={`${
                  exp.payment_status === "Completed" ? "completed" : "pending"
                }`}
              >
                {exp.payment_status}
              </td>
              <td
                className={`${
                  exp.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                <button
                  className="material-symbols-rounded view"
                  onClick={() => openViewExpenseModal(exp)}
                >
                  visibility
                </button>
              </td>
              <td className="expense-options-column">
                <button
                  className="material-symbols-rounded delete"
                  onClick={() => openDeleteExpenseModal(exp)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
