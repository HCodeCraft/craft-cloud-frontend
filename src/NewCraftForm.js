import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewCraftForm = ({ categories, onAddCategory}) => {
  const params = useParams();
  const navigate = useNavigate()
  const selectedCategory = categories.find((c) => c.id == params.id);

  const [craft, setCraft] = useState({
    name: "",
    image: "",
    difficulty: "",
    description: "",
    notes: "",
    link:"",
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
      category_id: params.id
    };

    fetch(`http://localhost:9292/categories/${selectedCategory.id}/crafts`, {
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
        onAddCategory(selectedCategory)
        navigate(`/categories/${params.id}`);
      });
  };

  return (
    <div className="yarnform">
      <br />
      <div className="title">
        <h1>Add a {selectedCategory.name} Craft</h1>
      </div>
      <br />
      <img className='craftformpic' src={selectedCategory.image} />
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
        <option value="">    </option>
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
        <br/>
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewCraftForm;
