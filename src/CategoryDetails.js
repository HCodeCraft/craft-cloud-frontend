import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import CraftCard from "./CraftCard";

const CategoryDetails = ({ categories, onRemoveCategory }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  id = parseInt(id);
  const location = useLocation();
  const editUrl = location.pathname + "/edit";
  const newCraftUrl = location.pathname + "/new";
  // const category = categories.find((c) => c.id == id);


  const [category, setCategory] = useState({
    name: "",
    image: "",
    description: "",
    crafts: [],
  });

  const myData = {
    foo:"bar"
  }
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {
    const cat = categories.find((c) => c.id == id);
    if (cat) {
      setCategory(cat);
      const selectedCrafts = category.crafts;
      if (selectedCrafts) {
        setCrafts(selectedCrafts);
      }
    }
  }, [categories, category]);

  const handleDeleteClick = (deletedCategory) => {
    console.log("id from in handledeleteclick", deletedCategory.id);
    fetch(`http://localhost:9292/categories/${deletedCategory.id}`, {
      method: "DELETE",
    })
      .then(() => onRemoveCategory(deletedCategory))
      .then(navigate("/categories"));
  };

  return category ? (
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
            <button onClick={() => handleDeleteClick(category)}>
              Delete Category
            </button>
          </div>
        </div>
        <div className="text">
          <h2>{category.name} Projects</h2>
        </div>
        {/* </div> used to be category.crafts */}
        {category.crafts !== "{}"
          ? crafts.map((craft) => (
              <CraftCard key={craft.id} craft={craft} category={category} />
            ))
          : null}

        <br />
        <br />
        <div>
          <h4>Difficulty:</h4>
          <p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p>
          <div className="btn" id="projectbtn">
            <Link to={newCraftUrl} state={myData}>
              <button>Add a {category.name} Craft</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategoryDetails;