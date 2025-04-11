import { useContext } from "react";
import { AppContext } from "../App_Context";
import "./Saved.css"; // Import the CSS file for styling

function Saved() {
  const { savedRecipes } = useContext(AppContext);

  return (
 
     
      

    <div className="saved">
      
      {savedRecipes.length === 0 ? (
        <p className="no-recipes">No saved recipes.</p>
      ) : (
        <div className="recipe-grid">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <div className="recipe-content">
                <h3 className="recipe-name">{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;