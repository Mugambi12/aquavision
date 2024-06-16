import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { registeredActiveHouses } from "../db/.invoiceData";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import InvoiceManagement from "../components/InvoiceManagement/Invoice/Invoice";
import AddInvoice from "../components/InvoiceManagement/AddInvoice/AddInvoice";
import ViewInvoice from "../components/InvoiceManagement/ViewInvoice/ViewInvoice";
import DeleteInvoice from "../components/InvoiceManagement/DeleteInvoice/DeleteInvoice";
import Spinner from "../components/Spinner/Spinner";

import {
  fetchInvoices,
  postInvoice,
  deleteInvoice,
  processInvoicePayment,
} from "../services/apiInvoices";

const Invoices = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [Filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [isViewInvoiceModalOpen, setIsViewInvoiceModalOpen] = useState(false);
  const [isDeleteInvoiceModalOpen, setIsDeleteInvoiceModalOpen] =
    useState(false);
  const [processing, setProcessing] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApiAndGetInvoices();
  }, []);

  useEffect(() => {
    let newFilteredData = invoicesData;
    if (Filter === "paid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status === "paid"
      );
    } else if (Filter === "unpaid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status === "unpaid"
      );
    }
    setFilteredData(newFilteredData);
  }, [Filter, invoicesData]);

  const callApiAndGetInvoices = async () => {
    try {
      const data = await fetchInvoices();
      setInvoicesData(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndPostInvoice = async (newInvoice) => {
    try {
      const updatedData = await postInvoice(newInvoice);
      //setInvoicesData(updatedData);
      window.location.reload();
      console.log("Invoice added successfully.");
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setIsAddInvoiceModalOpen(false);
    }
  };

  const callApiAndDeleteInvoice = async () => {
    try {
      const updatedData = await deleteInvoice(selectedInvoice._id);
      //setInvoicesData(updatedData);
      window.location.reload();
      console.log("Invoice deleted successfully.");
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setIsDeleteInvoiceModalOpen(false);
    }
  };

  const callApiAndProcessInvoicePayment = async (invoice) => {
    setProcessing(invoice._id);
    console.log("Processing payment for invoice:", invoice);

    try {
      const updatedData = await processInvoicePayment(invoice._id);
      setInvoicesData(updatedData);
      console.log("Payment processed successfully.");
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setProcessing(null);
    }
  };

  const openPostModal = () => {
    setIsAddInvoiceModalOpen(true);
  };

  const openViewModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceModalOpen(true);
  };

  const openDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteInvoiceModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Invoices - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main-container">
            <InvoiceManagement
              data={invoicesData}
              Filter={Filter}
              setFilter={setFilter}
              processing={processing}
              handlePayment={callApiAndProcessInvoicePayment}
              openViewModal={openViewModal}
              openDeleteModal={openDeleteModal}
              openPostModal={openPostModal}
            />
          </div>
          <Footer />
        </>
      )}

      <ModalWrapper
        isOpen={isAddInvoiceModalOpen}
        onRequestClose={() => setIsAddInvoiceModalOpen(false)}
      >
        <AddInvoice
          onSubmit={callApiAndPostInvoice}
          registeredActiveHouses={registeredActiveHouses}
        />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isViewInvoiceModalOpen}
        onRequestClose={() => setIsViewInvoiceModalOpen(false)}
      >
        <ViewInvoice invoice={selectedInvoice} />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isDeleteInvoiceModalOpen}
        onRequestClose={() => setIsDeleteInvoiceModalOpen(false)}
      >
        <DeleteInvoice
          invoice={selectedInvoice}
          onSubmit={callApiAndDeleteInvoice}
        />
      </ModalWrapper>
    </>
  );
};

export default Invoices;