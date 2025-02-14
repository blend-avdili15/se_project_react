import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { signIn, signUp, checkToken } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../utils/Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  removeCardLike,
  addCardLike,
} from "../../utils/api";
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleDeleteClick = () => setActiveModal("delete-modal");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => {
    console.log("are we attempting to close the modal");
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        throw err;
      });
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");

    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    return signUp({ name, avatar, email, password })
      .then(() => {
        handleSignIn({ email, password });
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Signup error:", err);
        throw err;
      });
  };

  const handleSignIn = ({ email, password }) => {
    return signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return checkToken(data.token);
      })
      .then((user) => {
        console.log(user);
        setCurrentUser(user);
        return getItems();
      })
      .then((items) => {
        console.log(items);
        setClothingItems(items);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    return updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          return getItems();
        })
        .then((items) => {
          setClothingItems(items);
        })
        .catch(() => {
          console.error("Invalid token, logging out...");
          handleSignOut();
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onDeleteItem={handleDeleteItem}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onDelete={handleDeleteItem}
                      handleAddClick={handleAddClick}
                      handleEditProfile={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <Main />
                  )
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteClick}
          />
          <DeleteCardModal
            isOpen={activeModal === "delete-modal"}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSignUp={handleSignUp}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSignIn={handleSignIn}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
