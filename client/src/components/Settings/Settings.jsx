import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./Settings.css";

const CompanySettings = ({ settings, handleSaveSettings }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: settings,
  });

  const {
    fields: houseSectionsFields,
    append: appendHouseSection,
    remove: removeHouseSection,
  } = useFieldArray({
    control,
    name: "services.house_sections",
  });

  const {
    fields: paymentMethodsFields,
    append: appendPaymentMethod,
    remove: removePaymentMethod,
  } = useFieldArray({
    control,
    name: "payments",
  });

  const [activeTab, setActiveTab] = useState("company-profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onSubmit = async (data) => {
    await handleSaveSettings(data);
  };

  // Mapping tabs to icons
  const tabIcons = {
    "company-profile": "account_circle",
    services: "build",
    "payment-methods": "credit_card",
    "email-settings": "email",
    "social-media": "share",
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-row">
          {/* Sidebar Column */}
          <div className="settings-sidebar">
            <div className="settings-company-logo">
              <img src={settings.company_logo} alt="Company Logo" />
              <h4 className="company-name">{settings.company_name}</h4>
            </div>

            <div className="settings-nav">
              {/* Sidebar Navigation links */}
              {[
                "company-profile",
                "services",
                "payment-methods",
                "email-settings",
                "social-media",
              ].map((tab) => (
                <a
                  key={tab}
                  className={`settings-nav-item ${
                    activeTab === tab ? "active" : ""
                  }`}
                  href={`#${tab}`}
                  onClick={() => handleTabClick(tab)}
                >
                  <span className="material-symbols-rounded">
                    {tabIcons[tab]}
                  </span>
                  <span className="nav-label">
                    {tab
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="settings-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Company Profile Tab */}
              <div
                className={`settings-pane ${
                  activeTab === "company-profile" ? "active" : ""
                }`}
                id="company-profile"
              >
                <h5>Company Profile</h5>
                <div className="settings-form">
                  <label htmlFor="company_logo">Company Logo</label>
                  <input
                    type="text"
                    {...register("company_logo", { required: true })}
                    defaultValue={settings.company_logo}
                  />
                  {errors.company_logo && (
                    <p className="error">Company Logo is required</p>
                  )}

                  <label htmlFor="company_name">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register("company_name", { required: true })}
                    defaultValue={settings.company_name}
                  />
                  {errors.company_name && (
                    <p className="error">Company Name is required</p>
                  )}

                  <label htmlFor="company_address">Company Address</label>
                  <input
                    type="text"
                    placeholder="Company Address"
                    {...register("company_address", { required: true })}
                    defaultValue={settings.company_address}
                  />
                  {errors.company_address && (
                    <p className="error">Company Address is required</p>
                  )}

                  <label htmlFor="company_website_url">Company Website</label>
                  <input
                    type="text"
                    placeholder="Company Website"
                    {...register("company_website_url", { required: true })}
                    defaultValue={settings.company_website_url}
                  />
                  {errors.company_website_url && (
                    <p className="error">Company Website is required</p>
                  )}

                  <label htmlFor="contact_number">Contact Number</label>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    {...register("contact_number", { required: true })}
                    defaultValue={settings.contact_number}
                  />
                  {errors.contact_number && (
                    <p className="error">Contact Number is required</p>
                  )}

                  <label htmlFor="company_description">
                    Company Description
                  </label>
                  <textarea
                    placeholder="Company Description"
                    rows="5"
                    {...register("company_description", { required: true })}
                    defaultValue={settings.company_description}
                  />
                  {errors.company_description && (
                    <p className="error">Company Description is required</p>
                  )}
                </div>
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
                  <label htmlFor="services.unit_price">Water Unit Price</label>
                  <input
                    type="number"
                    placeholder="Water Unit Price"
                    {...register("services.unit_price", { required: true })}
                    defaultValue={settings.services?.unit_price}
                  />
                  {errors.services?.unit_price && (
                    <p className="error">Water Unit Price is required</p>
                  )}

                  <label htmlFor="services.service_fee">
                    Monthly Standing Charge
                  </label>
                  <input
                    type="number"
                    placeholder="Monthly Standing Charge"
                    {...register("services.service_fee", { required: true })}
                    defaultValue={settings.services?.service_fee}
                  />
                  {errors.services?.service_fee && (
                    <p className="error">Monthly Standing Charge is required</p>
                  )}
                </div>

                <div className="settings-form">
                  <h4>House Sections</h4>
                  {houseSectionsFields.map((section, index) => (
                    <div key={section.id}>
                      <input
                        type="text"
                        placeholder="Section"
                        {...register(
                          `services.house_sections.${index}.section`,
                          { required: true }
                        )}
                        defaultValue={section.section}
                      />
                      {errors.services?.house_sections?.[index]?.section && (
                        <p className="error">Section is required</p>
                      )}

                      <button
                        type="button"
                        className="settings-btn danger"
                        onClick={() => removeHouseSection(index)}
                      >
                        <span className="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="settings-btn secondary"
                    onClick={() => appendHouseSection({ section: "" })}
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
                  {paymentMethodsFields.map((payment, index) => (
                    <div key={payment.id} className="settings-form-group">
                      <label htmlFor={`payments[${index}].bank_name`}>
                        Bank Name
                      </label>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        {...register(`payments[${index}].bank_name`, {
                          required: true,
                        })}
                        defaultValue={payment.bank_name}
                      />
                      {errors.payments?.[index]?.bank_name && (
                        <p className="error">Bank Name is required</p>
                      )}

                      <label htmlFor={`payments[${index}].paybill_number`}>
                        Pay Bill Number
                      </label>
                      <input
                        type="text"
                        placeholder="Pay Bill Number"
                        {...register(`payments[${index}].paybill_number`, {
                          required: true,
                        })}
                        defaultValue={payment.paybill_number}
                      />
                      {errors.payments?.[index]?.paybill_number && (
                        <p className="error">Pay Bill Number is required</p>
                      )}

                      <label htmlFor={`payments[${index}].account_number`}>
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="Account Number"
                        {...register(`payments[${index}].account_number`, {
                          required: true,
                        })}
                        defaultValue={payment.account_number}
                      />
                      {errors.payments?.[index]?.account_number && (
                        <p className="error">Account Number is required</p>
                      )}

                      <button
                        type="button"
                        className="settings-btn danger"
                        onClick={() => removePaymentMethod(index)}
                        style={{ marginBottom: "1rem" }}
                      >
                        <span className="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="settings-btn secondary"
                    onClick={() =>
                      appendPaymentMethod({
                        bank_name: "",
                        paybill_number: "",
                        account_number: "",
                      })
                    }
                  >
                    Add Payment Method
                  </button>
                </div>
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
                  <label htmlFor="mailConfig.mail_server">Mail Server</label>
                  <input
                    type="text"
                    placeholder="Mail Server"
                    {...register("mailConfig.mail_server", {
                      required: true,
                    })}
                    defaultValue={settings.mailConfig?.mail_server}
                  />
                  {errors.mailConfig?.mail_server && (
                    <p className="error">Mail Server is required</p>
                  )}

                  <label htmlFor="mailConfig.company_email">
                    Company Email
                  </label>
                  <input
                    type="email"
                    placeholder="Company Email"
                    {...register("mailConfig.company_email", {
                      required: true,
                    })}
                    defaultValue={settings.mailConfig?.company_email}
                  />
                  {errors.mailConfig?.company_email && (
                    <p className="error">Company Email is required</p>
                  )}

                  <label htmlFor="mailConfig.password">Email Password</label>
                  <input
                    type="password"
                    placeholder="Email Password"
                    {...register("mailConfig.password", {
                      required: true,
                    })}
                    defaultValue={settings.mailConfig?.password}
                  />
                  {errors.mailConfig?.password && (
                    <p className="error">Email Password is required</p>
                  )}
                </div>
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
                  <label htmlFor="socialAccounts.twitter">Twitter</label>
                  <input
                    type="text"
                    placeholder="Twitter"
                    {...register("socialAccounts.twitter", {
                      required: true,
                    })}
                    defaultValue={settings.socialAccounts?.twitter}
                  />
                  {errors.socialAccounts?.twitter && (
                    <p className="error">Twitter is required</p>
                  )}

                  <label htmlFor="socialAccounts.facebook">facebook</label>
                  <input
                    type="text"
                    placeholder="Facebook"
                    {...register("socialAccounts.facebook", {
                      required: true,
                    })}
                    defaultValue={settings.socialAccounts?.facebook}
                  />
                  {errors.socialAccounts?.facebook && (
                    <p className="error">Facebook is required</p>
                  )}

                  <label htmlFor="socialAccounts.linkedin">LinkedIn</label>
                  <input
                    type="text"
                    placeholder="LinkedIn"
                    {...register("socialAccounts.linkedin", {
                      required: true,
                    })}
                    defaultValue={settings.socialAccounts?.linkedin}
                  />
                  {errors.socialAccounts?.linkedin && (
                    <p className="error">LinkedIn is required</p>
                  )}

                  <label htmlFor="socialAccounts.instagram">Instagram</label>
                  <input
                    type="text"
                    placeholder="Instagram"
                    {...register("socialAccounts.instagram", {
                      required: true,
                    })}
                    defaultValue={settings.socialAccounts?.instagram}
                  />
                  {errors.socialAccounts?.instagram && (
                    <p className="error">Instagram is required</p>
                  )}
                </div>
              </div>

              {/* Submit buttons */}
              <div className="settings-pane-footer">
                <button type="submit" className="settings-btn success">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
