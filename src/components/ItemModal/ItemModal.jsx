import "./ItemModal.css";
import useModalClose from "../../utils/useModalClose";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const isOpen = activeModal === "preview";
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close" />
        <img src={card.imageUrl} alt="card-image" className="modal__image" />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            onClick={() => onDelete(card._id)}
            className="card__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
