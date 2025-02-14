import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onCardClick,
  clothingItems,
  onDeleteItem,
  handleAddClick,
  handleEditProfile,
  handleSignOut,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar name={currentUser?.name} avatar={currentUser?.avatar} />
        <button onClick={handleEditProfile} className="profile__edit-button">
          Change profile data
        </button>
        <button onClick={handleSignOut} className="profile__signout-button">
          Log out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={userClothingItems} // clothingItems={userClothingItems}
          onDeleteItem={onDeleteItem}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
