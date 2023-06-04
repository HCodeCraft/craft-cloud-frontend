import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCraft = ({ categories, onEditCraft }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = parseInt(params.id);

const [clicked, setClicked] = useState(false)

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
    link: "",
    completed: false
  });



  useEffect(() => {
    const cat = categories.find((c) => c.id == params.category_id);

    if (cat) {
      setCategory(cat);

      const selectedCraft = category.crafts.find((c) => c.id == params.id);
      if (selectedCraft) {
        setCraft(selectedCraft);
      }
    }
  }, [categories, category]);


  const handleChange = (e) => {
    const value = e.target.type === "radio" ? e.target.checked : e.target.value
    setCraft({
      ...craft,
      [e.target.name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCraft = {
      name: craft.name,
      image: craft.image,
      difficulty: craft.difficulty,
      description: craft.description,
      notes: craft.notes,
      completed: clicked,
      link: craft.link,
      category_id: parseInt(params.category_id),
    };

    fetch(`http://localhost:9292/crafts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( (editedCraft)),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/categories/${editedCraft.category_id}`);
        onEditCraft(data)
        setCraft({name: "",
        image: "",
        difficulty: "",
        description: "",
        notes: "",
        link: "",
        completed: false})
      });
  };

  return (
    <div className="craftform">
      <br />
      <div className="title">
        <h1>Edit {craft.name}</h1>
      </div>
      <br />
      <img className="craftformpic" src={craft.image} />
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
        />
        <br />
        <br />
        <label>Link:</label>
        <input
          name="link"
          onChange={handleChange}
          type="text"
          value={craft.link}
        />
        <br />
        <br/>
        <label>Description:</label>
        <textarea
          rows={5}
          cols={20}
          name="description"
          onChange={handleChange}
          value={craft.description}
        />
        <br />
        <br />
        <label>Difficulty:</label>
        <select onChange={handleChange} name="difficulty" value={craft.difficulty}>
            <option value="">    </option>
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
          value={craft.notes}
        />
        <br />
        <br/>
        <label>Completed</label>
        <input type="radio" value={craft.completed} onChange={handleChange} onClick={() => setClicked(!clicked)} name="completed" checked={clicked}></input>
        <br/>
        <br/>
        <input type="submit" />
        <br/>
        <br/>
      </form>
    </div>
  );
};

export default EditCraft;
