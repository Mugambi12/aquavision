// utils.jsx
export const getShortMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};

export const COLORS = ["#0088FE", "#F0F0F0"];
