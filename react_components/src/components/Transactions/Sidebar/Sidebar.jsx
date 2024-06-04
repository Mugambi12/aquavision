import React from "react";
import "./Sidebar.css";

const Sidebar = ({ toggleView, currentView }) => {
  return (
    <div className="transactions-sidebar">
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
              <span className="material-symbols-rounded icon">send_money</span>
              <span>Expenses</span>
            </button>
          </li>
        </ul>
      </div>

      <DuePaymentsList />
    </div>
  );
};

const DuePaymentsList = () => {
  const customers = [
    { name: "John Doe", house: "Osupuko, 77", amount: 1000 },
    { name: "Jane Doe", house: "Nairobi, 77", amount: 2500 },
    { name: "John Smith", house: "Chui Lane, 77", amount: 500 },
    { name: "Jane Smith", house: "Phase 3, 77", amount: 1200 },
  ];

  return (
    <ul class="transactions-sidebar-due-payments">
      <h2 class="due-payments-title">Due Payments</h2>
      <div class="due-payments">
        {customers.map((customer, index) => (
          <li key={index} class="customer">
            <div class="customer-info">
              <span class="customer-name">{customer.name}</span>
              <span class="customer-house">{customer.house}</span>
              <span class="customer-amount">Amount: ${customer.amount}</span>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Sidebar;
