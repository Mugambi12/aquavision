import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CompanySettings from "../components/Settings/Settings";
import settingsData from "../db/settingsData";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <CompanySettings
          settingsData={settingsData}
          control={control}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};

export default Settings;
