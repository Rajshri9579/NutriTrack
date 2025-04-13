import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [savedRecipes, setSavedRecipes] = useState([]); // Saved recipes for the logged-in user

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
    if (!user) return [];
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
