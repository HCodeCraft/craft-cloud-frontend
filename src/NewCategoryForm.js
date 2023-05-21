import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const NewCategoryForm = ({onAddCategory}) => {
  const [category, setCategory] = useState({
    name: "",
    image: "",
    description: ""
  });

  const navigate = useNavigate();



        const handleChange = (e) => {
          setCategory({
            ...category,
            [e.target.name]: e.target.value,
          });
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          const newCategory = {
            name: category.name,
            image: category.image,
            description: category.description
          };


          fetch("http://localhost:9292/categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
          })
            .then((responses) => {
              return Promise.all(responses.map(r => r.json()))
            })
            .then((data) => {
            onAddCategory
            //  showAllYarns();
            console.log("Form submit data", data)
              // navigate("/categories");
            });
        };

        return (
          <div className="yarnform">
            <br />
            <div className='title'>
            <h1>Add a Category</h1>
            </div>
            <br/>
            <img src='https://cdn.shopify.com/s/files/1/0076/6944/8767/products/Live_Love_Craft_SVG_example_by_Jennifer_Carroll_Designs-3279_394x.jpg?v=1569076212'/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
              <label>Category Name:</label>
              <input name="name" onChange={handleChange} type="text" /> <br />
              <br />
              <label>Image url:</label>
              <input name="image" onChange={handleChange} type="text" /> <br />
              <br />
              <label>Description:</label>
              <input name="description" onChange={handleChange} type="text" />{" "}
              <br />
              <br />
              
              <input type="submit" />
            </form>
          </div>
        );

};

export default NewCategoryForm