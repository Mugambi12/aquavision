import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import "./PeopleManagement.css";

// PersonalContentCard component to display various user data
const PersonalContentCard = ({ label, value }) => {
  return (
    <div
      className={`personal-content-card personal-content-card-${label
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <div className="personal-content-card-label">{label}</div>
      <div className="personal-content-card-value">{value}</div>
    </div>
  );
};

// Helper function to format currency
const formatCurrency = (amount) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "KES",
  });

// Helper function to format water usage to 2 decimal places
const formatWaterUsage = (usage) => usage.toFixed(2) + " Units";

// Card components for specific data
const WaterUsageCard = ({ person }) => (
  <PersonalContentCard
    label="Water Usage"
    value={formatWaterUsage(person.totalWaterConsumption)}
  />
);

const TotalBillAmountCard = ({ person }) => (
  <PersonalContentCard
    label="Total Bill"
    value={formatCurrency(person.totalInvoiceAmount)}
  />
);

const UsageTrendsCard = ({ person }) => (
  <PersonalContentCard
    label="Repair Costs"
    value={formatCurrency(person.totalExpenseAmount)}
  />
);

const TotalPaymentAmountCard = ({ person }) => (
  <PersonalContentCard
    label="Total Payment"
    value={formatCurrency(person.totalRevenueAmount)}
  />
);

// Component to display water consumption history
const WaterConsumptionHistory = ({ person }) => {
  const { invoices } = person;
  const [filter, setFilter] = useState("all");

  if (!invoices || invoices.length === 0) {
    return (
      <div className="not-available">
        No water consumption history available
      </div>
    );
  }

  // Map for short month names
  const monthMap = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  // Array of all short month names
  const months = Object.values(monthMap);

  // Current date
  const now = new Date();

  // Filter options based on invoice years
  const filterOptions = (() => {
    const options = ["all"];
    const historyYears = new Set(
      invoices.map((entry) => new Date(entry.created_at).getFullYear())
    );
    for (let year of historyYears) {
      options.push(`${year}`);
    }
    return options;
  })();

  // Function to filter history data based on selected filter
  const filterData = (history, filter) => {
    return history.filter((entry) => {
      const entryDate = new Date(entry.created_at);
      if (filter === "all") {
        return true;
      } else {
        const filterYear = parseInt(filter);
        return entryDate.getFullYear() === filterYear;
      }
    });
  };

  // Filtered invoices based on selected filter
  const filteredInvoices = filterData(invoices, filter);

  // Initialize data object for all months with zero values
  const monthlyData = months.reduce((acc, month) => {
    acc[month] = {
      previousReading: 0,
      currentReading: 0,
      consumption: 0,
      unitPrice: 0,
      totalAmount: 0,
    };
    return acc;
  }, {});

  // Populate data from filtered invoices
  filteredInvoices.forEach((entry) => {
    const date = new Date(entry.created_at);
    const month = months[date.getMonth()];
    monthlyData[month].previousReading += entry.previous_reading;
    monthlyData[month].currentReading += entry.current_reading;
    monthlyData[month].consumption += entry.consumption;
    monthlyData[month].unitPrice += entry.unit_price;
    monthlyData[month].totalAmount += entry.total_amount;
  });

  // Convert monthlyData to chart-friendly format
  const chartData = months.map((month) => ({
    month,
    previousReading: monthlyData[month].previousReading,
    currentReading: monthlyData[month].currentReading,
    consumption: monthlyData[month].consumption,
    unitPrice: monthlyData[month].unitPrice,
    totalAmount: monthlyData[month].totalAmount,
  }));

  // Handler for filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="water-row">
      <div className="chart-container">
        <div className="filter-container">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All" : option}
              </option>
            ))}
          </select>
        </div>
        <ReactECharts
          option={{
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category",
              data: months,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "Previous:",
                data: chartData.map((data) => data.previousReading),
                type: "bar",
                smooth: true,
                lineStyle: {
                  color: "#FF0000",
                },
              },
              {
                name: "Current:",
                data: chartData.map((data) => data.currentReading),
                type: "bar",
                smooth: true,
                lineStyle: {
                  color: "#00FF00",
                },
              },
              {
                name: "Usage:",
                data: chartData.map((data) => data.consumption),
                type: "bar",
                smooth: true,
                lineStyle: {
                  color: "#3398DB",
                },
              },
              {
                name: "Price:",
                data: chartData.map((data) => data.unitPrice),
                type: "bar",
                smooth: true,
                lineStyle: {
                  color: "#FFA500",
                },
              },
              {
                name: "Total:",
                data: chartData.map((data) => data.totalAmount),
                type: "bar",
                smooth: true,
                lineStyle: {
                  color: "#FFA500",
                },
              },
            ],
          }}
          style={{ height: 300 }}
        />
      </div>
    </div>
  );
};

// Component to display payment history
const PaymentHistory = ({ person }) => (
  <div className="payment-history-content">
    <h2 className="table-title">Payment History</h2>
    <table className="payment-history-table">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {person.revenues.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.transaction_id}</td>
            <td>
              {new Date(item.payment_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </td>
            <td>
              {item.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "KES",
              })}
            </td>
            <td>{item.payment_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component to display invoices download links
const InvoicesDownload = ({ person }) => (
  <div className="content-card personal-content-invoice-download">
    <div className="title">Invoice Download</div>
    <ul className="personal-content-invoice-download-list">
      {person.invoices.map((invoice, index) => (
        <li key={index} className="personal-content-invoice-download-item">
          Invoice {invoice._id}{" "}
          <span className="material-symbols-rounded icon">download</span>
        </li>
      ))}
    </ul>
  </div>
);

// Component to display user profile card
const ProfileCard = ({ person, onEditProfileClick }) => {
  const handleEditClick = () => {
    onEditProfileClick(person);
  };

  return (
    <div className="personal-profile-card">
      <div className="personal-profile-info">
        <div className="personal-profile-image">
          <img src={person.profileImage} alt="Profile" />
        </div>

        <div className="personal-full-name">{person.fullName}</div>

        <div className="personal-user-content-details">
          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              calendar_month
            </span>
            <div className="column">
              <span className="label">House Section:</span>
              <span className="value">{person.houseSection}</span>
            </div>
          </div>
          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">home</span>
            <div className="column">
              <span className="label">House Number:</span>
              <span className="value">{person.houseNumber}</span>
            </div>
          </div>
          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">phone</span>
            <div className="column">
              <span className="label">Phone Number:</span>
              <span className="value">{person.phoneNumber}</span>
            </div>
          </div>
          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">email</span>
            <div className="column">
              <span className="label">Email Address:</span>
              <span className="value">{person.email}</span>
            </div>
          </div>

          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              {person.isAdmin ? "admin_panel_settings" : "person"}
            </span>
            <div className="column">
              <span className="label">Account Type:</span>
              <span className="value">{person.isAdmin ? "Admin" : "User"}</span>
            </div>
          </div>

          <div className="personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              {person.isActive ? "check_circle" : "cancel"}
            </span>
            <div className="column">
              <span className="label">Active Status:</span>
              <span className="value">
                {person.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <button className="personal-profile-button" onClick={handleEditClick}>
          Edit Profile Information
        </button>
      </div>
    </div>
  );
};

// Main component to manage people data and display the relevant information
const PeopleManagement = ({ selectedPerson, onEditProfileClick }) => {
  return (
    <div className="row person-content">
      <div className="column person-content-left">
        {selectedPerson && (
          <>
            <div className="content-card content-diagnosis-history">
              <div className="selected-person-name">
                {selectedPerson.fullName}
              </div>
              <div className="row personal-content-cards">
                <WaterUsageCard person={selectedPerson} />
                <TotalBillAmountCard person={selectedPerson} />
                <UsageTrendsCard person={selectedPerson} />
                <TotalPaymentAmountCard person={selectedPerson} />
              </div>
              <div className="chart-title">Water Consumption Chart History</div>
              <WaterConsumptionHistory person={selectedPerson} />
            </div>
            <PaymentHistory person={selectedPerson} />
          </>
        )}
      </div>

      <div className="column person-content-right">
        {selectedPerson && (
          <>
            <ProfileCard
              person={selectedPerson}
              onEditProfileClick={onEditProfileClick}
            />
            <InvoicesDownload person={selectedPerson} />
          </>
        )}
      </div>
    </div>
  );
};

export default PeopleManagement;
