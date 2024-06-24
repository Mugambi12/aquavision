// src/api/apiExpenses.js

export const fetchHighestExpenses = async () => {
  const response = await fetch("/api/expenses/get/highest");
  if (!response.ok) {
    throw new Error("Failed to fetch highest expenses");
  }
  return await response.json();
};

export const fetchExpenses = async () => {
  const response = await fetch("/api/expenses/get");
  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }
  return await response.json();
};

export const postExpense = async (expense) => {
  const response = await fetch("/api/expenses/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to create expense");
  }
  return await response.json();
};

export const updateExpense = async (expense) => {
  const response = await fetch(`/api/expenses/update/${expense._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to update expense");
  }
  return await response.json();
};

export const deleteExpense = async (expenseId) => {
  const response = await fetch(`/api/expenses/delete/${expenseId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
  return await response.json();
};
