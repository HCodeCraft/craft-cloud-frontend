import React from "react";
import { Link } from "react-router-dom";

/// Craft's keys: name, image, difficulty, description, notes, category_id, completed

const Craft = ({ id, name, image, difficulty, description}) => {
  // const yarn = context.yarnsState.find((y) => y.id === props.id);

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
          <p>Difficulty: {difficulty}</p>
          <br />
          <p>{description}</p>
        </div>
        <br />

        <div className="btn">
          {/* <Link to={`${yarn.id}`}>
                 <button>Show notes/plans</button>
                </Link> */}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Craft;
