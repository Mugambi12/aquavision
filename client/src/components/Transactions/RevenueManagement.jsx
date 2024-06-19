// components/Transactions/RevenueManagement.jsx
import React, { useEffect, useState } from "react";
import RevenueDashboard from "./RevenueDashboard";
import DeleteRevenue from "./DeleteRevenue";
import EditRevenue from "./EditRevenue";
import RefundRevenue from "./RefundRevenue";
import AddRevenue from "./AddRevenue";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Spinner from "../Spinner/Spinner";
import {
  fetchRevenue,
  postRevenue,
  deleteRevenue,
  updateRevenue,
  refundRevenue,
} from "../../resources/apiRevenue";
import { set } from "react-hook-form";

const RevenueManagement = ({
  openCreateRevenueModal,
  isCreateRevenueModalOpen,
  setIsCreateModalOpen,
}) => {
  const [revenueData, setRevenueData] = useState([]);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [isEditRevenueModalOpen, setIsEditModalOpen] = useState(false);
  const [isRefundRevenueModalOpen, setIsRefundModalOpen] = useState(false);
  const [isDeleteRevenueModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    setIsEditModalOpen(true);
  };

  const openDeleteRevenueModal = (revenue) => {
    setSelectedRevenue(revenue);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <RevenueDashboard
          revenue={revenueData}
          openDeleteRevenueModal={openDeleteRevenueModal}
          openEditRevenueModal={openEditRevenueModal}
          openRefundRevenueModal={openRefundRevenueModal}
          openCreateRevenueModal={openCreateRevenueModal}
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
    </>
  );
};

export default RevenueManagement;
