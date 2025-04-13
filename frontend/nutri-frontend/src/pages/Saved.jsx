import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App_Context";
import { useNavigate } from "react-router-dom";

// Import the CSS file for styling

function Saved() {
  const { user } = useContext(AppContext); // Get the current user from context
  const [savedRecipes, setSavedRecipes] = useState([]); // Local state for saved recipes
  const navigate = useNavigate();

  // Fetch saved recipes for the current user when the component loads
  useEffect(() => {
    if (user) {
      const userRecipes = JSON.parse(localStorage.getItem(`savedRecipes_${user.id}`)) || [];
      setSavedRecipes(userRecipes);
    } else {
      setSavedRecipes([]); // Clear recipes if no user is logged in
    }
  }, [user]);

  const handleSeeMore = (recipe) => {
    if (!user) return navigate("/auth");
    navigate("/details", { state: { recipe } });
  };

  const toggleSaveRecipe = (recipe) => {
    if (!user) return navigate("/auth");

    const isSaved = savedRecipes.some((r) => r.id === recipe.id);

    if (isSaved) {
      // Unsave the recipe
      const updatedRecipes = savedRecipes.filter((r) => r.id !== recipe.id);
      setSavedRecipes(updatedRecipes);
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(updatedRecipes));
    } else {
      // Save the recipe
      const updatedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(updatedRecipes));
    }
  };

  return (
    <div className="saved py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold">Saved Recipes 📚</h1>
        <p className="lead text-muted">Your favorite recipes, always on hand!</p>
      </div>

      <div className="container">
        {savedRecipes.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No saved recipes yet. Browse and save your favorites!
          </div>
        ) : (
          <div className="row justify-content-center gx-4 gy-4">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="col-12 col-sm-6 col-md-3 d-flex">
                <div className="card w-100 shadow-sm" style={{ minHeight: "400px" }}>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text text-muted">{recipe.description}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-secondary w-40"
                        onClick={() => handleSeeMore(recipe)}
                        >See more</button>
                      <button
                        className={`btn ${savedRecipes.some((r) => r.id === recipe.id) ? "btn-danger" : "btn-primary"} w-40`}
                        onClick={() => toggleSaveRecipe(recipe)}
                      >
                        {savedRecipes.some((r) => r.id === recipe.id) ? "Unsave" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;