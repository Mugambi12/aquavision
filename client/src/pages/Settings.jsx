import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import Spinner from "../components/Spinner/Spinner";

const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      const data = await response.json();
      setSettingsData(data);
      setLoading(false);
      console.log("Settings data fetched successfully:");
    } catch (error) {
      console.error("Error fetching settings:", error);
      setLoading(false);
    }
  };

  const callApiAndLogFormData = async (formData) => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }
      console.log("Settings saved successfully");
      window.location.reload();      
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
