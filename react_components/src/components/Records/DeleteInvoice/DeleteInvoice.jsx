import React from "react";
import "./DeleteInvoice.css";

const DeleteInvoice = ({ invoice, onSubmit }) => {
  const handleDeleteInvoice = () => {
    onSubmit();
  };

  return (
    <div className="delete-invoice-container">
      <h2 className="delete-invoice-title">Confirm Deletion</h2>
      {invoice && (
        <div className="delete-invoice-details">
          <p className="delete-invoice-info">
            Are you sure you want to delete invoice number:{" "}
            <strong>{invoice.invoiceNo}</strong>?
          </p>
          <p className="delete-invoice-info">This action cannot be undone.</p>
        </div>
      )}

      <div className="delete-invoice-btn" onClick={handleDeleteInvoice}>
        Delete
      </div>
    </div>
  );
};

export default DeleteInvoice;
