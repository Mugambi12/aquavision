// src/api/apiRevenue.js

const BASE_URL = "/api/payments";

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

export const fetchUnpaidInvoice = async () => {
  const response = await fetch(`${BASE_URL}/get/unpaid-invoices`);
  return handleFetchResponse(response);
};

export const fetchActiveUsersList = async () => {
  const response = await fetch(`${BASE_URL}/get/users`);
  return handleFetchResponse(response);
};

export const fetchRevenue = async () => {
  const response = await fetch(`${BASE_URL}/get/revenue`);
  return handleFetchResponse(response);
};

export const postRevenue = async (newRevenue) => {
  const response = await fetch(`${BASE_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRevenue),
  });
  return handleFetchResponse(response);
};

export const deleteRevenue = async (revenueId) => {
  const response = await fetch(`${BASE_URL}/delete/${revenueId}`, {
    method: "DELETE",
  });
  return handleFetchResponse(response);
};

export const updateRevenue = async (updatedRevenue) => {
  const response = await fetch(`${BASE_URL}/update/${updatedRevenue._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRevenue),
  });
  return handleFetchResponse(response);
};

export const refundRevenue = async (revenueId) => {
  const response = await fetch(`${BASE_URL}/refund/${revenueId}`, {
    method: "PUT",
  });
  return handleFetchResponse(response);
};
