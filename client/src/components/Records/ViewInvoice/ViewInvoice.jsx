import React from "react";
import "./ViewInvoice.css";

const ViewInvoice = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="view-invoice-container">
      <h2 className="view-invoice-title">Viewing Invoice {invoice.full_name}</h2>
      <div className="view-invoice-details">
        <p><strong>ID:</strong> {invoice._id}</p>
        <p><strong>Company:</strong> {invoice.company_name}</p>
        <p><strong>Full Name:</strong> {invoice.full_name}</p>
        <p><strong>Previous Reading:</strong> {invoice.previous_reading}</p>
        <p><strong>Current Reading:</strong> {invoice.current_reading}</p>
        <p><strong>Consumption:</strong> {invoice.consumption}</p>
        <p><strong>Unit Price:</strong> {invoice.unit_price}</p>
        <p><strong>Service Fee:</strong> {invoice.service_fee}</p>
        <p><strong>Total Amount:</strong> {invoice.total_amount}</p>
        <p><strong>Paid Amount:</strong> {invoice.paid_amount}</p>
        <p><strong>Balance:</strong> {invoice.balance}</p>
        <p><strong>Payment Status:</strong> {invoice.payment_status_text}</p>
        <p><strong>Created At:</strong> {new Date(invoice.created_at).toLocaleString()}</p>
        {invoice.updated_at && <p><strong>Updated At:</strong> {new Date(invoice.updated_at).toLocaleString()}</p>}
        {invoice.deleted_at && <p><strong>Deleted At:</strong> {new Date(invoice.deleted_at).toLocaleString()}</p>}
      </div>
    </div>
  );
};

export default ViewInvoice;
