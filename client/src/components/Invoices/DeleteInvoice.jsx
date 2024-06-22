import React from "react";

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
            Are you sure you want to delete this invoice?
          </p>
          <p className="delete-invoice-info">This action cannot be undone.</p>
          <p>{invoice._id}</p>
        </div>
      )}

      <button className="delete-invoice-btn" onClick={handleDeleteInvoice}>
        Delete Invoice
      </button>
    </div>
  );
};

export default DeleteInvoice;
