// InvoiceManagement.js
import React from "react";
import InvoicesHeader from "./InvoiceHeader";
import InvoicesMenu from "./InvoiceMenu";
import InvoiceTable from "./InvoiceTable";
import AddInvoiceButton from "./AddInvoiceButton";

const InvoiceManagement = ({
  data,
  /*Filter,*/
  /*setFilter,*/
  processing,
  handlePayment,
  openPostModal,
  openViewModal,
  openDeleteModal,
}) => {
  return (
    <div className="records-container">
      <InvoicesHeader />
      <InvoicesMenu /*Filter={Filter} setFilter={setFilter}*/ />
      <InvoiceTable
        data={data}
        processing={processing}
        handlePayment={handlePayment}
        openViewModal={openViewModal}
        openDeleteModal={openDeleteModal}
      />
      <AddInvoiceButton openPostModal={openPostModal} />
    </div>
  );
};

export default InvoiceManagement;
