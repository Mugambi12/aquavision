import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

// Component for the RevenueTable
const RevenueTable = ({
  revenue,
  openRefundRevenueModal,
  openDeleteRevenueModal,
  openViewRevenueModal,
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

  return (
    <div className="revenue-table-container">
      <table id="revenueTable" className="revenue-table display nowrap">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>View</th>
            <th>Refund</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {revenue.map((rev) => (
            <tr key={rev._id}>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                #{rev._id}
              </td>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                {new Date(rev.payment_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </td>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                {rev.full_name}
              </td>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                {rev.transaction_id}
              </td>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                {rev.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </td>
              <td
                className={
                  rev.payment_status === "Cancelled" ? "Cancelled" : ""
                }
              >
                {rev.payment_status}
              </td>
              <td className="revenue-table-row">
                <button
                  className="material-symbols-rounded view"
                  onClick={() => openViewRevenueModal(rev)}
                >
                  visibility
                </button>
              </td>
              <td className="revenue-table-row">
                <button
                  className="material-symbols-rounded refund"
                  onClick={() => openRefundRevenueModal(rev)}
                >
                  money_off
                </button>
              </td>
              <td className="revenue-table-row">
                <button
                  className="material-symbols-rounded delete"
                  onClick={() => openDeleteRevenueModal(rev)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTable;
