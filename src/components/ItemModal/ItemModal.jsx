import "./ItemModal.css";
import closeIcon from "../../assets/x.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, onCardDelete, card }) {
  const handleDeleteClick = () => {
    onCardDelete(card);

    const currentUser = useContext(CurrentUserContext);
    const isOwn = selectedCard.owner === currentUser._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src="src/assets/x button.png" alt=""></img>
          <img alt="Close" src={closeIcon} />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__elements">
            <p className="modal__caption">{card.name}</p>
            {currentUser && (
              <button
                onClick={handleDeleteClick}
                type="button"
                className="modal__delete"
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="modal__caption">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
