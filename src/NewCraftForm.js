import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewCraftForm = ({ categories, onAddCraft, crafts }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    image: "",
    description: "",
  });

  useEffect(() => {

    const cat = categories.find((c) => c.id == params.id);

    if (cat) {
      setCategory(cat);
    }}
  , [categories, category, crafts]);

  const [craft, setCraft] = useState({
    name: "",
    image: "",
    difficulty: "",
    description: "",
    notes: "",
    link: "",
    completed: false,
  });

  const handleChange = (e) => {
    setCraft({
      ...craft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCraft = {
      name: craft.name,
      image: craft.image,
      difficulty: craft.difficulty,
      description: craft.description,
      notes: craft.notes,
      completed: false,
      link: craft.link,
      category_id: params.id,
    };

    fetch(`http://localhost:9292/categories/${category.id}/crafts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCraft),
    })
      .then((res) => res.json())
      .then((data) => {
        //   onAddCraft()
        console.log("New Craft data", data);
        onAddCraft(data);
        console.log("crafts", crafts)
        navigate(`/categories/${params.id}`);
      });
  };

  return (
    <div className="yarnform">
      <br />
      <div className="title">
        <h1>Add a {category.name} Craft</h1>
      </div>
      <br />
      <img className="craftformpic" src={category.image} />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Craft Name:</label>
        <input name="name" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Image url:</label>
        <input name="image" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Difficulty:</label>
        <select onChange={handleChange} name="difficulty">
          <option value=""> </option>
          <option value="easy">Easy 💚 </option>
          <option value="medium">Medium 🧡🧡</option>
          <option value="hard">Hard ❤️❤️❤️</option>
        </select>
        <br />
        <br />
        <label>Description:</label>
        <textarea
          rows={5}
          cols={20}
          name="description"
          onChange={handleChange}
          type="text"
        />
        <br />
        <br />
        <label>Notes:</label>
        <textarea
          rows={5}
          cols={20}
          name="notes"
          onChange={handleChange}
          type="text"
        />
        <br />
        <br />
        <label>Link:</label>
        <input name="link" onChange={handleChange} type="text" />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewCraftForm;
