import "./ModalWithForm.css";
import closeIcon from "../../assets/x.png";

function ModalWithForm({
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  onClose,
  isOpen,
  children,
  onSubmit,
  secondButton,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src="src/assets/x button.png" alt=""></img>
          <img alt="Close" src={closeIcon} />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          <button type="button" className="modal__submit">
            {secondButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
