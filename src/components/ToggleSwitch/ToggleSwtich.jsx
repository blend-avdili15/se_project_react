import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperaturUnitContext } from "../Contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  //   const [currentTemperaturUnit, handleToggleSwitchChange] = useState("C");

  //   const handleChange = (e) => {
  //     if (currentTemperaturUnit === "C") handleToggleSwitchChange("F");
  //     if (currentTemperaturUnit === "F") handleToggleSwitchChange("C");
  //   };

  const { currentTemperaturUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperaturUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperaturUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperaturUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperaturUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
