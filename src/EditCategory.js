import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = ({ categories, onEditCategory }) => {
  const params = useParams();
  const selectedCategory = categories.find((c) => c.id == params.id);

  let navigate = useNavigate();

  const [category, setCategory] = useState({
    name: selectedCategory.name,
    image: selectedCategory.image,
    description: selectedCategory.description,
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCategory = {
      name: category.name,
      image: category.image,
      description: category.description,
    };

    fetch(`http://localhost:9292/categories/${selectedCategory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        onEditCategory(data)
    
        setCategory({
            name: "",
            image: "",
            description: "",
            crafts:[]
          })
        console.log("Form submit data", data);
        navigate(`/categories/${selectedCategory.id}`);
      });
  };

  return (
    <div className="yarnform">
      <br />
      <div className="title">
        <h1>Edit the {selectedCategory.name} Category</h1>
      </div>
      <br />
      <img className='craftformpic' src={selectedCategory.image} />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          value={category.name}
        />{" "}
        <br />
        <br />
        <label>Image url:</label>
        <input
          name="image"
          onChange={handleChange}
          type="text"
          value={category.image}
        />{" "}
        <br />
        <br />
        <label>Description:</label>
        <textarea
          rows={5}
          cols={20}
          name="description"
          onChange={handleChange}
          value={category.description}
        />{" "}
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditCategory;
