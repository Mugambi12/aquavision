import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Invoices from "../components/Records/Content/Invoices";
import Footer from "../components/Footer/Footer";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Records = () => {
  const handleAddInvoice = (newInvoice) => {
    console.log("New Invoice Added: ", newInvoice);
    // Implement logic for API
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Invoices onAddInvoice={handleAddInvoice} />
      </div>
      <Footer />
    </>
  );
};

export default Records;
