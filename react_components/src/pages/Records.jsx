import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Invoices from "../components/Invoices/Content/Invoices";
import Footer from "../components/Footer/Footer";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Records = () => {
  const [newInvoiceEnty, setNewInvoiceEnty] = useState([
    // initial people data
  ]);

  const handleAddInvoice = (newInvoice) => {
    setNewInvoiceEnty([...newInvoiceEnty, newInvoice]);
    console.log("New Invoice Added: ", newInvoice);
    console.log("New Invoice Entry: ", newInvoiceEnty);
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
