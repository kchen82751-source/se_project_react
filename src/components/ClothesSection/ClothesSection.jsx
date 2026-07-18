import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Text</p>
        <button onClick={handleAddClick}>+ Add</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((filteredCard) => {
          return (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
