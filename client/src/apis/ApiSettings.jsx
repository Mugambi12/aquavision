const BASE_URL = "/api/settings";

export const fetchSettings = async () => {
  const response = await fetch(`${BASE_URL}/get-settings`);
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return await response.json();
};

export const postSettings = async (settings) => {
  const response = await fetch(`${BASE_URL}/update-settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error("Failed to send settings");
  }
  return await response.json();
};
