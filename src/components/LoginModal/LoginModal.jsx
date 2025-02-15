import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useModalClose from "../../utils/useModalClose";

function LoginModal({ onClose, onSignIn, isOpen, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(formData)
      .then(() => onClose())
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="modal__input modal__input_type_email"
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="place-email-error" />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="modal__input modal__input_type_password"
          onChange={handleChange}
          required
        />
        <span className="modal__error" id="place-password-error"></span>
      </label>

      <div className="modal__button-container">
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToRegister}
        >
          Or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
