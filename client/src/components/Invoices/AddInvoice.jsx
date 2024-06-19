import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import "./AddInvoice.css";

const AddInvoiceForm = ({ onSubmit, activeHousesData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedSection = watch("house_section", "");

  const houseSections = useMemo(
    () => activeHousesData.map((house) => house.house_section),
    [activeHousesData]
  );

  const houseNumbers = useMemo(() => {
    const section = activeHousesData.find(
      (house) => house.house_section === selectedSection
    );
    return section ? JSON.parse(section.house_number) : [];
  }, [selectedSection, activeHousesData]);

  const onSubmitForm = (data) => {
    onSubmit({
      house_section: data.house_section,
      house_number: data.house_number,
      current_reading: data.current_reading,
    });
  };

  return (
    <div className="add-invoice-container">
      <h2 className="modal-title">Add New Invoice</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="add-invoice-form">
        <label>House Section:</label>
        <select
          {...register("house_section", { required: true })}
          onChange={(e) => {
            setValue("house_section", e.target.value);
            setValue("house_number", "");
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select section
          </option>
          {houseSections.map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>
        {errors.house_section && (
          <p className="error">This field is required</p>
        )}

        <label>House Number:</label>
        <select
          {...register("house_number", { required: true })}
          disabled={!selectedSection}
          defaultValue=""
        >
          <option value="" disabled>
            Select number
          </option>
          {houseNumbers.map((number, index) => (
            <option key={index} value={number}>
              {number}
            </option>
          ))}
        </select>
        {errors.house_number && <p className="error">This field is required</p>}

        <label>Meter Reading:</label>
        <input
          type="number"
          placeholder="Enter meter reading"
          {...register("current_reading", { required: true })}
        />
        {errors.current_reading && (
          <p className="error">This field is required</p>
        )}

        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
};

export default AddInvoiceForm;
