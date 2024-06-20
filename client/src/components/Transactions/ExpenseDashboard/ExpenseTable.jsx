// ExpenseTable.jsx
import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

const ExpenseTable = ({
  expenses,
  openDropdownId,
  toggleDropdown,
  openEditExpenseModal,
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
            <th>Merchant Name</th>
            <th>Expense Type</th>
            <th>Description</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Approval Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                #{exp._id}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.vendor}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.type}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.description}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.payment_method}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.payment_status}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.transaction_id}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </td>
              <td
                className={`expense-table-row ${
                  exp.status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {exp.approval_status}
              </td>
              <td
                className={`expense-table-row options ${
                  openDropdownId === exp._id ? "active" : ""
                }`}
              >
                <span
                  className="material-symbols-rounded"
                  onClick={() => toggleDropdown(exp._id)}
                >
                  {openDropdownId === exp._id ? "close" : "more_vert"}
                </span>
                {openDropdownId === exp._id && (
                  <div className="expense-options-dropdown">
                    <button
                      className="expense-option"
                      onClick={() => openEditExpenseModal(exp)}
                    >
                      <span className="material-symbols-rounded edit">
                        edit
                      </span>
                      <span className="dropdown-option-label edit">Edit</span>
                    </button>
                    <button
                      className="expense-option"
                      onClick={() => openDeleteExpenseModal(exp)}
                    >
                      <span className="material-symbols-rounded delete">
                        delete
                      </span>
                      <span className="dropdown-option-label delete">
                        Delete
                      </span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
