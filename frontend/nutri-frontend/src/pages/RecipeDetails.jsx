import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "../pages/RecipeDetails.css"; // Assuming you have a CSS file for styling

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState(() => {
    const saved = localStorage.getItem("selectedRecipe");
    return location.state?.recipe || (saved && JSON.parse(saved)) || {};
  });

  useEffect(() => {
    if (recipe) {
      localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    }
  }, [recipe]);

  if (!recipe) return <p>No recipe selected.</p>;

  return (
    <div className="recipe-details">
      <div className="content">
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
        <p><strong>Calories:</strong> {recipe.calories} kcal</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default RecipeDetails;
