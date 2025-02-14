import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, onSignUp, isOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ name: "", avatar: "", email: "", password: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(formData)
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *{" "}
        <input
          type="email"
          name="email"
          className="modal__input modal__input_type_register_email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-email-error" />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password *{" "}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_type_register_password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-password-error" />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          placeholder="Name"
          className="modal__input modal__input_type_register_name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-name-error" />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL *{" "}
        <input
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          className="modal__input modal__input_type_register_avatar"
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="register-avatar-error" />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
