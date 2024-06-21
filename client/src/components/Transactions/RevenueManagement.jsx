import React, { useEffect, useState } from "react";
import RevenueDashboard from "./RevenueDashboard/RevenueDashboard";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import DeleteRevenue from "./TransactionForms/DeleteRevenue";
import EditRevenue from "./TransactionForms/EditRevenue";
import RefundRevenue from "./TransactionForms/RefundRevenue";
import AddRevenue from "./TransactionForms/AddRevenue";
import ViewRevenue from "./TransactionForms/ViewRevenue"; // Import the new component
import Spinner from "../Spinner/Spinner";
import {
  fetchRevenue,
  postRevenue,
  deleteRevenue,
  updateRevenue,
  refundRevenue,
} from "../../resources/apiRevenue";

const RevenueManagement = ({
  openCreateRevenueModal,
  isCreateRevenueModalOpen,
  setIsCreateModalOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isEditRevenueModalOpen, setIsEditModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundModalOpen] = useState(false);
  const [isDeleteRevenueModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewRevenueModalOpen, setIsViewRevenueModalOpen] = useState(false); // State for view modal

  useEffect(() => {
    callApiAndFetchRevenue();
  }, []);

  const callApiAndFetchRevenue = async () => {
    try {
      setLoading(true);
      const data = await fetchRevenue();
      setRevenueData(data);
    } catch (error) {
      console.error("Error fetching Revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  const callApiAndPostRevenue = async (newRevenue) => {
    try {
      setSubmitting(true);
      await postRevenue(newRevenue);
      console.log("Revenue added successfully.");
      callApiAndFetchRevenue();
    } catch (error) {
      console.error("Error adding invoice:", error);
    } finally {
      setSubmitting(false);
      setIsCreateModalOpen(false);
    }
  };

  const callApiAndUpdateRevenue = async (editedRevenue) => {
    try {
      setSubmitting(true);
      await updateRevenue(editedRevenue);
      console.log("Revenue updated successfully.");
      callApiAndFetchRevenue();
    } catch (error) {
      console.error("Error updating revenue:", error);
    } finally {
      setSubmitting(false);
      setIsEditModalOpen(false);
    }
  };

  const callApiAndRefundRevenue = async () => {
    try {
      setSubmitting(true);
      await refundRevenue(selectedRevenue._id);
      console.log("Revenue refunded successfully.");
      callApiAndFetchRevenue();
    } catch (error) {
      console.error("Error refunding revenue:", error);
    } finally {
      setSubmitting(false);
      setIsRefundModalOpen(false);
    }
  };

  const callApiAndDeleteRevenue = async () => {
    try {
      setSubmitting(true);
      await deleteRevenue(selectedRevenue._id);
      console.log("Revenue deleted successfully.");
      callApiAndFetchRevenue();
    } catch (error) {
      console.error("Error deleting revenue:", error);
    } finally {
      setSubmitting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const openRefundRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsRefundModalOpen(true);
  };

  const openEditRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsViewRevenueModalOpen(false);
    setIsEditModalOpen(true);
  };

  const openDeleteRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsDeleteModalOpen(true);
  };

  const openViewRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsViewRevenueModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <RevenueDashboard
          revenue={revenueData}
          openDeleteRevenueModal={openDeleteRevenueModal}
          openRefundRevenueModal={openRefundRevenueModal}
          openCreateRevenueModal={openCreateRevenueModal}
          openViewRevenueModal={openViewRevenueModal} // Pass the function
        />
      )}

      <ModalWrapper
        isOpen={isCreateRevenueModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <AddRevenue onSubmit={callApiAndPostRevenue} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isEditRevenueModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <EditRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndUpdateRevenue}
          submitting={submitting}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isRefundRevenueModalOpen}
        onRequestClose={() => setIsRefundModalOpen(false)}
      >
        <RefundRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndRefundRevenue}
          submitting={submitting}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isDeleteRevenueModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteRevenue
          revenue={selectedRevenue}
          onSubmit={callApiAndDeleteRevenue}
          submitting={submitting}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isViewRevenueModalOpen}
        onRequestClose={() => setIsViewRevenueModalOpen(false)}
      >
        <ViewRevenue
          revenue={selectedRevenue}
          openEditRevenueModal={openEditRevenueModal}
        />
      </ModalWrapper>
    </>
  );
};

export default RevenueManagement;
