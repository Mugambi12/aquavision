// utils.js

export const transformData = (revenue, filters) => {
  const filteredData = revenue.filter((rev) => {
    const revDate = new Date(rev.payment_date);
    const revYear = revDate.getFullYear().toString();
    const statusMatch =
      filters.status === "all" || rev.payment_status === filters.status;
    const yearMatch = !filters.year || revYear === filters.year;
    return statusMatch && yearMatch;
  });

  // Calculate monthly revenue for the AreaChart
  const monthlyRevenue = filteredData.reduce((acc, rev) => {
    const month = new Date(rev.payment_date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + rev.amount;
    return acc;
  }, {});

  const lineChartData = Object.keys(monthlyRevenue).map((month) => ({
    month,
    revenue: monthlyRevenue[month],
  }));

  const paymentMethodData = filteredData.reduce((acc, rev) => {
    acc[rev.payment_method] = (acc[rev.payment_method] || 0) + rev.amount;
    return acc;
  }, {});

  const pieChartData = Object.keys(paymentMethodData).map((method) => ({
    name: method,
    value: paymentMethodData[method],
  }));

  return { lineChartData, pieChartData };
};

export const COLORS = ["#8884d8", "#a4de6c", "#ffc658", "#82ca9d", "#ff8042"];
