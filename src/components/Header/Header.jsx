import "./Header.css";
import logo from "../../images/header/logo.svg";
import avatarPlaceholder from "../../images/header/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwtich";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function Header({
  isLoggedIn,
  onSignOut,
  handleRegisterClick,
  handleLoginClick,
  handleAddClick,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);

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
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add Clothes
          </button>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__profile">
              <p className="header__username">{currentUser?.name}</p>
              <img
                className="header__avatar"
                src={currentUser?.avatar || avatarPlaceholder}
                alt="Terrence Tegegne"
              />
            </div>
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleRegisterClick}
              className="header__auth-button"
            >
              Sign Up
            </button>
            <button onClick={handleLoginClick} className="header__auth-button">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
