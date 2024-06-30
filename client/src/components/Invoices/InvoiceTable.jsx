// InvoiceTable.js

import React, { useEffect } from "react";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import jsPDF from "jspdf";

const InvoiceTable = ({
  data,
  processing,
  handlePayment,
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

  const handleDownloadPDF = (invoice) => {
    const pdf = new jsPDF();

    // Set styles for PDF content
    pdf.setFont("helvetica");
    pdf.setFontSize(12);
    pdf.setTextColor(33, 33, 33);

    // Add header
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(18);
    pdf.text("Invoice Details", 15, 15, { align: "left" });
    pdf.setFontSize(16);
    pdf.text(`${invoice.company_name}`, 195, 15, {
      align: "right",
    });
    pdf.line(15, 20, 195, 20);

    // Add invoice details
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Company Name: ${invoice.company_name}`, 15, 30);
    pdf.text(`Full Name: ${invoice.full_name}`, 15, 40);
    pdf.text(`House Section: ${invoice.house_section}`, 15, 50);
    pdf.text(`House Number: ${invoice.house_number}`, 15, 60);
    pdf.text(`Previous Reading: ${invoice.previous_reading}`, 15, 70);
    pdf.text(`Current Reading: ${invoice.current_reading}`, 15, 80);
    pdf.text(
      `Consumption: ${invoice.consumption} ${
        invoice.consumption !== 1 ? "Units" : "Unit"
      }`,
      15,
      90
    );
    pdf.text(
      `Unit Price: KES ${invoice.unit_price.toLocaleString()}`,
      150,
      100
    );
    pdf.text(
      `Service Fee: KES ${invoice.service_fee.toLocaleString()}`,
      150,
      110
    );
    pdf.text(
      `Total Amount: KES ${invoice.total_amount.toLocaleString()}`,
      150,
      120
    );
    pdf.text(
      `Paid Amount: KES ${invoice.paid_amount.toLocaleString()}`,
      150,
      130
    );
    pdf.text(`Balance: KES ${invoice.balance.toLocaleString()}`, 150, 140);
    pdf.text(`Payment Status: ${invoice.payment_status_text}`, 150, 150);
    pdf.text(
      `Date: ${new Date(invoice.created_at).toLocaleDateString()}`,
      150,
      160
    );

    // Add footer
    pdf.setTextColor(100);
    pdf.setFontSize(10);
    pdf.text(`Invoice ID: ${invoice._id}`, 105, 290, { align: "center" });

    // Get the current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    // Save PDF
    pdf.save(`${formattedDate}_invoice_${invoice._id}.pdf`);
  };

  return (
    <div className="records-table-container">
      <table id="invoiceTable" className="records-invoice-table display nowrap">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Full Name</th>
            <th>Consumption</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Payment</th>
            <th>View</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((invoice) => (
            <tr key={invoice._id}>
              <td>
                <div
                  className={`records-status ${invoice.payment_status}-bg`}
                ></div>
              </td>
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
              <td>
                {invoice.consumption}{" "}
                {invoice.consumption !== 1 ? "Units" : "Unit"}
              </td>
              <td>
                {invoice.total_amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "KES",
                })}
              </td>
              <td>
                <div className={`records-amount ${invoice.payment_status}`}>
                  {invoice.balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "KES",
                  })}
                </div>
              </td>
              <td>
                {processing === invoice._id ? (
                  <div className="loader"></div>
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
                  className="material-symbols-rounded download"
                  onClick={() => handleDownloadPDF(invoice)}
                >
                  download
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
  );
};

export default InvoiceTable;
