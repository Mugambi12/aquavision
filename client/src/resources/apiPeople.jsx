// apiPeople

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
