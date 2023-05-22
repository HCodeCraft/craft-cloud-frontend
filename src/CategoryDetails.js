import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import CraftCard from "./CraftCard";

const CategoryDetails = ({ categories, onDeleteCategory }) => {
  const { id } = useParams();
  const location = useLocation();
  const editUrl = location.pathname + "/edit";
  const newCraftUrl = location.pathname + "/new";
  const category = categories.find((c) => c.id == id);

const [craftData, setCraftData] = useState([])

useEffect(() => {
  let crafts;
  if (category.crafts !== undefined) {
    crafts = category.crafts;
  } else {
    crafts = null;
  }
  setCraftData(crafts);
}, [craftData]);



  const handleDeleteClick = () => {
    fetch(`http://localhost:9292/categories/${id}`, {
      method: "DELETE",
    });
    onDeleteCategory(id);
  };
console.log("category", category)
console.log("category.crafts", category.crafts)

  return category != undefined ? (
    <div>
      <h1 className="title">{category.name}</h1>
      <div className="content">
        <img id="yarnpic" src={category.image} alt="category" />
      </div>
      <div>
        <br />
        <div className="text">
          <h4> {category.description}</h4>
          <br />
          <div className="sidebtn, btn">
            <Link to={editUrl}>
              <button>Edit Category</button>
            </Link>
            <button onClick={() => handleDeleteClick(id)}>
              Delete Category
            </button>
          </div>
        </div>
        <div className="text">
          <h2>{category.name} Projects</h2>
        </div>
        {craftData != '[]' ? category.crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} category={category} />
        )) : <h2>Loading Crafts...</h2>}

        <br />
        <br />
      </div>
      <div>
        <h4>Difficulty:</h4>
        <p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p>
        <div className="btn" id="projectbtn">
          <Link to={newCraftUrl}>
            <button>Add a {category.name} Craft</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
      <br />
      <br />
      <h1>Loading.... this is CategoryDetails</h1>
      <br />
    </>
  );
};

export default CategoryDetails;
