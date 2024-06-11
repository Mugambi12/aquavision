import React, { useEffect } from "react";
import Modal from "react-modal";
import "./ModalWrapper.css";

Modal.setAppElement("#root");

const ModalWrapper = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`modal-wrapper ${isOpen ? "open" : ""}`}
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}>
          <span className="material-symbols-rounded">close</span>
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
