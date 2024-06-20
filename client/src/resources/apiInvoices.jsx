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
  const response = await fetch(`${BASE_URL}/invoice-list`);
  return handleFetchResponse(response);
};

export const postInvoice = async (newInvoice) => {
  const response = await fetch(`${BASE_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInvoice),
  });
  return handleFetchResponse(response);
};

export const deleteInvoice = async (invoice_id) => {
  const response = await fetch(`${BASE_URL}/delete/${invoice_id}`, {
    method: "DELETE",
  });
  return handleFetchResponse(response);
};

export const processInvoicePayment = async (invoice) => {
  console.log("Processing payment for invoice:", invoice);
  const invoicePaymentData = {
    invoice_id: invoice._id,
    user_id: invoice.user_id,
  };

  const response = await fetch(`${BASE_URL}/pay/${invoice._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoicePaymentData),
  });

  return handleFetchResponse(response);
};
