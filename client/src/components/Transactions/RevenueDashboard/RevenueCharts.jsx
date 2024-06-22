import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { COLORS, transformData } from "./utils";

const RevenueCharts = ({
  revenue,
  filters,
  availableYears,
  handleYearChange,
  handleStatusChange,
}) => {
  const [filteredRevenue, setFilteredRevenue] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);

  useEffect(() => {
    const { lineChartData, pieChartData } = transformData(revenue, filters);
    setFilteredRevenue(lineChartData);
    setPaymentMethodData(pieChartData);
  }, [revenue, filters]);

  return (
    <div className="revenue-charts">
      <div className="charts-revenue-data-filter">
        <div className="filter">
          <label htmlFor="date-filter">Year:</label>
          <select
            id="date-filter"
            value={filters.year}
            onChange={handleYearChange}
          >
            <option value="">All</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option className="completed" value="Completed">
              Completed
            </option>
            <option className="cancelled" value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {filteredRevenue.length > 0 && paymentMethodData.length > 0 ? (
        <div className="revenue-charts-container">
          <div className="area-chart-container">
            <ReactECharts
              option={{
                title: {
                  text: "Monthly Revenue Trends",
                  textStyle: {
                    fontSize: 14,
                  },
                },
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "category",
                  data: filteredRevenue.map((data) => data.month),
                },
                yAxis: {
                  type: "value",
                },
                series: [
                  {
                    data: filteredRevenue.map((data) => data.revenue),
                    type: "line",
                    smooth: true,
                    areaStyle: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          { offset: 0, color: COLORS[0] },
                          { offset: 1, color: COLORS[1] },
                        ],
                        global: false,
                      },
                    },
                  },
                ],
              }}
              style={{ height: 300 }}
            />
          </div>

          <div className="doughnut-chart-container">
            <ReactECharts
              option={{
                title: {
                  text: "Revenue by Payment Method",
                  left: "center",
                  textStyle: {
                    fontSize: 14,
                  },
                },
                tooltip: {
                  trigger: "item",
                },
                legend: {
                  bottom: "0%",
                },
                series: [
                  {
                    name: "Revenue",
                    type: "pie",
                    radius: "50%",
                    data: paymentMethodData,
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                      },
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                ],
              }}
              style={{ height: 300 }}
            />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default RevenueCharts;
