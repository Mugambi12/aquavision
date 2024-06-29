import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import "./PeopleManagement.css";

// Function to get the latest entry from a list of entries
const getLatestEntry = (entries) => {
  if (!entries || entries.length === 0) return null;

  return entries.reduce((latest, entry) => {
    const entryDate = new Date(entry.created_at);
    const latestDate = new Date(latest.created_at);

    return entryDate > latestDate ? entry : latest;
  }, entries[0]);
};

// PersonalContentCard component to display various user data
const PersonalContentCard = ({ person, label, valueKey, unit }) => {
  const latestEntry = getLatestEntry(person.invoices);

  return (
    <>
      {latestEntry && (
        <div
          className={`personal-content-card personal-content-card-${label
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <div className="personal-content-card-label">{label}</div>
          <div className="personal-content-card-value">
            {person[valueKey]} {unit}
          </div>
        </div>
      )}
    </>
  );
};

// Card components for specific data
const WaterUsageCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Water Usage"
    valueKey="totalWaterConsumption"
    unit="Units"
  />
);

const TotalBillAmountCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Total Bill"
    valueKey="totalInvoiceAmount"
    unit="Ksh"
  />
);

const UsageTrendsCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Repair Costs"
    valueKey="totalExpenseAmount"
    unit="Ksh"
  />
);
const TotalPaymentAmountCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Total Payment"
    valueKey="totalRevenueAmount"
    unit="Ksh"
  />
);

// Component to display water consumption history
const WaterConsumptionHistory = ({ person }) => {
  const { invoices } = person;
  const [filter, setFilter] = useState("all");

  if (!invoices || invoices.length === 0) {
    return <div>No water consumption history available</div>;
  }

  // Map for months
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

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

  // Chart data for consumption history
  const chartData = filteredInvoices.map((entry) => ({
    time: `${entry.created_at}`,
    consumption: entry.consumption,
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
              data: chartData.map((data) => data.time),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "Consumption",
                data: chartData.map((data) => data.consumption),
                type: "line",
                smooth: true,
                lineStyle: {
                  color: "#3398DB",
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
  <div className="content-card">
    <div className="payment-history-content-table">
      <div className="table-title">Payment History</div>
      <div className="d-flex payment-history-content-header">
        <div className="table_header">Transaction ID</div>
        <div className="table_header">Date</div>
        <div className="table_header">Amount</div>
        <div className="table_header">Status</div>
      </div>

      <div className="payment-history-content-body">
        {person.revenues.map((item, index) => (
          <div key={index} className="d-flex">
            <div className="table_content">{item.transaction_id}</div>
            <div className="table_content">
              {new Date(item.payment_date).toLocaleDateString()}
            </div>
            <div className="table_content">{item.amount}</div>
            <div className="table_content">{item.payment_status}</div>
          </div>
        ))}
      </div>
    </div>
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
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              calendar_month
            </span>
            <div className="column">
              <span className="label">House Section:</span>
              <span className="value">{person.houseSection}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">home</span>
            <div className="column">
              <span className="label">House Number:</span>
              <span className="value">{person.houseNumber}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">phone</span>
            <div className="column">
              <span className="label">Phone Number:</span>
              <span className="value">{person.phoneNumber}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">email</span>
            <div className="column">
              <span className="label">Email Address:</span>
              <span className="value">{person.email}</span>
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
