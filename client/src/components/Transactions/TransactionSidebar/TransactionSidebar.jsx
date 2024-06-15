// TransactionSidebar.js
import React from "react";
import "./TransactionSidebar.css";

const customers = [
  { name: "John Doe", house: "Osupuko, 77", amount: 1000 },
  { name: "Jane Doe", house: "Nairobi, 77", amount: 2500 },
  { name: "John Smith", house: "Chui Lane, 77", amount: 500 },
  { name: "Jane Smith", house: "Phase 3, 77", amount: 1200 },
];

const TransactionSidebar = ({
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
              {customers.map((customer, index) => (
                <li key={index} className="customer">
                  <div className="customer-info">
                    <span className="customer-name">{customer.name}</span>
                    <span className="customer-house">{customer.house}</span>
                    <span className="customer-amount">
                      Amount: ${customer.amount}
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
