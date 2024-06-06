import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import settingsData from "../db/settingsData";

const Settings = () => {
  const [settings, setSettings] = useState(settingsData);

  // Define a variable to store the timeout ID
  let timeoutId;

  const handleChange = (e, section, field) => {
    if (!e || !e.target) {
      console.error("Event or event target is undefined");
      return;
    }

    const { value } = e.target;

    // Clear any existing timeout
    clearTimeout(timeoutId);

    // Set a new timeout to call handleChange after 5 seconds
    timeoutId = setTimeout(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [section]: {
          ...prevSettings[section],
          [field]: value,
        },
      }));
      console.log("Updated Settings:", settings);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <CompanySettings settings={settings} handleChange={handleChange} />
      </div>
    </>
  );
};

export default Settings;
