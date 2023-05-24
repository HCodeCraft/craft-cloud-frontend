import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCraft = ({ categories }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  console.log("params", params)

  const [category, setCategory] = useState({
    name: "",
    image: "",
    description: "",
    crafts: [],
  });

  const [craft, setCraft] = useState({
    name: "",
    image: "",
    difficulty: "",
    description: "",
    notes: "",
    link:"",
    completed: false,
  });


  useEffect(() => {
    const cat = categories.find((c) => c.id == params.category_id);
    if (cat) {
        console.log("cat", cat)
      setCategory(cat);
    }
  }, [categories]);

  useEffect(() => {
    if (categories) {
    
    const selectedCraft = category.crafts.find((c) => c.id == id);
    debugger
    console.log(selectedCraft)
    setCraft(selectedCraft) }
  }, [categories, craft])

  const handleChange = (e) => {
    setCraft({
      ...craft,
      [e.target.name]: e.target.value,
    });
  };

  console.log("craft", craft)

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCraft = {
      name: craft.name,
      image: craft.image,
      difficulty: craft.difficulty,
      description: craft.description,
      notes: craft.notes,
      completed: false,
      category_id: params.id,
    };

    fetch(`http://localhost:9292/crafts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editedCraft }),
    })
      .then((res) => res.json())
      .then((data) => {
        //  showAllYarns();
        console.log("Craft form submit data", data);
        navigate(`/categories/${id}`);
      });
  };

  return (
    <div className="yarnform">
      <br />
      <div className="title">
        <h1>Edit {craft.name}</h1>
      </div>
      <br />
      <img src={craft.image} />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Craft Name:</h4>
        </label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          value={craft.name}
        />
        <br />
        <br />
        <label>Image url:</label>
        <input
          name="image"
          onChange={handleChange}
          type="text"
          value={craft.image}
        />{" "}
        <br />
        <br />
        <label>Description:</label>
        <textarea
          rows={5}
          cols={20}
          name="description"
          onChange={handleChange}
          value={craft.description}
        />{" "}
        <br />
        <br />
        <label>Difficulty:</label>
        <select onChange={handleChange} name="difficulty">
          <option value="easy">Easy 💚 </option>
          <option value="medium">Medium 🧡🧡</option>
          <option value="hard">Hard ❤️❤️❤️</option>
        </select>
        <br />
        <br />
        <label>Notes:</label>
        <textarea
          rows={5}
          cols={20}
          name="notes"
          onChange={handleChange}
          type="text"
        />{" "}
        <label>Completed</label>
        <input type="radio" value={craft.completed}></input>
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditCraft;
