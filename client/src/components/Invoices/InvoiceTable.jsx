// InvoiceTable.js
import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

const InvoiceTable = ({
  data,
  processing,
  handlePayment,
  openViewModal,
  openDeleteModal,
}) => {
  useEffect(() => {
    const table = new DataTable("#invoiceTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, [data]);

  return (
    <div className="records-table-container">
      <table id="invoiceTable" className="records-invoice-table display nowrap">
        <thead>
          <tr>
            <th>Status</th>
            {/*<th>User ID</th>*/}
            <th>Date</th>
            <th>Full Name</th>
            <th>Consumption</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Action</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((invoice) => (
            <tr className="records-invoice-row" key={invoice._id}>
              <td>
                <div
                  className={`records-status ${invoice.payment_status}-bg`}
                ></div>
              </td>
              {/*<td>{invoice.user_id}</td>*/}
              <td>
                <div className="records-date-info">
                  <span className="records-month">
                    {new Date(invoice.created_at).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="records-date">
                    {new Date(invoice.created_at).getDate()}
                  </span>
                </div>
              </td>
              <td>{invoice.full_name}</td>
              <td>
                {invoice.consumption}{" "}
                {invoice.consumption !== 1 ? "Units" : "Unit"}
              </td>
              <td>
                {invoice.total_amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </td>
              <td>
                <div className={`records-amount ${invoice.payment_status}`}>
                  <span>
                    {invoice.balance.toLocaleString("en-US", {
                      style: "currency",
                      currency: "KES",
                    })}
                  </span>
                </div>
              </td>
              <td>
                {processing === invoice._id ? (
                  <span className="loader"></span>
                ) : (
                  invoice.payment_status === "unpaid" && (
                    <span
                      className="material-symbols-rounded pay"
                      onClick={() => handlePayment(invoice)}
                    >
                      payment
                    </span>
                  )
                )}
              </td>
              <td>
                <span
                  className="material-symbols-rounded view"
                  onClick={() => openViewModal(invoice)}
                >
                  visibility
                </span>
              </td>
              <td>
                <span
                  className="material-symbols-rounded delete"
                  onClick={() => openDeleteModal(invoice)}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
