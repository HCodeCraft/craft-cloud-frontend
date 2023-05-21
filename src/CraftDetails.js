import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CraftDetails = ({ categories }) => {
  console.log("categories", categories);

  const params = useParams();

  const category = categories.find((c) => c.id == params.id);

  const craft = category.crafts.find((c) => c.id == params["*"]);

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
          const updatedYarns = context.yarnsState.filter((y) => y.id != id);
          context.setYarnsState(updatedYarns);
          navigate("/category");
        });
      };

  return craft != undefined ? (
    <div>
      <h1 className="title">{craft.name}</h1>
      <div classname="content">
        <img id="yarnpic" src={craft.image} alt="category" />
      </div>
      <div>
        <br />
        <div className="text, craftdetailbox">
          <h3>{hearts}</h3>
          <h3>Completed: {craft.completed === "true" ? "Yes" : "No"}</h3>
          <h3> {craft.description}</h3>
          <h3>{craft.notes}</h3>
          <Link to={craft.link} className="text">
            Directions/Reference
          </Link>
          <br />
          <div className="sidebtn, btn">
            <button>Edit Craft</button>
            <button onClick={() => handleDelete(id)}>Delete Craft</button>
          </div>
        </div>

        <div className="text">
          {/* <button onClick={() => handleDelete(id)}>Delete Category</button> */}
        </div>
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
