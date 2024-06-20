import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

// Component for the RevenueTableContainer
const RevenueTableContainer = ({
  revenue,
  openDropdownId,
  toggleDropdown,
  openEditRevenueModal,
  openRefundRevenueModal,
  openDeleteRevenueModal,
}) => {
  // Initialize DataTable on component mount
  useEffect(() => {
    const table = new DataTable("#revenueTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  // Sort the revenue array by payment_date in descending order
  // const sortedRevenue = [...revenue].sort(
  //   (a, b) => new Date(b.payment_date) - new Date(a.payment_date)
  // );

  return (
    <div className="revenue-table-container">
      <table id="revenueTable" className="revenue-table display nowrap">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {revenue.map((rev) => (
            <tr key={rev._id}>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                #{rev._id}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {new Date(rev.payment_date).toLocaleDateString()}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {rev.full_name}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {rev.transaction_id}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {rev.payment_method}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {rev.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td
                className={`revenue-table-row ${
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }`}
              >
                {rev.payment_status}
              </td>

              <td
                className={`revenue-table-row options ${
                  openDropdownId === rev._id ? "active" : ""
                }`}
              >
                <span
                  className="material-symbols-rounded"
                  onClick={() => toggleDropdown(rev._id)}
                >
                  {openDropdownId === rev._id ? "close" : "more_vert"}
                </span>
                {openDropdownId === rev._id && (
                  <div className="revenue-options-dropdown">
                    <button
                      className="revenue-option"
                      onClick={() => openEditRevenueModal(rev)}
                    >
                      <span className="material-symbols-rounded edit">
                        edit
                      </span>
                      <span className="dropdown-option-label edit">Edit</span>
                    </button>
                    <button
                      className="revenue-option"
                      onClick={() => openRefundRevenueModal(rev)}
                    >
                      <span className="material-symbols-rounded refund">
                        money_off
                      </span>
                      <span className="dropdown-option-label refund">
                        Refund
                      </span>
                    </button>
                    <button
                      className="revenue-option"
                      onClick={() => openDeleteRevenueModal(rev)}
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

export default RevenueTableContainer;
