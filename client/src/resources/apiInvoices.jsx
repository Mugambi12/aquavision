// src/api/apiInvoices.js

const BASE_URL = "/api/invoices";

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

export const fetchActiveHouses = async () => {
  const response = await fetch(`${BASE_URL}/active-houses`);
  return handleFetchResponse(response);
};

export const fetchInvoices = async () => {
  const response = await fetch("/api/invoices/invoice-list");
  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  return await response.json();
};

export const postInvoice = async (newInvoice) => {
  const response = await fetch("/api/invoices/post", {
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

export const deleteInvoice = async (invoice_id) => {
  const response = await fetch(`/api/invoices/delete/${invoice_id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete invoice");
  }
  return await response.json();
};

export const processInvoicePayment = async (invoice) => {
  console.log("Processing payment for invoice:", invoice);
  const invoicePaymentData = {
    invoice_id: invoice._id,
    user_id: invoice.user_id,
  };

  const response = await fetch(`/api/invoices/pay/${invoice_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoicePaymentData),
  });

  if (!response.ok) {
    throw new Error("Failed to process payment");
  }

  return await response.json();
};
