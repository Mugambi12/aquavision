export const postForgotPassword = async (email) => {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (!response.ok) {
    throw new Error("Failed to add invoice");
  }
  return await response.json();
};
