// In Settings.js
import React from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Settings - Dakoke Springs</title>
      </Helmet>
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
