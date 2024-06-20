// utils.js
import _ from "lodash";

export const transformData = (revenue, filters) => {
  const filteredData = revenue.filter((rev) => {
    const revDate = new Date(rev.payment_date);
    const revYear = revDate.getFullYear().toString();
    const statusMatch =
      filters.status === "all" || rev.payment_status === filters.status;
    const yearMatch = !filters.year || revYear === filters.year;
    return statusMatch && yearMatch;
  });

  // Calculate monthly revenue using lodash for the AreaChart
  const monthlyRevenue = _.chain(filteredData)
    .groupBy((rev) =>
      new Date(rev.payment_date).toLocaleString("default", { month: "short" })
    )
    .map((group, month) => ({
      month,
      revenue: _.sumBy(group, "amount"),
    }))
    .orderBy((data) => new Date(`2000 ${data.month}`))
    .value();

  // Prepare data for pie chart (payment method breakdown)
  const paymentMethodData = _.chain(filteredData)
    .groupBy("payment_method")
    .map((group, method) => ({
      name: method,
      value: _.sumBy(group, "amount"),
    }))
    .value();

  return { lineChartData: monthlyRevenue, pieChartData: paymentMethodData };
};

export const COLORS = ["#8884d8", "#a4de6c", "#ffc658", "#82ca9d", "#ff8042"];
