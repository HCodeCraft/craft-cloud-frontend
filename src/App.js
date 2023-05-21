import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";
import "./Card.css"
import Home from "./Home";
import Categories from "./Categories";
import NewCategoryForm from "./NewCategoryForm";
import CategoryDetails from "./CategoryDetails";
import CraftDetails from "./CraftDetails"
import EditCategory from "./EditCategory";
import NewCraftForm from "./NewCraftForm";


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
    const newCategories = categories.filter((category) => category.id !== id)
  setCategories(newCategories)
  }


  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory])
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories categories={categories}/>} />
        <Route path="/categories/new" element={<NewCategoryForm onAddCategory={handleAddCategory}/>}/>
        <Route path="/categories/:id" element={<CategoryDetails categories={categories} onRemoveCategory={handleDeleteCategory}/>} />
        <Route path="/categories/:id/edit" element={<EditCategory categories={categories}/>} />
        <Route path="/categories/:id/new" element={<NewCraftForm />}/>
        <Route path="/categories/:id/*" element={<CraftDetails categories={categories}/>} />
      </Routes>
    </>
  );
}

export default App;
