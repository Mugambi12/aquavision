// components/Transactions/ExpensesManagement.jsx
import React, { useEffect, useState } from "react";
//import expensesData from "../../db/expenses";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import AddExpense from "./AddExpense/AddExpense";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { fetchExpenses } from "../../services/apiExpenses";
import Spinner from "../Spinner/Spinner";

const ExpensesManagement = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
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
    setIsAddExpenseModalOpen(false);
  };

  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ExpenseDashboard
          expenses={expensesData}
          openAddExpenseModal={openAddExpenseModal}
        />
      )}

      <ModalWrapper
        isOpen={isAddExpenseModalOpen}
        onRequestClose={() => setIsAddExpenseModalOpen(false)}
      >
        <AddExpense onSubmit={handleAddExpense} />
      </ModalWrapper>
    </>
  );
};

export default ExpensesManagement;
