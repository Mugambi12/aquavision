import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import Spinner from "../components/Spinner/Spinner";
import { fetchSettings, postSettings } from "../resources/apiSettings";

const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    callApiAndFetchSettingsData();
  }, []);

  const callApiAndFetchSettingsData = async () => {
    try {
      setLoading(true);
      const data = await fetchSettings();
      setSettingsData(data);
    } catch (error) {
      console.error("Error calling API:", error);
      setError("Failed to load settings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const callApiAndSaveSettings = async (formData) => {
    try {
      setLoading(true);
      await postSettings(formData);
      setSettingsData(formData);
    } catch (error) {
      console.error("Error calling API:", error);
      setError("Failed to save settings. Please try again later.");
    } finally {
      setLoading(false);
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
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          settingsData && (
            <CompanySettings
              settings={settingsData}
              handleSaveSettings={callApiAndSaveSettings}
            />
          )
        )}
      </div>
    </>
  );
};

export default Settings;
