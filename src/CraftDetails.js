import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CraftDetails = ({ categories }) => {
  console.log("categories", categories);

  const params = useParams();


  const category = categories.find((c) => c.id == params.id);

  const craft = category.crafts.find((c) => c.id == (params['*']))



  return craft != undefined ? (
    <div>
      <h1 className="title">{craft.name}</h1>
      <div className="content">
        <img id="yarnpic" src={craft.image} alt="category" />
      </div>
      <div>
        <br/>
        <div className="text">
        <h4>{craft.difficulty}</h4>
        <h4>{craft.completed}</h4>
          <h4> {craft.description}</h4>
          <h4>{craft.notes}</h4>
          <h4></h4>
          <br/>
          <div className='sidebtn, btn'>
          <button>Edit Craft</button>
          <button>Delete Craft</button>
          </div>
        </div>
        <div className="text">
        <h2>{category.name} Projects</h2>
        </div>
        
        

        <div className="text">
          {/* <button onClick={() => handleDelete(id)}>Delete Category</button> */}
        </div>
        <br />
        <br />
      </div> <h4>Difficulty:</h4><p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p> 
    </div>
  ) : (
    <>
    <br />
    <br/>
    <br/>
    <h1 className="title">Loading...</h1>
    </>
  );
};

export default CraftDetails;