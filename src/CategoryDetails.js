import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import CraftCard from "./CraftCard";

const CategoryDetails = ({ categories, onRemoveCategory}) => {
  let { id } = useParams();
  const navigate = useNavigate();
 const numId = parseInt(id);
  const location = useLocation();
  const editUrl = location.pathname + "/edit";

  const [category, setCategory] = useState({
    name: "",
    image: "",
    description: "",
    crafts: [],
  });





  useEffect(() => {

    const cat = categories.find((c) => c.id == numId);
    if (cat) {
      setCategory(cat);
    }}, [categories]);




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
        {category.crafts.map((craft) => (
              <CraftCard key={craft.id} craft={craft} category={category} />
            ))}

        <br />
        <br />
        <div className={'detailbox'}>
          <h4>Difficulty:</h4>
          <p> 💚 Easy,</p><p>🧡🧡 Medium,</p> <p>❤️❤️❤️ Hard </p>
          <div className="btn" id="newbtn">
            <Link to={`new`}>
              <button className="btn" id="projectbtn">Add a {category.name} Craft</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategoryDetails;