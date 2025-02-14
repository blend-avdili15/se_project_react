import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../utils/Contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // const itemLikeButtonClassName = `card__like-button ${
  //   isLiked ? "card__like-button_active" : ""
  // }`;

  const itemLikeButtonClassName = `card__like-button`;
  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {currentUser && (
        <button
          onClick={handleLike}
          //className="card__like-button"
          className={itemLikeButtonClassName}
          aria-label="Like"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
