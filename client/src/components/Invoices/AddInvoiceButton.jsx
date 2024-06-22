// AddInvoiceButton.js
import React from "react";
import "./AddInvoiceButton.css";

const AddInvoiceButton = ({ openPostModal }) => (
  <div className="add-button-invoice-container">
    <div className="add-button-invoice" onClick={openPostModal}>
      <span className="material-symbols-rounded">add</span>
      <span className="add-button-invoice-label">Invoice</span>
    </div>
  </div>
);

export default AddInvoiceButton;
