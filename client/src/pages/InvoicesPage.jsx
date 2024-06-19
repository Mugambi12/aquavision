import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import InvoiceManagement from "../components/Invoices/InvoiceManagement";
import AddInvoice from "../components/Invoices/AddInvoice";
import ViewInvoice from "../components/Invoices/ViewInvoice";
import DeleteInvoice from "../components/Invoices/DeleteInvoice";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import Spinner from "../components/Spinner/Spinner";
import {
  fetchActiveHouses,
  fetchInvoices,
  postInvoice,
  deleteInvoice,
  processInvoicePayment,
} from "../resources/apiInvoices";

const InvoiceRecords = () => {
  const [loading, setLoading] = useState(false);
  const [invoicesData, setInvoicesData] = useState([]);
  const [activeHousesData, setActiveHousesData] = useState([]);
  const [processing, setProcessing] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    callApiAndGetInvoices();
    callApiAndFetchActiveHouses();
  }, []);

  const callApiAndFetchActiveHouses = async () => {
    try {
      setLoading(true);
      const data = await fetchActiveHouses();
      setActiveHousesData(data);
    } catch (error) {
      console.error("Error fetching active houses:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndGetInvoices = async () => {
    try {
      setLoading(true);
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
      setProcessing(true);
      await postInvoice(newInvoice);
      callApiAndGetInvoices();

      console.log("Invoice added successfully.");
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setProcessing(false);
      setIsPostModalOpen(false);
    }
  };

  const callApiAndProcessInvoicePayment = async (invoice) => {
    setProcessing(invoice._id);

    try {
      await processInvoicePayment(invoice);
      callApiAndGetInvoices();

      console.log("Payment processed successfully.");
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setProcessing(null);
    }
  };

  const callApiAndDeleteInvoice = async () => {
    try {
      await deleteInvoice(selectedInvoice.invoiceNo);
      callApiAndGetInvoices();

      console.log("Invoice deleted successfully.");
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const openViewModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Records - Dakoke Springs</title>
      </Helmet>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main-container">
            <InvoiceManagement
              data={invoicesData}
              processing={processing}
              handlePayment={callApiAndProcessInvoicePayment}
              openPostModal={openPostModal}
              openViewModal={openViewModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
          <Footer />
        </>
      )}

      <ModalWrapper
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
      >
        <AddInvoice
          onSubmit={callApiAndPostInvoice}
          activeHousesData={activeHousesData}
        />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
      >
        <ViewInvoice invoice={selectedInvoice} />
      </ModalWrapper>
      <ModalWrapper
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteInvoice
          invoice={selectedInvoice}
          onSubmit={callApiAndDeleteInvoice}
        />
      </ModalWrapper>
    </>
  );
};

export default InvoiceRecords;
