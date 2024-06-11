import React, { useState } from "react";
import "./Settings.css";

const GeneralSettings = ({ settings, handleChange, handleFileChange }) => {
  return (
    <div className="settings-section-container">
      <h2 className="settings-section-title">General Settings</h2>
      <div className="company-logo-image">
        {settings.company_logo && (
          <img
            src={settings.company_logo}
            alt="Company Logo"
            className="company-logo-preview"
          />
        )}
      </div>
      <div className="settings-section">
        <div className="form-group">
          <label htmlFor="companyLogo">Company Logo:</label>
          <input type="file" id="companyLogo" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={settings.company_name}
            onChange={(e) => handleChange(e, "general", "company_name")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyAddress">Company Address:</label>
          <input
            type="text"
            id="companyAddress"
            value={settings.company_address}
            onChange={(e) => handleChange(e, "general", "company_address")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyEmail">Company Email:</label>
          <input
            type="email"
            id="companyEmail"
            value={settings.mailConfig.company_email}
            onChange={(e) => handleChange(e, "mailConfig", "company_email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={settings.contact_number}
            onChange={(e) => handleChange(e, "general", "contact_number")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyWebsite">Company Website URL:</label>
          <input
            type="url"
            id="companyWebsite"
            value={settings.company_website_url}
            onChange={(e) => handleChange(e, "general", "company_website_url")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyDescription">Company Description:</label>
          <textarea
            id="companyDescription"
            value={settings.company_description}
            onChange={(e) => handleChange(e, "general", "company_description")}
          />
        </div>
      </div>
    </div>
  );
};

const ServicesSettings = ({
  settings,
  handleChange,
  selectedSection,
  setSelectedSection,
}) => {
  return (
    <div className="settings-section container">
      <h2 className="settings-section-title">Services</h2>
      <div className="settings-section">
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price:</label>
          <input
            type="number"
            id="unitPrice"
            value={settings.services.unit_price}
            onChange={(e) => handleChange(e, "services", "unit_price")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceFee">Service Fee:</label>
          <input
            type="number"
            id="serviceFee"
            value={settings.services.service_fee}
            onChange={(e) => handleChange(e, "services", "service_fee")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseSections">House Sections:</label>
          <select
            id="houseSections"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="" disabled>
              Select a section
            </option>
            {settings.services.house_sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section._id} - {section.section}
              </option>
            ))}
          </select>
        </div>
        {/*<div className="action-buttons">
          <button onClick={handleUpdateSection}>Update</button>
          <button onClick={handleDeleteSection}>Delete</button>
          <button onClick={handleAddSection}>Add New Section</button>
        </div>*/}
      </div>
    </div>
  );
};

const PaymentsSettings = ({ settings, handleChange }) => {
  return (
    <div className="settings-section-container">
      <h2 className="settings-section-title">Payments</h2>
      <div className="settings-section">
        {settings.payments.map((payment) => (
          <div key={payment._id} className="form-group">
            <label htmlFor={`bankName_${payment._id}`}>Bank Name:</label>
            <input
              type="text"
              id={`bankName_${payment._id}`}
              value={payment.bank_name}
              onChange={(e) =>
                handleChange(e, "payments", "bank_name", payment._id)
              }
            />
            <label htmlFor={`paybill_${payment._id}`}>Paybill:</label>
            <input
              type="number"
              id={`paybill_${payment._id}`}
              value={payment.paybill}
              onChange={(e) =>
                handleChange(e, "payments", "paybill", payment._id)
              }
            />
            <label htmlFor={`accountNumber_${payment._id}`}>
              Account Number:
            </label>
            <input
              type="number"
              id={`accountNumber_${payment._id}`}
              value={payment.account_number}
              onChange={(e) =>
                handleChange(e, "payments", "account_number", payment._id)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const MailConfigSettings = ({ settings, handleChange }) => {
  return (
    <div className="settings-section-container">
      <h2 className="settings-section-title">Mail Configuration</h2>
      <div className="settings-section">
        <div className="form-group">
          <label htmlFor="mailServer">Mail Server:</label>
          <input
            type="text"
            id="mailServer"
            value={settings.mailConfig.mail_server}
            onChange={(e) => handleChange(e, "mailConfig", "mail_server")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailAddress">Main Address:</label>
          <input
            type="email"
            id="mailAddress"
            value={settings.mailConfig.company_email}
            onChange={(e) => handleChange(e, "mailConfig", "company_email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mailPassword">Mail Password:</label>
          <input
            type="password"
            id="mailPassword"
            value={settings.mailConfig.password}
            onChange={(e) => handleChange(e, "mailConfig", "password")}
          />
        </div>
      </div>
    </div>
  );
};

const SocialAccountsSettings = ({ settings, handleChange }) => {
  return (
    <div className="settings-section-container">
      <h2 className="settings-section-title">Social Accounts</h2>
      <div className="settings-section">
        <div className="form-group">
          <label htmlFor="whatsapp">WhatsApp:</label>
          <input
            type="text"
            id="whatsapp"
            value={settings.socialAccounts.whatsapp}
            onChange={(e) => handleChange(e, "socialAccounts", "whatsapp")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="text"
            id="twitter"
            value={settings.socialAccounts.twitter}
            onChange={(e) => handleChange(e, "socialAccounts", "twitter")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="facebook">Facebook:</label>
          <input
            type="text"
            id="facebook"
            value={settings.socialAccounts.facebook}
            onChange={(e) => handleChange(e, "socialAccounts", "facebook")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tiktok">TikTok:</label>
          <input
            type="text"
            id="tiktok"
            value={settings.socialAccounts.tiktok}
            onChange={(e) => handleChange(e, "socialAccounts", "tiktok")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instagram">Instagram:</label>
          <input
            type="text"
            id="instagram"
            value={settings.socialAccounts.instagram}
            onChange={(e) => handleChange(e, "socialAccounts", "instagram")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn:</label>
          <input
            type="text"
            id="linkedin"
            value={settings.socialAccounts.linkedin}
            onChange={(e) => handleChange(e, "socialAccounts", "linkedin")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="youtube">YouTube:</label>
          <input
            type="text"
            id="youtube"
            value={settings.socialAccounts.youtube}
            onChange={(e) => handleChange(e, "socialAccounts", "youtube")}
          />
        </div>
      </div>
    </div>
  );
};

const CompanySettings = ({ settings, handleChange, handleFileChange }) => {
  const [selectedSection, setSelectedSection] = useState("general");

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return (
          <GeneralSettings
            settings={settings}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      case "services":
        return (
          <ServicesSettings
            settings={settings}
            handleChange={handleChange}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        );
      case "payments":
        return (
          <PaymentsSettings settings={settings} handleChange={handleChange} />
        );
      case "mailConfig":
        return (
          <MailConfigSettings settings={settings} handleChange={handleChange} />
        );
      case "socialAccounts":
        return (
          <SocialAccountsSettings
            settings={settings}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="company-settings-wrapper">
      {/* Sidebar content here */}
      <div className="sidebar">
        <a
          href="#"
          className={selectedSection === "general" ? "active" : ""}
          onClick={() => setSelectedSection("general")}
        >
          General
        </a>
        <a
          href="#"
          className={selectedSection === "services" ? "active" : ""}
          onClick={() => setSelectedSection("services")}
        >
          Services
        </a>
        <a
          href="#"
          className={selectedSection === "payments" ? "active" : ""}
          onClick={() => setSelectedSection("payments")}
        >
          Payments
        </a>
        <a
          href="#"
          className={selectedSection === "mailConfig" ? "active" : ""}
          onClick={() => setSelectedSection("mailConfig")}
        >
          Mail Configuration
        </a>
        <a
          href="#"
          className={selectedSection === "socialAccounts" ? "active" : ""}
          onClick={() => setSelectedSection("socialAccounts")}
        >
          Social Accounts
        </a>
      </div>

      {/* Render content based on selected section */}
      <div className="company-settings-container">{renderContent()}</div>
    </div>
  );
};

export default CompanySettings;
