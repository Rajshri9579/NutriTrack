import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./App_Context";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [savedRecipes, setSavedRecipes] = useState(() => {
    const stored = localStorage.getItem("savedRecipes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [user, savedRecipes]);

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
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
