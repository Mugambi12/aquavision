import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./Settings.css";

const CompanySettings = ({ settingsData, handleSaveSettings }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: settingsData,
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
    await handleSaveSettings(data); // Call the API and log form data
  };

  return (
    <div className="settings-container">
      <h4 className="settings-title">{settingsData.company_name} Settings</h4>
      <div className="settings-card">
        <div className="settings-row">
          {/* Sidebar Column */}
          <div className="settings-sidebar">
            <div className="settings-company-logo">
              <img src={settingsData.company_logo} alt="Company Logo" />
              <h4 className="company-name">{settingsData.company_name}</h4>
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
                  {tab
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
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
                    type="file"
                    {...register("company_logo", { required: true })}
                  />
                  {errors.company_logo && (
                    <p className="error">Company Logo is required</p>
                  )}

                  <label htmlFor="company_name">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register("company_name", { required: true })}
                  />
                  {errors.company_name && (
                    <p className="error">Company Name is required</p>
                  )}

                  <label htmlFor="company_address">Company Address</label>
                  <input
                    type="text"
                    placeholder="Industry"
                    {...register("industry", { required: true })}
                  />
                  {errors.industry && (
                    <p className="error">Industry is required</p>
                  )}

                  <label htmlFor="company_website_url">Company Website</label>
                  <input
                    type="text"
                    placeholder="Website"
                    {...register("company_website_url", { required: true })}
                  />
                  {errors.company_website_url && (
                    <p className="error">Website is required</p>
                  )}

                  <label htmlFor="contact_number">Contact Number</label>
                  <input
                    type="email"
                    placeholder="Contact Email"
                    {...register("contact_email", { required: true })}
                  />
                  {errors.contact_email && (
                    <p className="error">Contact Email is required</p>
                  )}

                  <label htmlFor="company_description">
                    Company Description
                  </label>
                  <textarea
                    placeholder="Description"
                    rows="5"
                    {...register("company_description", { required: true })}
                  />
                  {errors.company_description && (
                    <p className="error">Description is required</p>
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
                      <label htmlFor="bank_name">Bank Name</label>
                      <input
                        type="text"
                        placeholder="Name of the Bank"
                        {...register(`payments.${index}.bank_name`, {
                          required: true,
                        })}
                      />
                      {errors.payments?.[index]?.bank_name && (
                        <p className="error">Bank Name is required</p>
                      )}

                      <label htmlFor="paybill_number">Pay Bill Number</label>
                      <input
                        type="text"
                        placeholder="Pay Bill Number"
                        {...register(`payments.${index}.paybill_number`, {
                          required: true,
                        })}
                      />
                      {errors.payments?.[index]?.paybill_number && (
                        <p className="error">Pay Bill Number is required</p>
                      )}

                      <label htmlFor="account_number">Account Number</label>
                      <input
                        type="text"
                        placeholder="Account Number"
                        {...register(`payments.${index}.account_number`, {
                          required: true,
                        })}
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
                  <input
                    type="text"
                    placeholder="Mail Server"
                    {...register("mailConfig.mail_server", {
                      required: true,
                    })}
                  />
                  {errors.mailConfig?.mail_server && (
                    <p className="error">Mail Server is required</p>
                  )}

                  <input
                    type="email"
                    placeholder="Email"
                    {...register("mailConfig.company_email", {
                      required: true,
                    })}
                  />
                  {errors.mailConfig?.company_email && (
                    <p className="error">Email is required</p>
                  )}

                  <input
                    type="password"
                    placeholder="Email Password"
                    {...register("mailConfig.password", {
                      required: true,
                    })}
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
                  <input
                    type="text"
                    placeholder="Twitter"
                    {...register("socialAccounts.twitter", {
                      required: true,
                    })}
                  />
                  {errors.socialAccounts?.twitter && (
                    <p className="error">Twitter is required</p>
                  )}

                  <input
                    type="text"
                    placeholder="Facebook"
                    {...register("socialAccounts.facebook", {
                      required: true,
                    })}
                  />
                  {errors.socialAccounts?.facebook && (
                    <p className="error">Facebook is required</p>
                  )}

                  <input
                    type="text"
                    placeholder="LinkedIn"
                    {...register("socialAccounts.linkedin", {
                      required: true,
                    })}
                  />
                  {errors.socialAccounts?.linkedin && (
                    <p className="error">LinkedIn is required</p>
                  )}

                  <input
                    type="text"
                    placeholder="Instagram"
                    {...register("socialAccounts.instagram", {
                      required: true,
                    })}
                  />
                  {errors.socialAccounts?.instagram && (
                    <p className="error">Instagram is required</p>
                  )}
                </div>
              </div>

              {/* Submit and Cancel buttons */}
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
