import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Invoices from "../components/Records/Content/Invoices";
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
    if (selectedFilter === "All") {
      setFilteredData(invoiceData);
    } else {
      setFilteredData(
        invoiceData.filter(
          (invoice) =>
            invoice.status.toLowerCase() === selectedFilter.toLowerCase()
        )
      );
    }
  }, [selectedFilter]);

  const handleAddInvoice = async (newInvoice) => {
    console.log("New Invoice Added: ", newInvoice);

    try {
      //      // Implement logic for API
      //      const response = await fetch("/api/add-invoice", {
      //        method: "POST",
      //        headers: {
      //          "Content-Type": "application/json",
      //        },
      //        body: JSON.stringify(newInvoice),
      //      });
      //
      //      if (!response.ok) {
      //        throw new Error("Failed to add invoice");
      //      }
      //
      //      const result = await response.json();
      //      // Assuming the API response contains the updated invoice list or the new invoice
      //      setFilteredData((prevData) => [...prevData, result.newInvoice]);
      //      console.log("Invoice added successfully:", result.newInvoice);
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
      //      // Implement logic for API
      //      const response = await fetch(
      //        `/api/delete-invoice/${selectedInvoice.invoiceNo}`,
      //        {
      //          method: "DELETE",
      //        }
      //      );
      //
      //      if (!response.ok) {
      //        throw new Error("Failed to delete invoice");
      //      }
      //
      //      const result = await response.json();
      //      // Assuming the API response confirms deletion
      //      setFilteredData((prevData) =>
      //        prevData.filter((inv) => inv.invoiceNo !== selectedInvoice.invoiceNo)
      //      );
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

    try {
      //      // Implement logic for API
      //      // Example API call using fetch:
      //      const response = await fetch("/api/pay-invoice", {
      //        method: "POST",
      //        headers: {
      //          "Content-Type": "application/json",
      //        },
      //        body: JSON.stringify({ invoiceNo: invoice.invoiceNo }),
      //      });
      //
      //      if (!response.ok) {
      //        throw new Error("Payment failed");
      //      }
      //
      //      const result = await response.json();
      //      // Assuming the API response contains the updated invoice details
      //      const updatedInvoice = { ...invoice, status: result.status };
      //
      //      const updatedData = invoiceData.map((inv) =>
      //        inv.invoiceNo === updatedInvoice.invoiceNo ? updatedInvoice : inv
      //      );
      //
      //      setFilteredData(updatedData);

      console.log("Payment processed successfully.");
      //setProcessingInvoiceId(null);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setProcessingInvoiceId(null);
    }
  };

  //  const handleInvoicePayment = (invoice) => {
  //    setProcessingInvoiceId(invoice.invoiceNo);
  //    // Implement logic for API
  //
  //    setTimeout(() => {
  //      const updatedInvoice = { ...invoice, status: "paid" };
  //      const updatedData = invoiceData.map((inv) =>
  //        inv.invoiceNo === updatedInvoice.invoiceNo ? updatedInvoice : inv
  //      );
  //      setFilteredData(updatedData);
  //      console.log("Processing payment for invoice:", invoice);
  //      console.log("Payment made:", updatedInvoice);
  //      setProcessingInvoiceId(null);
  //    }, 2000);
  //  };

  const openAddInvoiceModal = () => {
    setIsAddInvoiceModalOpen(true);
  };

  const openDeleteInvoiceModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteInvoiceModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Invoices
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
