import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./InvoiceDataTable.css";

const InvoiceDataTable = ({
  data,
  /*Filter,*/
  /*setFilter,*/
  processing,
  handlePayment,
  openPostModal,
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
    <div className="records-container">
      <div className="records-header">
        <div className="records-header-content">
          <div className="column">
            <span className="records-cust-invoice">Customer Invoice</span>
            <span className="records-heading">Water Management System</span>
            <span className="records-company">Dakoke Springs Ltd</span>
          </div>
          <div className="records-progress-section">
            <span className="records-label">Progress</span>
            <div className="records-progress"></div>
          </div>
          <div className="records-download-section">
            <span className="records-label">Download</span>
            <div className="records-download-buttons">
              <div className="download-button red">
                <span className="material-symbols-rounded">picture_as_pdf</span>
              </div>
              <div className="download-button blue">
                <span className="material-symbols-rounded">csv</span>
              </div>
              <div className="download-button purple">
                <span className="material-symbols-rounded">table_chart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="records-menu">
        <span
        /*className={Filter === "all" ? "records-active" : ""}
          onClick={() => setFilter("all")}*/
        >
          All
        </span>
        <span
        /*className={Filter === "unpaid" ? "records-active" : ""}
          onClick={() => setFilter("unpaid")}*/
        >
          Unpaid
        </span>
        <span
        /*className={Filter === "paid" ? "records-active" : ""}
          onClick={() => setFilter("paid")}*/
        >
          Paid
        </span>
      </div>

      <div className="records-table-container">
        <table
          id="invoiceTable"
          className="records-invoice-table display nowrap"
        >
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
                <td>{invoice.consumption} Units</td>
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

      <div className="records-add-invoice-container">
        <div className="records-add-invoice" onClick={openPostModal}>
          <span className="material-symbols-rounded">add</span>
          <span className="records-invoice-label">Invoice</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDataTable;
