import React from "react";
import "./DeleteCardModal.css";

function DeleteCardModal({ isOpen, onClose, onDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete-card-modal">
        <div className="delete-card__container">
          <p className="delete-card-header">
            Are you sure you want to delete this item?
          </p>
          <p className="delete-card-confirmation">
            This action will be irreversible.
          </p>
          <button onClick={onClose} className="modal__close"></button>
        </div>
        <div className="delete-card-modal-buttons">
          <button onClick={onDelete} className="delete-card-modal-yes">
            Yes, delete item
          </button>
          <button onClick={onClose} className="delete-card-modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCardModal;
