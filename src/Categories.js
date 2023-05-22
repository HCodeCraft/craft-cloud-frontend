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

  return <div>{categoryList}</div>;
};

export default Categories;
