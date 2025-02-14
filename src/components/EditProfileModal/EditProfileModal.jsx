import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../utils/Contexts/CurrentUserContext";
// import EditProfileModal.css from "../EditProfileModal.css";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData).then(onClose).catch(console.error);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      id="edit-profile-submit-button"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          placeholder="Name"
          className="modal__input modal__input_type_profile_name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="profile-name-error" />
      </label>

      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar *{" "}
        <input
          name="avatar"
          placeholder="Avatar URL"
          className="modal__input modal__input_type_profile_avatar"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="profile-avatar-error" />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
