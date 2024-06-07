import React, { useState } from "react";
import "./Settings.css";
import { Controller } from "react-hook-form";

const CompanySettings = ({ settingsData, control, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("company-profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="settings-container">
      <h4 className="settings-title">{settingsData.company_name} Settings</h4>
      <div className="settings-card">
        <div className="settings-row">
          {/* Sidebar Column */}
          <div className="settings-col-md-4">
            <div className="settings-nav">
              {/* Sidebar Navigation links */}
              <a
                className={`settings-nav-item ${
                  activeTab === "company-profile" ? "active" : ""
                }`}
                href="#company-profile"
                onClick={() => handleTabClick("company-profile")}
              >
                Company Profile
              </a>
              <a
                className={`settings-nav-item ${
                  activeTab === "services" ? "active" : ""
                }`}
                href="#services"
                onClick={() => handleTabClick("services")}
              >
                Services
              </a>
              <a
                className={`settings-nav-item ${
                  activeTab === "payment-methods" ? "active" : ""
                }`}
                href="#payment-methods"
                onClick={() => handleTabClick("payment-methods")}
              >
                Payment Methods
              </a>
              <a
                className={`settings-nav-item ${
                  activeTab === "email-settings" ? "active" : ""
                }`}
                href="#email-settings"
                onClick={() => handleTabClick("email-settings")}
              >
                Email Settings
              </a>
              <a
                className={`settings-nav-item ${
                  activeTab === "social-media" ? "active" : ""
                }`}
                href="#social-media"
                onClick={() => handleTabClick("social-media")}
              >
                Social Media
              </a>
            </div>
          </div>

          {/* Content Column */}
          <div className="settings-col-md-8">
            <div className="settings-content">
              {/* Form content */}
              <form onSubmit={onSubmit}>
                {/* Company Profile Tab */}
                <div
                  className={`settings-pane ${
                    activeTab === "company-profile" ? "active" : ""
                  }`}
                  id="company-profile"
                >
                  <h5>Company Profile</h5>
                  <div className="settings-form">
                    <Controller
                      name="company_name"
                      control={control}
                      defaultValue={settingsData.company_name}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Company Name"
                        />
                      )}
                    />
                    <Controller
                      name="industry"
                      control={control}
                      defaultValue={settingsData.industry}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Industry"
                        />
                      )}
                    />
                    <Controller
                      name="company_website_url"
                      control={control}
                      defaultValue={settingsData.company_website_url}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Website"
                        />
                      )}
                    />
                    <Controller
                      name="contact_email"
                      control={control}
                      defaultValue={settingsData.contact_email}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          className="settings-form-control"
                          placeholder="Contact Email"
                        />
                      )}
                    />
                    <Controller
                      name="company_description"
                      control={control}
                      defaultValue={settingsData.company_description}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="settings-form-control"
                          rows="5"
                          placeholder="Description"
                        />
                      )}
                    />
                  </div>
                  {/* Additional form content */}
                </div>

                {/* Services Tab */}
                <div
                  className={`settings-pane ${
                    activeTab === "services" ? "active" : ""
                  }`}
                  id="services"
                >
                  <h5>Services</h5>
                  <div className="settings-form">
                    {/* Services form inputs */}
                    <Controller
                      name="unit_price"
                      control={control}
                      defaultValue={settingsData.services.unit_price}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="settings-form-control"
                          placeholder="Water Unit Price"
                        />
                      )}
                    />
                    <Controller
                      name="service_fee"
                      control={control}
                      defaultValue={settingsData.services.service_fee}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="settings-form-control"
                          placeholder="Monthly Standing Charge"
                        />
                      )}
                    />
                    {/* Additional input fields */}
                  </div>
                  {/* Additional form content */}
                  <div className="settings-form">
                    <h6>House Sections</h6>
                    {settingsData.services.house_sections.map(
                      (section, index) => (
                        <div
                          key={index}
                          className="settings-form-group house-sections-list"
                        >
                          <Controller
                            name={`section${index}`}
                            control={control}
                            defaultValue={section.section}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="settings-form-control"
                                placeholder="Section"
                              />
                            )}
                          />

                          <button
                            type="button"
                            className="settings-btn settings-btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      className="settings-btn settings-btn-secondary"
                    >
                      Add Section
                    </button>
                  </div>
                </div>

                {/* Payment Methods Tab */}
                <div
                  className={`settings-pane ${
                    activeTab === "payment-methods" ? "active" : ""
                  }`}
                  id="payment-methods"
                >
                  <h5>Payment Methods</h5>
                  <div className="settings-form">
                    {/* Payment Methods form inputs */}
                    {settingsData.payments.map((payment, index) => (
                      <div key={index} className="settings-form-group">
                        <div className="d-flex">
                          <Controller
                            name={`bank_name${index}`}
                            control={control}
                            defaultValue={payment.bank_name}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="settings-form-control"
                                placeholder="Name of the Bank"
                              />
                            )}
                          />
                          <Controller
                            name={`paybill_number${index}`}
                            control={control}
                            defaultValue={payment.paybill_number}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="settings-form-control"
                                placeholder="Pay Bill Number"
                              />
                            )}
                          />
                          <Controller
                            name={`account_number${index}`}
                            control={control}
                            defaultValue={payment.account_number}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="settings-form-control"
                                placeholder="Account Number"
                              />
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <Controller
                      name="additional_info"
                      control={control}
                      defaultValue={settingsData.payments.additional_info}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="settings-form-control"
                          rows="3"
                          placeholder="Additional Information"
                        />
                      )}
                    />
                  </div>
                  {/* Additional form content */}
                </div>

                {/* Email Settings Tab */}
                <div
                  className={`settings-pane ${
                    activeTab === "email-settings" ? "active" : ""
                  }`}
                  id="email-settings"
                >
                  <h5>Email Settings</h5>
                  <div className="settings-form">
                    {/* Email Settings form inputs */}
                    <Controller
                      name="mail_server"
                      control={control}
                      defaultValue={settingsData.mailConfig.mail_server}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Mail Server"
                        />
                      )}
                    />
                    <Controller
                      name="company_email"
                      control={control}
                      defaultValue={settingsData.mailConfig.company_email}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          className="settings-form-control"
                          placeholder="Email"
                        />
                      )}
                    />
                    <Controller
                      name="                    company_password"
                      control={control}
                      defaultValue={settingsData.mailConfig.company_password}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className="settings-form-control"
                          placeholder="Email Password"
                        />
                      )}
                    />
                  </div>
                  {/* Additional form content */}
                </div>

                {/* Social Media Tab */}
                <div
                  className={`settings-pane ${
                    activeTab === "social-media" ? "active" : ""
                  }`}
                  id="social-media"
                >
                  <h5>Social Media</h5>
                  <div className="settings-form">
                    {/* Social Media form inputs */}
                    <Controller
                      name="twitter"
                      control={control}
                      defaultValue={settingsData.socialAccounts.twitter}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Twitter"
                        />
                      )}
                    />
                    <Controller
                      name="facebook"
                      control={control}
                      defaultValue={settingsData.socialAccounts.facebook}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Facebook"
                        />
                      )}
                    />
                    <Controller
                      name="linkedin"
                      control={control}
                      defaultValue={settingsData.socialAccounts.linkedin}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="LinkedIn"
                        />
                      )}
                    />
                    <Controller
                      name="instagram"
                      control={control}
                      defaultValue={settingsData.socialAccounts.instagram}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="settings-form-control"
                          placeholder="Instagram"
                        />
                      )}
                    />
                  </div>
                  {/* Additional form content */}
                </div>

                {/* Submit and Cancel buttons */}
                <div className="settings-pane-footer">
                  <button
                    type="submit"
                    className="settings-btn settings-btn-primary"
                  >
                    Save changes
                  </button>
                  <button type="button" className="settings-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
