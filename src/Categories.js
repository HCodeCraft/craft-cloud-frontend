import React from "react";
import Category from "./Category";

const Categories = ({ categories }) => {

  const categoryList = categories.map((category) => (
    <Category
      id={category.id}
      key={category.id}
      name={category.name}
      image={category.image}
      description={category.description}
    />
  ));

  return categories != undefined ? <div>{categoryList}</div> :
  <h2>Loading ...</h2>
};

export default Categories;
