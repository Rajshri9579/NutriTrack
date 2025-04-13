import { useContext } from "react";
import { recipes } from "../data/recipesData";
import { AppContext } from "../App_Context";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

function Home() {
  const { user, savedRecipes, setSavedRecipes } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSave = (recipe) => {
    if (!user) return navigate("/auth");
    if (!savedRecipes.find((item) => item.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const handleSeeMore = (recipe) => {
    if (!user) return navigate("/auth");
    navigate("/details", { state: { recipe } });
  };

  return (
    <div className="home py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold">Delicious Recipes 🍳</h1>
        <p className="lead text-muted">Discover, save, and cook your favorite recipes!</p>
      </div>

      <div className="container">
        <div className="row justify-content-center gx-4 gy-4">
          {recipes.map((recipe) => (
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
                  <p className="card-text text-muted">{recipe.calories} Calories</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className={`btn ${
                        savedRecipes.some((item) => item.id === recipe.id)
                          ? "btn-secondary"
                          : "btn-outline-primary"
                      }`}
                      disabled={savedRecipes.some((item) => item.id === recipe.id)}
                      onClick={() => handleSave(recipe)}
                    >
                      {savedRecipes.some((item) => item.id === recipe.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      className="btn btn-primary"
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
      </div>
    </div>
  );
}

export default Home;
