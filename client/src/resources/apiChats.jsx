const BASE_URL = "/api/chats";

export const fetchMessage = async () => {
  const response = await fetch(`${BASE_URL}/get-chats`);
  if (!response.ok) {
    throw new Error("Failed to fetch message");
  }
  return await response.json();
};

export const postMessage = async (message) => {
  const response = await fetch(`${BASE_URL}/send-chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return await response.json();
};
