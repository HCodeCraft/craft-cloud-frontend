import React from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

const CraftDetails = ({ categories }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editUrl = location.pathname + "/edit";

  const category = categories.find((c) => c.id == params.id);

  const craft = category.crafts.find((c) => c.id == params["*"]);

  const id = category.id;

  let hearts;

  hearts =
    craft !== undefined
      ? craft.difficulty === "easy"
        ? (hearts = "💚")
        : craft.difficulty === "medium"
        ? (hearts = "🧡🧡")
        : (hearts = "❤️❤️❤️")
      : null;

  const handleDelete = (id) => {
    fetch(`http://localhost:9292/crafts/${id}`, {
      method: "DELETE",
    }).then(() => {
      handleDelete(id);
      navigate("/category");
    });
  };

  return craft != undefined ? (
    <div>
      <h1 className="title">{craft.name}</h1>
      <div className="content">
        <img id="yarnpic" src={craft.image} alt="category" />
      </div>
      <div>
        <br />
        <div className="text, craftdetailbox">
          <h3>{hearts}</h3>
          <br />
          <h3>Completed: {craft.completed === "true" ? "Yes" : "No"}</h3>
          <br />
          <p> {craft.description}</p>
          <br />
          <p>Notes: {craft.notes}</p>
          <br />
          <Link to={craft.link} className="text">
            Directions/Reference
          </Link>
          <br />
          <div className="sidebtn, btn">
            <Link to={editUrl}>
              <button>Edit Craft</button>
            </Link>
            <button onClick={() => handleDelete(id)}>Delete Craft</button>
          </div>
        </div>

        <div className="text"></div>
        <br />
        <br />
      </div>{" "}
      <h4>Difficulty:</h4>
      <p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p>
    </div>
  ) : (
    <>
      <br />
      <br />
      <br />
      <h1 className="title">Loading...</h1>
    </>
  );
};

export default CraftDetails;
