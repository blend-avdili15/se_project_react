import React from "react";
import avatarPlaceHolder from "../../images/header/avatar.svg";
// import avatarPlaceHolder from "../../images/header/avatar.svg";
import "./SideBar.css";

function SideBar({ name, avatar }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={avatar || avatarPlaceHolder}
        alt="sidebar-avatar"
      />
      <p className="sidebar__username">{name || "User"}</p>
    </div>
  );
}

export default SideBar;
