import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [savedRecipes, setSavedRecipes] = useState([]); // Saved recipes for the logged-in user

  // Load saved recipes from localStorage when the user logs in
  useEffect(() => {
    if (user) {
      const userRecipes = JSON.parse(localStorage.getItem(`savedRecipes_${user.id}`)) || [];
      setSavedRecipes(userRecipes);
    } else {
      setSavedRecipes([]); // Clear recipes when no user is logged in
    }
  }, [user]);

  const saveRecipe = (recipe) => {
    if (!user) return; // Ensure a user is logged in
    setSavedRecipes((prev) => {
      const updatedRecipes = [...prev, recipe];

      // Save per user in localStorage
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(updatedRecipes));
      return updatedRecipes;
    });
  };

  const getSavedRecipes = () => {
    return savedRecipes; // Return saved recipes for the current user
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        saveRecipe,
        getSavedRecipes,
        savedRecipes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};