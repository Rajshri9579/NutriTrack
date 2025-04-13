import { useContext } from "react";
import { AppContext } from "../App_Context";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation
 // Import the utility function for handling "See More" action

import "../pages/Saved.css"; // Import the CSS file for styling

function Saved() {
  const {user ,savedRecipes } = useContext(AppContext);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSeeMore = (recipe) => {
    if (!user) return navigate("/auth");
    navigate("/details", { state: { recipe } });
  };

  return (
    <div className="saved py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold">Saved Recipes 📚</h1>
        <p className="lead text-muted">Your favorite recipes, always on hand!</p>
      </div>

      <div className="container">
        {savedRecipes.length === 0 ? (
          <div className="alert alert-info" role="alert">
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
                        className="btn btn-primary w-100"
                        onClick={() => handleSeeMore(recipe)}
                      >
                        See More
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
