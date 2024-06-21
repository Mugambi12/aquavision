import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import AddExpense from "./TransactionForms/AddExpense";
import ViewExpense from "./TransactionForms/ViewExpense";
import DeleteExpense from "./TransactionForms/DeleteExpense";
import Spinner from "../Spinner/Spinner";
import { fetchExpenses, postExpense } from "../../resources/apiExpenses";

const ExpensesManagement = ({
  openCreateExpenseModal,
  isCreateExpenseModalOpen,
  setIsCreateExpenseModalOpen,
}) => {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isViewExpenseModalOpen, setIsViewExpenseModalOpen] = useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =
    useState(false);

  useEffect(() => {
    callApiAndFetchExpenses();
  }, []);

  const callApiAndFetchExpenses = async () => {
    try {
      setLoading(true);
      const expenses = await fetchExpenses();
      setExpensesData(expenses);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setLoading(false);
      console.log("Expenses fetched successfully.");
    }
  };

  const callApiAndPostExpense = async (newExpense) => {
    try {
      setSubmitting(true);
      await postExpense(newExpense);
      callApiAndFetchExpenses();
      console.log("Expense added successfully.");
      console.log("New expense data", newExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setSubmitting(false);
      setIsCreateExpenseModalOpen(false);
    }
  };

  const callApiAndDeleteExpense = async (expenseId) => {
    try {
      setSubmitting(true);
      await deleteExpense(expenseId);
      callApiAndFetchExpenses();
      console.log("Expense deleted successfully.");
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setSubmitting(false);
      setIsDeleteExpenseModalOpen(false);
    }
  };

  const openViewExpenseModal = (expense) => {
    setSelectedExpense(expense);
    setIsViewExpenseModalOpen(true);
  };

  const openEditExpenseModal = (expense) => {
    console.log("Edit expense", expense);
  };

  const openDeleteExpenseModal = (expense) => {
    setSelectedExpense(expense);
    setIsDeleteExpenseModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ExpenseDashboard
          expenses={expensesData}
          openCreateExpenseModal={openCreateExpenseModal}
          openViewExpenseModal={openViewExpenseModal}
          openDeleteExpenseModal={openDeleteExpenseModal}
        />
      )}

      <ModalWrapper
        isOpen={isCreateExpenseModalOpen}
        onRequestClose={() => setIsCreateExpenseModalOpen(false)}
      >
        <AddExpense onSubmit={callApiAndPostExpense} submitting={submitting} />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isViewExpenseModalOpen}
        onRequestClose={() => setIsViewExpenseModalOpen(false)}
      >
        <ViewExpense
          expense={selectedExpense}
          openEditExpenseModal={openEditExpenseModal}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={isDeleteExpenseModalOpen}
        onRequestClose={() => setIsDeleteExpenseModalOpen(false)}
      >
        <DeleteExpense
          expense={selectedExpense}
          onDelete={() => callApiAndDeleteExpense(selectedExpense._id)}
          submitting={submitting}
        />
      </ModalWrapper>
    </>
  );
};

export default ExpensesManagement;
