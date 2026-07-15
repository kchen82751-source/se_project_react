import "./ModalWithForm.css";
import closeicon from "../../assets/x.png";

function ModalWithForm({
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  onClose,
  isOpen,
  children,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img alt="x.png" src={closeicon} />
        </button>
        <form onSubmit={onSubmit} className="modal__form name={name}">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
