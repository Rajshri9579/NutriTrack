import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./App_Context";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Navbar from "./components/Navbar";
import QuickRecipes from "./pages/QuickRecipes";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [savedRecipes, setSavedRecipes] = useState(() => {
    if (user) {
      // When the user is logged in, load saved recipes for that specific user
      const storedRecipes = localStorage.getItem(`savedRecipes_${user.id}`);
      return storedRecipes ? JSON.parse(storedRecipes) : []; // If no saved recipes, return an empty array
    }
    return []; // No recipes if no user is logged in
  });

  useEffect(() => {
    if (user) {
      // Sync user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Sync saved recipes specific to the current user
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(savedRecipes));
    }
  }, [user, savedRecipes]); // Sync whenever user or savedRecipes change

  return (
    <AppContext.Provider value={{ user, setUser, savedRecipes, setSavedRecipes }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<RecipeDetails />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/quick" element={<QuickRecipes />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
