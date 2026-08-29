import "./ItemModal.css";
import closeIcon from "../../assets/x.png";

function ItemModal({ activeModal, onClose, onCardDelete, card }) {
  const handleDeleteClick = () => {
    onCardDelete(card);

    const isOwn = selectedCard.owner === currentUser._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img alt="Close" src={closeicon} />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__elements">
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
