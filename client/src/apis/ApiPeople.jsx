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

export const createNewUser = async (newUser) => {
  const response = await fetch(`${BASE_URL}/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return handleFetchResponse(response);
};

export const updateUser = async (updatedUser) => {
  const response = await fetch(`${BASE_URL}/update-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return handleFetchResponse(response);
};
