import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onSignIn, isOpen, onClose, secondaryButtonAction }) => {
  const defaultValue = {
    email: "",
    password: "",
  };
  const { values, handleChange } = useForm(defaultValue);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignIn(values);
  }

  return (
    <ModalWithForm
      title="Log In"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      secondButton="or Sign Up"
      secondaryButtonAction={secondaryButtonAction}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="user info"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
