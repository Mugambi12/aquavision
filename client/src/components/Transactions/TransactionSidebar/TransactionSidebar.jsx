// TransactionSidebar.js
import React from "react";
import "./TransactionSidebar.css";

const TransactionSidebar = ({
  unpaidInvoice,
  highestExpenses,
  toggleView,
  currentView,
  openCreateRevenueModal,
  openCreateExpenseModal,
}) => {
  return (
    <div className="transaction-sidebar">
      <div className="transaction-sidebar-mobile">
        <span className="material-symbols-rounded transaction-sidebar-icon">
          monitoring
        </span>
        <div className="transaction-sidebar-mobile-title">
          <div className="transaction-sidebar-mobile-revenue-info">
            <span className="transaction-sidebar-customer-invoice">
              Revenue
            </span>
          </div>
        </div>
        <span
          className="material-symbols-rounded transaction-sidebar-icon-segment"
          onClick={() =>
            currentView === "revenue"
              ? openCreateRevenueModal()
              : openCreateExpenseModal()
          }
        >
          add
        </span>
      </div>

      <div className="transaction-sidebar-content">
        <div className="transaction-sidebar-actions">
          <div className="transaction-sidebar-header">
            <span className="material-symbols-rounded transaction-sidebar-header-icon">
              menu
            </span>
            <span className="transaction-sidebar-header-text">Menu</span>
          </div>

          <ul className="transaction-sidebar-links">
            <li>
              <button
                className={`d-flex transaction-sidebar-button ${
                  currentView === "revenue" ? "active" : ""
                }`}
                onClick={() => toggleView("revenue")}
              >
                <span className="material-symbols-rounded transaction-sidebar-icon">
                  attach_money
                </span>
                <span>Revenue</span>
              </button>
            </li>
            <li>
              <button
                className={`d-flex transaction-sidebar-button ${
                  currentView === "expenses" ? "active" : ""
                }`}
                onClick={() => toggleView("expenses")}
              >
                <span className="material-symbols-rounded transaction-sidebar-icon">
                  send_money
                </span>
                <span>Expenses</span>
              </button>
            </li>
          </ul>
        </div>

        {currentView === "revenue" && (
          <ul className="transaction-sidebar-list-items">
            <h2 className="transaction-sidebar-list-items-title">
              Due Payments
            </h2>
            <div className="transaction-sidebar-list-items-list">
              {unpaidInvoice.map((customer, index) => (
                <li key={index} className="transaction-sidebar-customer">
                  <div className="transaction-sidebar-customer-info">
                    <span className="transaction-sidebar-customer-name">
                      {customer.full_name}
                    </span>
                    <span className="transaction-sidebar-customer-house">
                      {customer.house_section}, {customer.house_number}
                    </span>
                    <span className="transaction-sidebar-customer-amount">
                      {customer.total_amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        )}

        {currentView === "expenses" && (
          <ul className="transaction-sidebar-list-items">
            <h2 className="transaction-sidebar-list-items-title">
              Highest Expenses
            </h2>
            <div className="transaction-sidebar-list-items-list">
              {highestExpenses.map((expense, index) => (
                <li key={index} className="transaction-sidebar-customer">
                  <div className="transaction-sidebar-customer-info">
                    <span className="transaction-sidebar-customer-name">
                      {expense.type}
                    </span>
                    <span className="transaction-sidebar-customer-amount">
                      Amount:{" "}
                      {expense.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                      })}
                    </span>
                    <span className="transaction-sidebar-customer-house">
                      Average:{" "}
                      {expense.average.toLocaleString("en-US", {
                        style: "currency",
                        currency: "KES",
                      })}
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
