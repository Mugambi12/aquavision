// AddInvoiceButton.js
import React from "react";
import "./AddInvoiceButton.css";

const AddInvoiceButton = ({ openPostModal }) => (
  <div className="records-add-invoice-container">
    <div className="records-add-invoice" onClick={openPostModal}>
      <span className="material-symbols-rounded">add</span>
      <span className="records-invoice-label">Invoice</span>
    </div>
  </div>
);

export default AddInvoiceButton;
