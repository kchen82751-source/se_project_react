import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Text</p>
        <button onClick={handleAddClick}>+ Add</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems &&
          clothingItems?.map(
            (item) =>
              currentUser &&
              item?.owner === currentUser.currentUser._id && (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              ),
          )}
      </ul>
    </div>
  );
}
