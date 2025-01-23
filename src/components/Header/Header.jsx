import "./Header.css";
import logo from "../../images/header/logo.svg";
import avatar from "../../images/header/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwtich";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="header-logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__nav">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>

        <Link to="/profile" className="header__link">
          <div className="header__user-container" /* change header__profile */>
            <p className="header__username">Terrence Tegegne</p>
            <img
              className="header__avatar"
              src={avatar}
              alt="Terrence Tegegne"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
