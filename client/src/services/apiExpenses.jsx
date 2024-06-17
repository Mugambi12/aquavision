// src/api/apiExpenses.js

export const fetchExpenses = async () => {
  const response = await fetch("/api/expenses/get");
  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }
  return await response.json();
};
