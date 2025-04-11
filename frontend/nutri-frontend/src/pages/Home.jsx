import { useContext } from "react";
import { recipes } from "../data/recipesData";
import { AppContext } from "../App_Context";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css"; // Assuming you have a CSS file for styling

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
    <div className="home">
     
      
      <div className="recipe-grid container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3 className="recipe-name">{recipe.name}</h3>
            <p className="recipe-calories">{recipe.calories} Calories</p>
            <div className="card-buttons">
              <button
                className="save-button padding-10"
                disabled={savedRecipes.some((item) => item.id === recipe.id)}
                onClick={() => handleSave(recipe)}
              >
                {savedRecipes.some((item) => item.id === recipe.id) ? "Saved" : "Save"}
              </button>
              <button className="see-more-button" onClick={() => handleSeeMore(recipe)}>
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;