// InvoicesMenu.js
import React from "react";

const InvoicesMenu = () => (
  <div className="records-menu">
    <span
    /*onClick show ("all") invoices only*/
    >
      All
    </span>
    <span
    /*onClick show ("unpaid") invoices only*/
    >
      Unpaid
    </span>
    <span
    /*onClick show ("paid") invoices only*/
    >
      Paid
    </span>
  </div>
);

export default InvoicesMenu;
