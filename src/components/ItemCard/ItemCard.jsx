import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      {/* TODO - Make image appear again in preview modal */}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__title-and-like">
        <p className="card__title">{item.name}</p>
      </div>
    </li>
  );
}

export default ItemCard;
