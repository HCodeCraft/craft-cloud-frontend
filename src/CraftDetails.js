import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const CraftDetails = ({ categories, onDeleteCraft }) => {
  const params = useParams();
  const navigate = useNavigate();
 

  const [craft, setCraft] = useState({
    name: "",
    image: "",
    difficulty: "",
    description: "",
    notes: "",
    link: "",
    completed: false,
  });

  let hearts;
  let id;

  useEffect(() => {
    const category = categories.find((c) => c.id == params.category_id);

    if (category) {
      const selectedCraft = category.crafts.find((c) => c.id == params.id);

      setCraft(selectedCraft);
    }
  }, [categories]);


  hearts =
    craft.difficulty === "easy"
      ? (hearts = "💚")
      : craft.difficulty === "medium"
      ? (hearts = "🧡🧡")
      : (hearts = "❤️❤️❤️");

  const handleDelete = (id) => {
    fetch(`http://localhost:9292/crafts/${craft.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteCraft(craft);
      navigate(`/categories/${params.category_id}`);
    });
  };

  console.log("craft.completed", craft.completed);

  console.log("hearts", hearts);

  return (
    <div>
      <h1 className="title">{craft.name}</h1>
      <div className="content">
        <img id="yarnpic" src={craft.image} alt="category" />
      </div>

      <br />
      <div id="craftdetailbox" className="text">
        <h3>{hearts}</h3>
        <br />
        <h3>Completed: {craft.completed === true ? "Yes 🎉" : "No"}</h3>
        <br />
        <p> {craft.description}</p>
        <br />
        <p>Notes: {craft.notes}</p>
        <br />
        <Link to={craft.link} className="text">
          Directions/Reference
        </Link>
        <br />
        <div>
          <div className="sidebtn, btn">
            <button onClick={() => navigate(`edit`)}>Edit Craft</button>

            <button onClick={() => handleDelete(id)}>Delete Craft</button>
          </div>
        </div>

        <div className="text"></div>
        <br />
        <br />
      </div>
      <div className="text">
        <h4>Difficulty:</h4>
        <p> 💚 Easy,</p>
        <p>🧡🧡 Medium,</p> <p>❤️❤️❤️ Hard </p>
      </div>
    </div>
  );
};

export default CraftDetails;
