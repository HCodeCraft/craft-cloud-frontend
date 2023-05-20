import React from "react";
import { NavLink } from "react-router-dom";
import Banner from "./cloudban.jpg";
import Categories from "./Categories";
import NewCategoryForm from "./NewCategoryForm";

const linkStyles = {
  display: "inline-block",
  justify: "center",
  width: "130px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "#FFD966",
  textDecoration: "none",
  color: "black",
};

function NavBar() {
  return (
    <div className="top">
      <div className="banner">
        <img src={Banner} alt="Craft Cloud Banner" />
        <br />
        <br />
      </div>
      <br />
      <div className="links">
        <NavLink
          to="/"
          style={linkStyles}
          activestyle={{
            background: "darkblue",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/categories"
          style={linkStyles}
          activestyle={{
            background: "darkblue",
          }}
        >
          Categories
        </NavLink>

        <NavLink
          to="/categories/new"
          style={linkStyles}
          activestyle={{
            background: "darkblue",
          }}
        >
          New Category
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
