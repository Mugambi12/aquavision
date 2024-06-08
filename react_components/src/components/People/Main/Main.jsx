import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Main.css";

const getLatestEntry = (entries) => {
  if (!entries || entries.length === 0) return null;

  return entries.reduce((latest, entry) => {
    const entryDate = new Date(entry.year, entry.month);
    const latestDate = new Date(latest.year, latest.month);

    if (entryDate > latestDate) return entry;
    return latest;
  }, entries[0]);
};

const PersonalContentCard = ({ person, label, valueKey }) => {
  const latestEntry = getLatestEntry(person.diagnosisHistory);

  return (
    <>
      {latestEntry && (
        <div
          className={`personal-content-card personal-content-card-${label
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <div className="personal-content-card-label">{label}</div>
          <div className="personal-content-card-value">
            {latestEntry[valueKey].value}{" "}
            {valueKey === "respiratory_rate" ? "Units" : "Ksh"}
          </div>
          {/*
          <div className="personal-content-card-value-status">
            {latestEntry[valueKey].levels}
                  </div>
                  */}
        </div>
      )}
    </>
  );
};

const WaterUsageCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Water Usage"
    valueKey="respiratory_rate"
  />
);

const BillingInformationCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Billing Information"
    valueKey="temperature"
  />
);

const UsageTrendsCard = ({ person }) => (
  <PersonalContentCard
    person={person}
    label="Repair Costs"
    valueKey="heart_rate"
  />
);

const WaterConsumptionHistory = ({ person }) => {
  const { diagnosisHistory } = person;
  const [filter, setFilter] = useState("all");

  if (!diagnosisHistory || diagnosisHistory.length === 0) {
    return <div>No diagnosis history available</div>;
  }

  const monthMap = useMemo(
    () => ({
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
    }),
    []
  );

  const now = useMemo(() => new Date(), []);

  const filterData = (history, filter) => {
    return history.filter((entry) => {
      const entryDate = new Date(entry.year, monthMap[entry.month]);
      if (filter === "3months") {
        return now - entryDate <= 3 * 30 * 24 * 60 * 60 * 1000;
      } else if (filter === "6months") {
        return now - entryDate <= 6 * 30 * 24 * 60 * 60 * 1000;
      } else {
        return true;
      }
    });
  };

  const filteredDiagnosisHistory = useMemo(
    () => filterData(diagnosisHistory, filter),
    [diagnosisHistory, filter]
  );

  const latestEntry = useMemo(() => {
    if (filteredDiagnosisHistory.length === 0) return null;
    return filteredDiagnosisHistory.reduce((latest, entry) => {
      const entryYear = parseInt(entry.year);
      const entryMonth = monthMap[entry.month];
      const latestYear = parseInt(latest.year);
      const latestMonth = monthMap[latest.month];

      if (
        entryYear > latestYear ||
        (entryYear === latestYear && entryMonth > latestMonth)
      ) {
        return entry;
      } else {
        return latest;
      }
    });
  }, [filteredDiagnosisHistory, monthMap]);

  const chartData = useMemo(() => {
    return filteredDiagnosisHistory.map((entry) => ({
      time: `${entry.month} ${entry.year}`,
      systolic: entry.blood_pressure.systolic.value,
      diastolic: entry.blood_pressure.diastolic.value,
    }));
  }, [filteredDiagnosisHistory]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="water-row">
        <div className="chart-container">
          <div className="filter-container">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
              <option value="all">All</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" fontSize={13} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="systolic" stroke="#e66fd2" />
              <Line type="monotone" dataKey="diastolic" stroke="#8c6fe6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="summary-container">
          {latestEntry && (
            <div className="column summary-entry">
              <div className="column data-item">
                <div className="row data-item-label">
                  <span className="data-item-bulletin highest"></span>
                  <p>Consumption</p>
                </div>
                <div className="data-value">
                  {latestEntry.blood_pressure.systolic.value} Units
                </div>
                <div className="row data-footer">
                  <span className="material-symbols-rounded icon">
                    arrow_drop_up
                  </span>
                  <span className="data-footer-label">
                    {latestEntry.blood_pressure.systolic.levels}
                  </span>
                </div>
              </div>

              <hr />

              <div className="column data-item">
                <div className="row data-item-label">
                  <span className="data-item-bulletin lowest"></span>
                  <p>Usage Trends</p>
                </div>
                <div className="data-value">
                  {latestEntry.blood_pressure.diastolic.value} %
                </div>
                <div className="row data-footer">
                  <span className="material-symbols-rounded icon">
                    arrow_drop_down
                  </span>
                  <span className="data-footer-label">
                    {latestEntry.blood_pressure.diastolic.levels}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PaymentHistory = ({ person }) => (
  <div className="content-card">
    <div className="payment-history-content-table">
      <div className="table-title">Payment History</div>
      <div className="d-flex payment-history-content-header">
        <div className="table_header">TransantionID</div>
        <div className="table_header">Date</div>
        <div className="table_header">Amount</div>
        <div className="table_header">Status</div>
      </div>

      <div className="payment-history-content-body">
        {person.diagnosticList.map((item, index) => (
          <div key={index} className="d-flex">
            <div className="table_content">{item.name}</div>
            <div className="table_content">{item.status}</div>
            <div className="table_content">{item.status}</div>
            <div className="table_content">{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InvoicesDownload = ({ person }) => (
  <div className="content-card personal-content-invoice-download">
    <div className="title">Invoice Download</div>
    <ul className="personal-content-invoice-download-list">
      {person.labResults.map((result, index) => (
        <li key={index} className="personal-content-invoice-download-item">
          {result}{" "}
          <span className="material-symbols-rounded icon">download</span>
        </li>
      ))}
    </ul>
  </div>
);

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
              <span className="label">Date of Birth:</span>
              <span className="value">{person.dateOfBirth}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">{`${
              person.gender === "Female" ? "female" : "male"
            }`}</span>
            <div className="column">
              <span className="label">Gender:</span>
              <span className="value">{person.gender}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">phone</span>
            <div className="column">
              <span className="label">Contact Info:</span>
              <span className="value">{person.phoneNumber}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              contact_emergency
            </span>
            <div className="column">
              <span className="label">Emergency Contact:</span>
              <span className="value">{person.emergencyContact}</span>
            </div>
          </div>
          <div className="d-flex personal-user-content-detail">
            <span className="material-symbols-rounded icon">
              health_and_safety
            </span>
            <div className="column">
              <span className="label">Insurance Provider:</span>
              <span className="value">{person.insuranceType}</span>
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

const Main = ({ selectedPerson, onEditProfileClick }) => {
  return (
    <div className="row person-content">
      <div className="column person-content-left">
        {selectedPerson && (
          <>
            <div className="content-card content-diagnosis-history">
              <div className="row personal-content-cards">
                <WaterUsageCard person={selectedPerson} />
                <BillingInformationCard person={selectedPerson} />
                <UsageTrendsCard person={selectedPerson} />
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

export default Main;
