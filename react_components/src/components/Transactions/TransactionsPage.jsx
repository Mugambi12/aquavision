import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Revenue from "./Revenue/Revenue";
import Expenses from "./Expenses/Expenses";
import "./TransactionsPage.css";
import Footer from "../Footer/Footer";

const TransactionsPage = () => {
  const [showRevenue, setShowRevenue] = useState(true);

  const toggleView = (view) => {
    setShowRevenue(view === "revenue");
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar toggleView={toggleView} />
        <div className="transactions-content">
          {showRevenue ? <Revenue /> : <Expenses />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TransactionsPage;
