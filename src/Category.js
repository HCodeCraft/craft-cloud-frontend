import React from "react";
import { Link } from "react-router-dom";

const Category = ({ name, image, description, id}) => {

  return (
    <div className="card-container">
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{name}</h3>
          <br />
        </div>
        <div className="card-body">
          <p> {description}</p>
          <br />
        </div>
        <br />

        <div className="btn">
          <Link
            to={`/categories/${id}`}>
            <button>Show Craft Projects</button>
          </Link>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Category;
