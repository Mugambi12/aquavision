// components/Transactions/ExpensesManagement.jsx
import React, { useEffect, useState } from "react";
//import expensesData from "../../db/expenses";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import AddExpense from "./AddExpense/AddExpense";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ExpenseDashboard
          expenses={expensesData}
          openCreateExpenseModal={openCreateExpenseModal}
        />
      )}

      <ModalWrapper
        isOpen={isCreateExpenseModalOpen}
        onRequestClose={() => setIsCreateExpenseModalOpen(false)}
      >
        <AddExpense onSubmit={callApiAndPostExpense} submitting={submitting} />
      </ModalWrapper>
    </>
  );
};

export default ExpensesManagement;
