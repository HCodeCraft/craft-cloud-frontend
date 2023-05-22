import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";
import "./Card.css";
import Home from "./Home";
import Categories from "./Categories";
import NewCategoryForm from "./NewCategoryForm";
import CategoryDetails from "./CategoryDetails";
import CraftDetails from "./CraftDetails";
import EditCategory from "./EditCategory";
import NewCraftForm from "./NewCraftForm";
import EditCraft from "./EditCraft";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log("data", data);
      });
  }, []);

  const handleDeleteCategory = (id) => {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // function handleAddCraft(updatedCategory) {
  //   const updatedCategories = categories.map((category) => {
  //     if (category.id === updatedCategory.id) {
  //       return updatedCategory;
  //     } else {
  //       return category;
  //     }
  //   });
  //   setCategories(updatedCategories);
  // }

  const handleEditCategory = (editiedCategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === editiedCategory.id){
        return editiedCategory;
      } else {
        return category
      }
    })
      setCategories(updatedCategories)
    
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categories"
          element={<Categories categories={categories} />}
        />
        <Route
          path="/categories/new"
          element={<NewCategoryForm onAddCategory={handleAddCategory} />}
        />
        <Route
          path="/categories/:id"
          element={
            <CategoryDetails
              categories={categories}
              onRemoveCategory={handleDeleteCategory}
            />
          }
        />
        <Route
          path="/categories/:id/edit"
          element={<EditCategory categories={categories} onEditCategory={handleEditCategory} />}
        />
        <Route
          path="/categories/:id/new"
          element={<NewCraftForm categories={categories} />}
        />
        <Route
          path="/categories/:id/*"
          element={<CraftDetails categories={categories} />}
        />
        <Route
          path="/categories/*/:id/edit"
          element={<EditCraft crafts={categories.crafts} />}
        />
      </Routes>
    </>
  );
}

export default App;
