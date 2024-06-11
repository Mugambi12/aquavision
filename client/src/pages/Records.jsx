import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import MainContent from "../components/Records/MainContent/MainContent";
import Footer from "../components/Footer/Footer";
import AddInvoiceForm from "../components/Records/AddInvoiceForm/AddInvoiceForm";
import DeleteInvoice from "../components/Records/DeleteInvoice/DeleteInvoice";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import invoiceData from "../db/invoiceData";

const Records = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredData, setFilteredData] = useState(invoiceData);
  const [processingInvoiceId, setProcessingInvoiceId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDeleteInvoiceModalOpen, setIsDeleteInvoiceModalOpen] =
    useState(false);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);

  useEffect(() => {
    let newFilteredData = invoiceData;
    if (selectedFilter === "Paid") {
      newFilteredData = invoiceData.filter(
        (invoice) => invoice.status.toLowerCase() === "paid"
      );
    } else if (selectedFilter === "Unpaid") {
      newFilteredData = invoiceData.filter(
        (invoice) => invoice.status.toLowerCase() === "unpaid"
      );
    }
    setFilteredData(newFilteredData);
  }, [selectedFilter]);

  const handleAddInvoice = async (newInvoice) => {
    console.log("New Invoice Added: ", newInvoice);

    try {
      // Implement logic for API
      console.log("Invoice added successfully.");
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setIsAddInvoiceModalOpen(false);
    }
  };

  const handleDeleteInvoice = async () => {
    console.log("Deleting invoice:", selectedInvoice);

    try {
      // Implement logic for API
      console.log("Invoice deleted successfully.");
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setIsDeleteInvoiceModalOpen(false);
    }
  };

  const handleInvoicePayment = async (invoice) => {
    setProcessingInvoiceId(invoice.invoiceNo);
    console.log("Processing payment for invoice:", invoice);

    setTimeout(() => {
      const updatedInvoice = { ...invoice, status: "paid" };
      const updatedData = invoiceData.map((inv) =>
        inv.invoiceNo === updatedInvoice.invoiceNo ? updatedInvoice : inv
      );
      setFilteredData(updatedData);
      console.log("Payment made:", updatedInvoice);
      setProcessingInvoiceId(null);
    }, 2000);
  };

  const openAddInvoiceModal = () => {
    setIsAddInvoiceModalOpen(true);
  };

  const openDeleteInvoiceModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteInvoiceModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Records - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      <div className="main-container">
        <MainContent
          data={filteredData}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          processingInvoiceId={processingInvoiceId}
          handleInvoicePayment={handleInvoicePayment}
          openDeleteInvoiceModal={openDeleteInvoiceModal}
          openAddInvoiceModal={openAddInvoiceModal}
        />
      </div>
      <Footer />
      <ModalWrapper
        isOpen={isDeleteInvoiceModalOpen}
        onRequestClose={() => setIsDeleteInvoiceModalOpen(false)}
      >
        <DeleteInvoice
          invoice={selectedInvoice}
          onSubmit={handleDeleteInvoice}
        />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isAddInvoiceModalOpen}
        onRequestClose={() => setIsAddInvoiceModalOpen(false)}
      >
        <AddInvoiceForm onSubmit={handleAddInvoice} />
      </ModalWrapper>
    </>
  );
};

export default Records;
