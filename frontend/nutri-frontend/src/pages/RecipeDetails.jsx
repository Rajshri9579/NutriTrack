import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "../pages/RecipeDetails.css"; // Keep your custom CSS

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

  if (!recipe) return <p className="text-center text-danger mt-5">No recipe selected.</p>;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="container my-5 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg" style={{ width: "28rem" }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="card-img-top"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h3 className="card-title text-center mb-3">{recipe.name}</h3>
            <p className="card-text text-muted">{recipe.description}</p>
            <p className="card-text text-center">
              <strong>Calories:</strong> {recipe.calories} kcal
            </p>
            <p className="card-text text-center">
              <strong>Exercise:</strong> {recipe.exercises}  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
