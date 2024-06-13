import React, { useState, useMemo } from "react";
import "./AddInvoiceForm.css";

const AddInvoiceForm = ({ onSubmit, registeredActiveHouses }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedHouseNumber, setSelectedHouseNumber] = useState("");
  const [meterReading, setMeterReading] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: userTimezone,
    });

    const newInvoice = {
      id: Date.now().toString(),
      timestamp,
      house_section: selectedSection,
      house_number: selectedHouseNumber,
      meter_reading: meterReading,
    };
    onSubmit(newInvoice);
  };

  const houseSections = useMemo(
    () => registeredActiveHouses.map((house) => house.house_section),
    []
  );

  const houseNumbers = useMemo(() => {
    const section = registeredActiveHouses.find(
      (house) => house.house_section === selectedSection
    );
    return section ? section.house_number : [];
  }, [selectedSection]);

  return (
    <div className="add-invoice-container">
      <h2 className="modal-title">Add New Invoice</h2>
      <form onSubmit={handleSubmit} className="add-invoice-form">
        <label>House Section:</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          required
        >
          <option value="" disabled>
            Select section
          </option>
          {houseSections.map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>

        <label>House Number:</label>
        <select
          value={selectedHouseNumber}
          onChange={(e) => setSelectedHouseNumber(e.target.value)}
          required
          disabled={!selectedSection}
        >
          <option value="" disabled>
            Select number
          </option>
          {houseNumbers.map((number, index) => (
            <option key={index} value={number}>
              {number}
            </option>
          ))}
        </select>

        <label>Meter Reading:</label>
        <input
          type="number"
          value={meterReading}
          onChange={(e) => setMeterReading(e.target.value)}
          required
        />

        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
};

export default AddInvoiceForm;
