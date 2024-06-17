// components/Transactions/ExpensesManagement.jsx
import React, { useEffect, useState } from "react";
//import expensesData from "../../db/expenses";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import AddExpense from "./AddExpense/AddExpense";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Spinner from "../Spinner/Spinner";
import { fetchExpenses } from "../../resources/apiExpenses";

const ExpensesManagement = ({
  openCreateExpenseModal,
  isCreateExpenseModalOpen,
  setIsCreateExpenseModalOpen,
}) => {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleAddExpense = (newExpense) => {
    console.log("Adding expense:", newExpense);
    console.log("Expense added successfully.");
    setIsCreateExpenseModalOpen(false);
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
        <AddExpense onSubmit={handleAddExpense} />
      </ModalWrapper>
    </>
  );
};

export default ExpensesManagement;
