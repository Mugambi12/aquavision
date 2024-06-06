import React from "react";
import "./Settings.css";

const HouseSection = ({ section, onDelete, onUpdate }) => {
  const handleUpdate = () => {
    const updatedSectionName = prompt("Enter the updated section name:");
    if (updatedSectionName !== null) {
      onUpdate(updatedSectionName);
    }
  };

  return (
    <div className="house-section">
      <input type="text" value={section} readOnly />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

const CompanySettings = ({ settings, handleChange }) => {
  const handleDeleteSection = (index) => {
    const updatedSections = [...settings.services.house_sections];
    updatedSections.splice(index, 1);
    handleChange(updatedSections, "services", "house_sections");
  };

  const handleUpdateSection = (index, updatedSectionName) => {
    const updatedSections = [...settings.services.house_sections];
    updatedSections[index].section = updatedSectionName;
    handleChange(updatedSections, "services", "house_sections");
  };

  const handleAddSection = () => {
    const newSectionName = prompt("Enter the name for the new section:");
    if (newSectionName !== null) {
      const newSection = { _id: Date.now(), section: newSectionName };
      const updatedSections = [...settings.services.house_sections, newSection];
      handleChange(updatedSections, "services", "house_sections");
    }
  };

  return (
    <div className="company-settings">
      <h2 className="settings-section-title">General Settings</h2>
      <div className="settings-section">
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
          <label htmlFor="companyLogo">Company Logo:</label>
          <input
            type="text"
            id="companyLogo"
            value={settings.company_logo}
            onChange={(e) => handleChange(e, "general", "company_logo")}
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

      {/* Services */}
      <h2 className="settings-section-title">Services</h2>
      <div className="settings-section">
        {/* Unit Price, Service Fee */}
        <div className="form-group">
          <label>House Sections:</label>
          {settings.services.house_sections.map((section, index) => (
            <HouseSection
              key={section._id}
              section={section.section}
              onDelete={() => handleDeleteSection(index)}
              onUpdate={(updatedSectionName) =>
                handleUpdateSection(index, updatedSectionName)
              }
            />
          ))}
          <button onClick={handleAddSection}>Add New Section</button>
        </div>
      </div>

      <h2 className="settings-section-title">Payments</h2>
      <div className="settings-section">
        {settings.payments.map((payment) => (
          <div key={payment._id} className="form-group">
            <label htmlFor={`bankName_${payment._id}`}>Bank Name:</label>
            <input
              type="text"
              id={`bankName_${payment._id}`}
              value={payment.bank_name}
              onChange={(e) => handleChange(e, "payments", "bank_name")}
            />
            <label htmlFor={`paybill_${payment._id}`}>Paybill:</label>
            <input
              type="number"
              id={`paybill_${payment._id}`}
              value={payment.paybill}
              onChange={(e) => handleChange(e, "payments", "paybill")}
            />
            <label htmlFor={`accountNumber_${payment._id}`}>
              Account Number:
            </label>
            <input
              type="number"
              id={`accountNumber_${payment._id}`}
              value={payment.account_number}
              onChange={(e) => handleChange(e, "payments", "account_number")}
            />
          </div>
        ))}
      </div>

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
          <label htmlFor="mailPassword">Mail Password:</label>
          <input
            type="password"
            id="mailPassword"
            value={settings.mailConfig.password}
            onChange={(e) => handleChange(e, "mailConfig", "password")}
          />
        </div>
      </div>

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

export default CompanySettings;
