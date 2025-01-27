import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAddItemModalSubmit({ name, imageUrl, weather });
  //   setName("");
  //   setImageUrl("");
  //   setWeather("");
  //   // this.form.reset;
  //   // this._form.reset();
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Call the submission function and reset only on success
  //   onAddItemModalSubmit({ name, imageUrl, weather })
  //     .then(() => {
  //       setName("");
  //       setImageUrl("");
  //       setWeather("");
  //       onClose(); // Close the modal after resetting
  //     })
  //     .catch((err) => {
  //       console.error(err); // Handle the error
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    onAddItemModalSubmit({ name, imageUrl, weather })
      .then(() => {
        setName("");
        setImageUrl("");
        setWeather("");
        onClose(); // Close the modal only after a successful submission
      })
      .catch((err) => {
        console.error(err); // Log the error
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submitting state
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      // buttonText="Add garment"
      buttonText={isSubmitting ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="clothing-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card-name"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
          disabled={isSubmitting}
        />
        <span className="modal__error" id="place-name-error" />
      </label>
      <label htmlFor="clothing-link" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className="modal__input modal__input_type_url"
          id="clothing-link"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
          disabled={isSubmitting}
        />
        <span className="modal__error" id="place-image-error" />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
            disabled={isSubmitting}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
            disabled={isSubmitting}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
            disabled={isSubmitting}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
