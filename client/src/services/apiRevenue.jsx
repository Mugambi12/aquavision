// src/api/apiRevenue.js

export const fetchUnpaidInvoicesList = async () => {
  const response = await fetch("/api/payments/get/unpaid-invoices");
  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }
  return await response.json();
};

export const fetchActiveUsersList = async () => {
  const response = await fetch("/api/payments/get/users");
  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }
  return await response.json();
};

export const fetchRevenue = async () => {
  const response = await fetch("/api/payments/get/revenue");
  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }
  return await response.json();
};

export const postRevenue = async (newRevenue) => {
  const response = await fetch("/api/payments/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRevenue),
  });
  if (!response.ok) {
    throw new Error("Failed to add revenue");
  }
  return await response.json();
};

export const deleteRevenue = async (revenueId) => {
  const response = await fetch(`/api/payments/delete/${revenueId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete revenue");
  }
  return await response.json();
};

export const updateRevenue = async (updatedRevenue) => {
  const response = await fetch(`/api/payments/update/${updatedRevenue._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRevenue),
  });
  if (!response.ok) {
    throw new Error("Failed to update revenue");
  }
  return await response.json();
};

export const refundRevenue = async (revenueId) => {
  const response = await fetch(`/api/payments/refund/${revenueId}`, {
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Failed to refund revenue");
  }
  return await response.json();
};
