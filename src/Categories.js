import React, { useState, useEffect } from "react";
import Category from "./Category";

const Categories = ({ categories }) => {

  const [cat, setCat] = useState([{
    name:"",
    image:"",
    description:"",
    id:""
  }])


  useEffect(() => {
if (cat){
  setCat(categories)
}
  }, [categories])



  const categoryList = cat.map((category) => (
    <Category
      id={category.id}
      key={category.id}
      name={category.name}
      image={category.image}
      description={category.description}
    />
));

  return ( <div className="category-container">{ (categories) ? categoryList : <h2>Loading...</h2> }</div> )
};

export default Categories;
