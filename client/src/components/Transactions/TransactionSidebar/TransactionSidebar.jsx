// TransactionSidebar.js
import React from "react";
import "./TransactionSidebar.css";

const TransactionSidebar = ({
  unpaidInvoice,
  toggleView,
  currentView,
  openAddRevenueModal,
  openAddExpenseModal,
}) => {
  return (
    <div className="transactions-sidebar">
      <div className="mobile-transactions-sidebar">
        <span className="material-symbols-rounded icon-sort">monitoring</span>
        <div className="mobile-transactions-sidebar-title">
          <div className="mobile-revenue-info">
            <span className="customer-invoice">Revenue</span>
          </div>
        </div>
        <span
          className="material-symbols-rounded icon-segment"
          onClick={() =>
            currentView === "revenue"
              ? openAddRevenueModal()
              : openAddExpenseModal()
          }
        >
          add
        </span>
      </div>

      <div className="transactions-sidebar-container">
        <div className="transactions-sidebar-actions">
          <div className="transactions-sidebar-header">
            <span className="material-symbols-rounded header-icon">menu</span>
            <span className="header-text">Menu</span>
          </div>

          <ul className="sidebar-links">
            <li>
              <button
                className={`d-flex sidebar-button ${
                  currentView === "revenue" ? "active" : ""
                }`}
                onClick={() => toggleView("revenue")}
              >
                <span className="material-symbols-rounded icon">
                  attach_money
                </span>
                <span>Revenue</span>
              </button>
            </li>
            <li>
              <button
                className={`d-flex sidebar-button ${
                  currentView === "expenses" ? "active" : ""
                }`}
                onClick={() => toggleView("expenses")}
              >
                <span className="material-symbols-rounded icon">
                  send_money
                </span>
                <span>Expenses</span>
              </button>
            </li>
          </ul>
        </div>

        {currentView === "revenue" && (
          <ul className="transactions-sidebar-due-payments">
            <h2 className="due-payments-title">Due Payments</h2>
            <div className="due-payments">
              {unpaidInvoice.map((customer, index) => (
                <li key={index} className="customer">
                  <div className="customer-info">
                    <span className="customer-name">{customer.full_name}</span>
                    <span className="customer-house">
                      {customer.house_section}, {customer.house_number}
                    </span>
                    <span className="customer-amount">
                      Amount: ${customer.total_amount}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionSidebar;
