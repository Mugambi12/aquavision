import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "./Invoices.css";
import AddInvoiceForm from "../AddInvoiceForm/AddInvoiceForm";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import invoiceData from "../../../db/invoiceData";

const Invoices = ({ onAddInvoice }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredData, setFilteredData] = useState(invoiceData);
  const [processingInvoiceId, setProcessingInvoiceId] = useState("");

  //console.log("Selected Filter: ", selectedFilter);
  //console.log("Filtered Data: ", filteredData);

  useEffect(() => {
    const table = new DataTable("#invoiceTable", {
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  const filtered = invoiceData.filter(
    (invoice) => invoice.status === selectedFilter.toLowerCase()
  );

  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredData(invoiceData);
    } else {
      setFilteredData(filtered);
    }
  }, [selectedFilter]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddInvoice = (newInvoice) => {
    onAddInvoice(newInvoice);
    setIsModalOpen(false);
  };

  const handleInvoicePayment = (invoice) => {
    setProcessingInvoiceId(invoice.invoiceNo);

    // Simulate payment process with setTimeout
    setTimeout(() => {
      const updatedInvoice = { ...invoice, status: "paid" };
      const updatedData = invoiceData.map((inv) =>
        inv.invoiceNo === updatedInvoice.invoiceNo ? updatedInvoice : inv
      );
      setFilteredData(updatedData);
      setProcessingInvoiceId(null);
      console.log("Payment made:", updatedInvoice);
    }, 2000);
  };

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
        <table id="invoiceTable" className="records-invoice-table display">
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Invoice No</th>
              <th>Client</th>
              <th>Description</th>
              <th>Status Text</th>
              <th>Amount</th>
              <th>Action</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((invoice, index) => (
              <tr className="records-invoice-row" key={index}>
                <td>
                  <div className={`records-status ${invoice.status}-bg`}></div>
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
                    {invoice.amount}
                  </div>
                </td>

                <td>
                  {processingInvoiceId === invoice.invoiceNo ? (
                    <div className="loader"></div>
                  ) : (
                    <span
                      className="make-payment"
                      onClick={() => handleInvoicePayment(invoice)}
                    >
                      Pay
                    </span>
                  )}
                </td>

                <td>
                  <span className="material-symbols-rounded more-vertical">
                    more_vert
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="records-add-invoice-container">
        <div
          className="records-add-invoice"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-symbols-rounded">add</span>
          <span className="records-invoice-label">Invoice</span>
        </div>
      </div>

      <ModalWrapper
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <AddInvoiceForm onSubmit={handleAddInvoice} />
      </ModalWrapper>
    </div>
  );
};

export default Invoices;
