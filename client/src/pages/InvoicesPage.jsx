import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import InvoiceManagement from "../components/Invoices/InvoiceManagement";
import AddInvoice from "../components/Invoices/AddInvoice";
import ViewInvoice from "../components/Invoices/ViewInvoice";
import DeleteInvoice from "../components/Invoices/DeleteInvoice";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import { registeredActiveHouses } from "../db/.invoiceData";
import Spinner from "../components/Spinner/Spinner";

import {
  fetchInvoices,
  postInvoice,
  deleteInvoice,
  processInvoicePayment,
} from "../resources/apiInvoices";

const Records = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  /*const [Filter, setFilter] = useState("All");*/
  /*const [filteredData, setFilteredData] = useState([]);*/
  const [processing, setProcessing] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApiAndGetInvoices();
  }, []);

  /*useEffect(() => {
    let newFilteredData = invoicesData;
    if (Filter === "Paid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status.toLowerCase() === "paid"
      );
    } else if (Filter === "Unpaid") {
      newFilteredData = invoicesData.filter(
        (invoice) => invoice.status.toLowerCase() === "unpaid"
      );
    }
    setFilteredData(newFilteredData);
  }, [Filter, invoicesData]);*/

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
      await postInvoice(newInvoice);
      callApiAndGetInvoices();

      console.log("Invoice added successfully.");
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
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
              /*Filter={Filter}*/
              /*setFilter={setFilter}*/
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
          registeredActiveHouses={registeredActiveHouses}
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

export default Records;
