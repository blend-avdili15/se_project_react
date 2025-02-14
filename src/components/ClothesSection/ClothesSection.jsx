import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../../utils/Contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter((item) => {
    console.log("is this mine bro?", item.owner === currentUser?._id);
    return item.owner === currentUser?._id;
  });

  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section-headline">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__section-button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
