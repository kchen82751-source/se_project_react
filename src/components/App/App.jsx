import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, getItems, removeItem } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import { getUserInfo, signin, signup } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "clouds",
    isDay: false,
  });
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValue) => {
    // call the fetch function
    // .then((data) => {}) includes all the stuff below

    const newCardData = {
      name: inputValue.name,
      imageUrl: inputValue.imageUrl,
      weather: inputValue.weatherType,
    };

    const token = localStorage.getItem("jwt");

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);

    // Don't use newCardData
    // The ID will be inclded in the response data
    // .catch()
  };

  const handleAddClick = () => {
    const token = localStorage.getItem("jwt");
    addItem({});
    setActiveModal("add-garment");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("loggedin");
  };

  // const weatherData = (data) => {
  //   const token = localStorage.getItem("jwt");
  //   setWeatherData([data, ...clothingItems]);
  //     .then((token) => {
  //       localStorage.setItem("jwt", token);
  //     })
  //     .catch(console.error);
  // };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setisLoggedIn(false);
    history.push("/");
    isLoggedIn(false);
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem("jwt");
    removeItem(card._id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== card._id),
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handlesignin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onSignupActiveModal = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then(() => {
        handlesignin({ email, password });
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        // TODO - make new items appear first
        // HINT - lookup how to reverse an array in JS
        setClothingItems(data);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");

    if (token) {
      getUserInfo().then((user) => {
        setCurrentUser(user);
        setisLoggedIn(true);
      });
    }
  }, []);

  // TODO 1
  // - Add a delete button to the preview modal
  // - Declare a handler in App.jsx (deleteItemHandler)
  // - Pass handler to preview modal
  // - Inside preview modal, pass the ID as an argument to the handler (use the handler pattern found in ItemCard)
  // Inside the handler
  // - call removeItem function, pass it the ID
  // - in the .then() remove the item from the array
  // - how? filter it
  /*const deleteBtn = document.getElementById("deleteBtn");
  const modal = document.getElementById("modal");

  deleteBtn.addEventListener("click", async () => {
    const itemId = modal.getAttribute("data-item-id");

    // Confirm action
    if (confirm("Are you sure you want to delete this item?")) {
      // Call your delete function here
      // await deleteItem(itemId);

      // Hide modal after deletion
      modal.style.display = "none";
    }
  });*/

  // TODO 2
  // Add an if statement to check if the ModalWithForm secondary button needs to be displayed
  // Check the Add items modal to see if it trying to POST immediately on open. It should not
  // It seems your owner ID is different from the the actual ID of the user

  function ModalWithForm({
    isOpen,
    title,
    secondaryButtonText,
    onSecondaryClick,
    children,
  }) {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {/* If statement / conditional rendering for secondary button */}
          {secondaryButtonText && (
            <button type="button" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </button>
          )}
          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegister={handleRegister}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <RegisterModal
            onSignUp={onSignupActiveModal}
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
          />
          <LoginModal
            onSignIn={handlesignin}
            isOpen={activeModal === "loggedin"}
            onClose={closeActiveModal}
          />
          <ItemModal
            onCardDelete={handleCardDelete}
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
