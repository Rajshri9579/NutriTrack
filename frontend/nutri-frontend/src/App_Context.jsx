import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [savedRecipes, setSavedRecipes] = useState({}); // Saved recipes per user

  const saveRecipe = (recipe) => {
    if (!user) return; // Ensure a user is logged in
    setSavedRecipes((prev) => ({
      ...prev,
      [user.email]: [...(prev[user.email] || []), recipe], // Save recipes for the current user
    }));
  };

  const getSavedRecipes = () => {
    if (!user) return [];
    return savedRecipes[user.email] || []; // Retrieve recipes for the current user
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        saveRecipe,
        getSavedRecipes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};