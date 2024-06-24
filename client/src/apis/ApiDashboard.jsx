// src/api/apiHome.js

const BASE_URL = "/api/invoices";

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

export const fetchActiveHouses = async () => {
  const response = await fetch(`${BASE_URL}/get`);
  return handleFetchResponse(response);
};
