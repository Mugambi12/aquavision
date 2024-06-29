// apiPeople.js

const BASE_URL = "/api/users";

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

export const fetchPeople = async () => {
  const response = await fetch(`${BASE_URL}/users-data`);
  return handleFetchResponse(response);
};

export const fetchHouseSections = async () => {
  const response = await fetch(`${BASE_URL}/house-sections`);
  return handleFetchResponse(response);
};
