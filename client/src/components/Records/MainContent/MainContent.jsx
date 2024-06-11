import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./MainContent.css";

const MainContent = ({
  data,
  selectedFilter,
  setSelectedFilter,
  processingInvoiceId,
  handleInvoicePayment,
  openDeleteInvoiceModal,
  openAddInvoiceModal,
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
          className={selectedFilter === "All" ? "records-active" : ""}
          onClick={() => setSelectedFilter("All")}
        >
          All
        </span>
        <span
          className={selectedFilter === "Unpaid" ? "records-active" : ""}
          onClick={() => setSelectedFilter("Unpaid")}
        >
          Unpaid
        </span>
        <span
          className={selectedFilter === "Paid" ? "records-active" : ""}
          onClick={() => setSelectedFilter("Paid")}
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
              <th>Action</th>
              <th>Date</th>
              <th>Invoice No</th>
              <th>Client</th>
              <th>Description</th>
              <th>Status Text</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice, index) => (
              <tr className="records-invoice-row" key={index}>
                <td>
                  <div className={`records-status ${invoice.status}-bg`}></div>
                </td>
                <td>
                  {processingInvoiceId === invoice.invoiceNo ? (
                    <span className="loader"></span>
                  ) : (
                    <>
                      {invoice.status === "unpaid" && (
                        <span
                          className="material-symbols-rounded pay"
                          onClick={() => handleInvoicePayment(invoice)}
                        >
                          payment
                        </span>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <div className="records-date-info">
                    <span className="records-month">
                      {new Date(invoice.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                    <span className="records-date">
                      {new Date(invoice.date).getDate()}
                    </span>
                  </div>
                </td>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.client}</td>
                <td>{invoice.description}</td>
                <td>
                  <div className={`records-status-text ${invoice.status}`}>
                    {invoice.statusText}
                  </div>
                </td>
                <td>
                  <div className={`records-amount ${invoice.status}`}>
                    <span>{invoice.amount}</span>
                    <span className="balance">{invoice.balance}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => openDeleteInvoiceModal(invoice)}
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
        <div className="records-add-invoice" onClick={openAddInvoiceModal}>
          <span className="material-symbols-rounded">add</span>
          <span className="records-invoice-label">Invoice</span>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
