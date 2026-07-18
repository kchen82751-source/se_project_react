import "./ItemModal.css";
import closeicon from "../../assets/x.png";

function ItemModal({ activeModal, onClose, onCardDelete, card }) {
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img alt="Close" src={closeicon} />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <button
              onClick={handleDeleteClick}
              type="button"
              className="modal__delete"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__caption">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
