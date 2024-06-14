// src/api/apiInvoices.js

export const fetchInvoices = async () => {
  const response = await fetch("/api/invoices");
  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  return await response.json();
};

export const postInvoice = async (newInvoice) => {
  const response = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInvoice),
  });
  if (!response.ok) {
    throw new Error("Failed to add invoice");
  }
  return await response.json();
};

export const deleteInvoice = async (invoiceNo) => {
  const response = await fetch(`/api/invoices/${invoiceNo}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete invoice");
  }
  return await response.json();
};

export const processInvoicePayment = async (invoiceNo) => {
  const response = await fetch(`/api/invoices/${invoiceNo}/pay`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "paid" }),
  });
  if (!response.ok) {
    throw new Error("Failed to process payment");
  }
  return await response.json();
};
