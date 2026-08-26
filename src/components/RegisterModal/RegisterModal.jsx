import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onSignUp, isOpen, onClose }) => {
  const defaultValue = {
    name: "",
    password: "",
    email: "",
    avatar: "",
  };
  const { values, handleChange } = useForm(defaultValue);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignUp(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          value={values.name}
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
        Avatar{" "}
        <input
          type="profile info"
          name="avatar"
          className="modal__input"
          id="register-profile"
          placeholder="Avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
