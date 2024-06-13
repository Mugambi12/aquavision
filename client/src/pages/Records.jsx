import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import MainContent from "../components/Records/MainContent/MainContent";
import Footer from "../components/Footer/Footer";
import AddInvoiceForm from "../components/Records/AddInvoiceForm/AddInvoiceForm";
import DeleteInvoice from "../components/Records/DeleteInvoice/DeleteInvoice";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import { registeredActiveHouses } from "../db/.invoiceData";

const Records = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [processingInvoiceId, setProcessingInvoiceId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDeleteInvoiceModalOpen, setIsDeleteInvoiceModalOpen] = useState(false);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newFilteredData = invoicesData;
    if (selectedFilter === "Paid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status.toLowerCase() === "paid"
      );
    } else if (selectedFilter === "Unpaid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status.toLowerCase() === "unpaid"
      );
    }
    setFilteredData(newFilteredData);
  }, [selectedFilter, invoicesData]);

  useEffect(() => {
    callApiAndGetInvoices();
  }, []);

  const callApiAndGetInvoices = async () => {
    try {
      const response = await fetch("/api/invoices");
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setInvoicesData(data);
      console.log("Invoices data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndPostInvoice = async (newInvoice) => {
    console.log("New Invoice Added: ", newInvoice);

    try {
      // Implement logic for API
      // Assuming API call succeeds and returns updated data with new invoice
      setInvoicesData([...invoicesData, newInvoice]);
      setSelectedFilter("All");
      console.log("Invoice added successfully.");
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setIsAddInvoiceModalOpen(false);
    }
  };

  const callApiAndDeleteInvoice = async () => {
    console.log("Deleting invoice:", selectedInvoice);

    try {
      // Implement logic for API
      // Assuming API call succeeds and returns updated data without deleted invoice
      setInvoicesData(invoicesData.filter(invoice => invoice.invoiceNo !== selectedInvoice.invoiceNo));
      setSelectedFilter("All");
      console.log("Invoice deleted successfully.");
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setIsDeleteInvoiceModalOpen(false);
    }
  };

  const callApiAndProcessInvoicePayment = async (invoice) => {
    setProcessingInvoiceId(invoice.invoiceNo);
    console.log("Processing payment for invoice:", invoice);

    setTimeout(() => {
      //const updatedInvoice = { ...invoice, status: "paid" };
      //const updatedData = invoicesData.map((inv) =>
      //  inv.invoiceNo === updatedInvoice.invoiceNo ? updatedInvoice : inv
      //);
      //setInvoicesData(updatedData);
      setSelectedFilter("All");
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
          handleInvoicePayment={callApiAndProcessInvoicePayment}
          openDeleteInvoiceModal={openDeleteInvoiceModal}
          openAddInvoiceModal={openAddInvoiceModal}
          loading={loading}
        />
      </div>
      <Footer />
      <ModalWrapper
        isOpen={isDeleteInvoiceModalOpen}
        onRequestClose={() => setIsDeleteInvoiceModalOpen(false)}
      >
        <DeleteInvoice
          invoice={selectedInvoice}
          onSubmit={callApiAndDeleteInvoice}
        />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isAddInvoiceModalOpen}
        onRequestClose={() => setIsAddInvoiceModalOpen(false)}
      >
        <AddInvoiceForm onSubmit={callApiAndPostInvoice} registeredActiveHouses={registeredActiveHouses} />
      </ModalWrapper>
    </>
  );
};

export default Records;