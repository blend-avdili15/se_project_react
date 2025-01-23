import React from "react";
import avatar from "../../images/header/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
