import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

const CraftDetails = ({ categories, onDeleteCraft }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();


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
    let hearts =
      craft.difficulty === "easy"
        ? (hearts = "💚")
        : craft.difficulty === "medium"
        ? (hearts = "🧡🧡")
        : (hearts = "❤️❤️❤️");

    let id = category.id;

    setCraft(selectedCraft);
 } }, [categories]);

 console.log("craft", craft)
 console.log("craft.link", craft.link)


  const handleDelete = (id) => {
    fetch(`http://localhost:9292/crafts/${craft.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteCraft(craft);
      navigate(`/categories/${params.category_id}`);
    });
  };

  return (
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
            <button onClick={() => navigate(`edit`)}>Edit Craft</button>

            <button onClick={() => handleDelete(id)}>Delete Craft</button>
          </div>
        </div>

        <div className="text"></div>
        <br />
        <br />
      </div>
      <h4>Difficulty:</h4>
      <p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p>
    </div>
  );
};

export default CraftDetails;
