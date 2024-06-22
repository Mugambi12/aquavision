// InvoicesMenu.js
import React from "react";
import "./InvoiceMenu.css";

const InvoicesMenu = (
  {
    /*Filter, setFilter*/
  }
) => (
  <div className="records-menu">
    <span
    /*className={Filter === "all" ? "records-active" : ""}
      onClick={() => setFilter("all")}*/
    >
      All
    </span>
    <span
    /*className={Filter === "unpaid" ? "records-active" : ""}
      onClick={() => setFilter("unpaid")}*/
    >
      Unpaid
    </span>
    <span
    /*className={Filter === "paid" ? "records-active" : ""}
      onClick={() => setFilter("paid")}*/
    >
      Paid
    </span>
  </div>
);

export default InvoicesMenu;
