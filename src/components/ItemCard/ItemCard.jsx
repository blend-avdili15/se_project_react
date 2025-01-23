import "../ItemCard/ItemCard.css";

function ItemCard({ item, onCardClick, onDelete }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        onClick={() => onDelete(item._id)}
        className="card__delete-button"
      >
        Delete item
      </button>
    </li>
  );
}

export default ItemCard;
