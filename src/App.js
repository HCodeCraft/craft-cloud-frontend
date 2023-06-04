import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./app.css";
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
      });
  }, []);

  const handleDeleteCategory = (deletedCategory) => {
    const newCategories = categories.filter(
      (category) => category.id != deletedCategory.id
    );
    setCategories(newCategories);
  };

  const handleDeleteCraft = (deletedCraft) => {
    const selectedCategory = categories.find(
      (c) => c.id == deletedCraft.category_id
    );
    const newCraftList = selectedCategory.crafts.filter(
      (craft) => craft.id !== deletedCraft.id
    );
    const updatedCategory = { ...selectedCategory, crafts: newCraftList };
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const onAddCraft = (newCraft) => {
    const selectedCategory = categories.find(
      (c) => c.id === newCraft.category_id
    );
    const updatedCrafts = [...selectedCategory.crafts, newCraft];
    const updatedCategory = { ...selectedCategory, crafts: updatedCrafts };
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  const onEditCraft = (editedCraft) => {
    const oneCategory = categories.find((c) => c.id == editedCraft.category_id);
    const updatedCraftList = oneCategory.crafts.map((craft) =>
      craft.id == editedCraft.id ? editedCraft : craft
    );
    const updatedCategory = { ...oneCategory, crafts: updatedCraftList };
    const updatedCategories = categories.map((category) =>
      category.id == updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  const handleEditCategory = (editedCategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === editedCategory.id) {
        return editedCategory;
      } else {
        return category;
      }
    });
    setCategories(updatedCategories);
  };

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
          element={
            <EditCategory
              categories={categories}
              onEditCategory={handleEditCategory}
            />
          }
        />

        <Route
          path="/categories/:category_id/crafts/:id"
          element={
            <CraftDetails
              categories={categories}
              onDeleteCraft={handleDeleteCraft}
            />
          }
        />

        <Route
          path="/categories/:id/new"
          element={
            <NewCraftForm categories={categories} onAddCraft={onAddCraft} />
          }
        />
        <Route
          path="/categories/:category_id/crafts/:id/edit"
          element={
            <EditCraft categories={categories} onEditCraft={onEditCraft} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
