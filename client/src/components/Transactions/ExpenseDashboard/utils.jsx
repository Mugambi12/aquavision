// utils.jsx
import _ from "lodash";

export const getShortMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};
