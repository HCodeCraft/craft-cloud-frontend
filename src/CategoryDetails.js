import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CraftCard from './CraftCard'

const CategoryDetails = ({ categories }) => {
  console.log("categories", categories);

  const { id } = useParams();
  const category = categories.find((c) => c.id == id);

  console.log("category", category)

  

  return category != undefined ? (
    <div>
      <h1 className="title">{category.name}</h1>
      <div className="content">
        <img id="yarnpic" src={category.image} alt="category" />
      </div>
      <div>
        <br/>
        <div className="text">
          <h4> {category.description}</h4>
        </div>
        <div className="text">
        <h2>{category.name} Projects</h2>
        </div>
        {category.crafts.map((craft) => <CraftCard key={craft.id} craft={craft}/>)}
        

        <div className="text">
          {/* <button onClick={() => handleDelete(id)}>Delete Category</button> */}
        </div>
        <br />
        <br />
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default CategoryDetails;
