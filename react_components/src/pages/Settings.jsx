// In Settings.js
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import settingsData from "../db/settingsData";

const Settings = () => {
  const callApiAndLogFormData = async (formData) => {
    try {
      // Make API call here using formData
      console.log("API call successful");
      console.log("Form Data: ", formData);
      // Return response if needed
    } catch (error) {
      console.error("Error calling API:", error);
      // Handle error appropriately
    }
  };
  return (
    <>
      <Navbar />
      <div className="main-container">
        <CompanySettings
          settingsData={settingsData}
          handleSaveSettings={callApiAndLogFormData}
        />
      </div>
    </>
  );
};

export default Settings;
