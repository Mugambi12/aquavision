import React, { useState, useMemo } from "react";
import "./AddInvoice.css";

const AddInvoiceForm = ({ onSubmit, activeHousesData }) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedHouseNumber, setSelectedHouseNumber] = useState("");
  const [meterReading, setMeterReading] = useState("");

  console.log("This is the active houses data:", activeHousesData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      house_section: selectedSection,
      house_number: selectedHouseNumber,
      current_reading: meterReading,
    };
    onSubmit(newInvoice);
  };

  const houseSections = useMemo(
    () => activeHousesData.map((house) => house.house_section),
    [activeHousesData]
  );

  const houseNumbers = useMemo(() => {
    const section = activeHousesData.find(
      (house) => house.house_section === selectedSection
    );
    return section ? JSON.parse(section.house_number) : [];
  }, [selectedSection, activeHousesData]);

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
