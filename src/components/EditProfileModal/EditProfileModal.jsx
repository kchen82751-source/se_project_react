import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ onEditProfile, isOpen, onClose }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const defaultValue = {
    name: "",
    avatar: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValue);
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);
  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values);
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label">
        Name *
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
        Avatar URL *{" "}
        <input
          type="url"
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

export default EditProfileModal;
