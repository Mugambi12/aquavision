import React from "react";

const ViewInvoice = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="view-invoice-container">
      <h2 className="view-invoice-title">
        Viewing Invoice of {invoice.full_name}
      </h2>
      <div className="view-invoice-details">
        <div className="invoice-detail">
          <span className="label">Invoice ID:</span>
          <span className="value">{invoice._id}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Full Name:</span>
          <span className="value">{invoice.full_name}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">House Section:</span>
          <span className="value">{invoice.house_section}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">House Number:</span>
          <span className="value">{invoice.house_number}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Previous Reading:</span>
          <span className="value">{invoice.previous_reading}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Current Reading:</span>
          <span className="value">{invoice.current_reading}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Consumption:</span>
          <span className="value">{invoice.consumption}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Unit Price:</span>
          <span className="value">
            {invoice.unit_price.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </span>
        </div>
        <div className="invoice-detail">
          <span className="label">Service Fee:</span>
          <span className="value">
            {invoice.service_fee.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </span>
        </div>
        <div className="invoice-detail">
          <span className="label">Total Amount:</span>
          <span className="value">
            {invoice.total_amount.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </span>
        </div>
        <div className="invoice-detail">
          <span className="label">Paid Amount:</span>
          <span className="value">
            {invoice.paid_amount.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </span>
        </div>
        <div className="invoice-detail">
          <span className="label">Balance:</span>
          <span className="value">
            {invoice.balance.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </span>
        </div>
        <div className="invoice-detail">
          <span className="label">Payment Status:</span>
          <span className="value">{invoice.payment_status_text}</span>
        </div>
        <div className="invoice-detail">
          <span className="label">Created At:</span>
          <span className="value">
            {new Date(invoice.created_at).toLocaleString()}
          </span>
        </div>
        {invoice.updated_at && (
          <div className="invoice-detail">
            <span className="label">Updated At:</span>
            <span className="value">
              {new Date(invoice.updated_at).toLocaleString()}
            </span>
          </div>
        )}
        {invoice.deleted_at && (
          <div className="invoice-detail">
            <span className="label">Deleted At:</span>
            <span className="value">
              {new Date(invoice.deleted_at).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoice;
