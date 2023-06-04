import React from "react";
import { Link } from "react-router-dom";

const CraftCard = ({ craft }) => {
  let hearts =
    craft.difficulty === "easy"
      ? (hearts = <span role="img" alt="green heart">💚</span>)
      : craft.difficulty === "medium"
      ? (hearts = <span role="img" alt="two orange hearts">🧡🧡</span>)
      : (hearts = <span role="img" alt="three red hearts">❤️❤️❤️</span>);

  return (
    <div className="card-container">
      <div className="image-container">
        <img src={craft.image} alt=""/>
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{craft.name}</h3>
          <br />
        </div>
        <div className="card-body">
          <p>{hearts}</p>
          <br />
          <p>{craft.description}</p>
        </div>
        <br />
        <p>{craft.notes}</p>

        <div className="btn">
          <Link to={`crafts/${craft.id}`}>
            <button>Show More</button>
          </Link>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default CraftCard;
