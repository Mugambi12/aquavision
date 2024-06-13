// In Settings.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import Spinner from "../components/Spinner/Spinner";

const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettingsData = async () => {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      const data = await response.json();
      setSettingsData(data);
      setLoading(false);
      console.log("Settings data fetched successfully:", data);
      // log type of data to console
      console.log("Type of data: ", typeof data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      // Handle error appropriately, e.g., show an error message to the user
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

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
        <title>Settings - {settingsData?.company_name || "Loading..."}</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        {loading ? (
          <Spinner /> 
        ) : (
          <CompanySettings
            settingsData={settingsData}
            handleSaveSettings={callApiAndLogFormData}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
