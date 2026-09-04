import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function SideBar({ onSignOut, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser.avatar}
          alt="Terrence Tegegne"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <button onClick={onEditProfile} className="sidebar__user-edit">
        Change profile data
      </button>

      <button onClick={onSignOut} className="sidebar__log-out">
        Log out
      </button>
    </aside>
  );
}
