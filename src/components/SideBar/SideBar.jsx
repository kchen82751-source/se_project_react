import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser.avatar}
          alt="Terrence Tegegne"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
        <button>Edit profile</button>
        <button onClick={onSignOut}>Log out</button>
      </div>
    </aside>
  );
}
