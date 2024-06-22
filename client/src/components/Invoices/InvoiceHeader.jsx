// InvoicesHeader.js
import React from "react";
import "./InvoiceHeader.css";

const InvoicesHeader = () => (
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
);

export default InvoicesHeader;
