// src/api/apiExpenses.js

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
