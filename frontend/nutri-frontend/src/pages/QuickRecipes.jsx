import { quickRecipes } from "../data/quickRecipes";

const QuickRecipes = () => {
  return (
    <div className="quick-recipes py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold">Quick Recipes ⏱️</h1>
        <p className="lead text-muted">Healthy meals in no time!</p>
      </div>
      <div className="container">
        {quickRecipes.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No quick recipes available!
          </div>
        ) : (
          <div className="row justify-content-center gx-4 gy-4">
            {quickRecipes.map((recipe, index) => (
              <div key={index} className="card w-150px shadow-sm " style={{ minHeight: "350px" }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted pb-1px">{recipe.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickRecipes;
