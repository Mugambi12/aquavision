// components/Transactions/ExpensesManagement.jsx
import React, { useState } from "react";
import expensesData from "../../db/expenses";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import AddExpense from "./AddExpense/AddExpense";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ExpensesManagement = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  const handleAddExpense = (newExpense) => {
    console.log("Adding expense:", newExpense);
    console.log("Expense added successfully.");
    setIsAddExpenseModalOpen(false);
  };

  return (
    <>
      <ExpenseDashboard
        expenses={expensesData}
        openAddExpenseModal={openAddExpenseModal}
      />

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
