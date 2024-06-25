// apiPeople.js

//const apiEndPoint = "https://fedskillstest.coalitiontechnologies.workers.dev";
//const credentials = "Y29hbGl0aW9uOnNraWxscy10ZXN0";
//
//export const fetchUsers = async () => {
//  try {
//    const response = await fetch(apiEndPoint, {
//      headers: {
//        Authorization: `Basic ${credentials}`,
//      },
//    });
//
//    if (!response.ok) {
//      throw new Error(`HTTP error! status: ${response.status}`);
//    }
//
//    return await response.json();
//  } catch (error) {
//    console.error("Error fetching people data:", error);
//    return [];
//  }
//};

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
