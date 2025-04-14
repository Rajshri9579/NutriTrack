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
          <div className="alert alert-info text-center" role="alert">
            No quick recipes available!
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {quickRecipes.map((recipe, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
                <div className="card w-100 shadow-sm rounded-4">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top rounded-top-4"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{recipe.title}</h5>
                    <p className="card-text text-muted mb-3">{recipe.time}</p>
                    <a
                      href={recipe.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary mt-auto"
                    >
                      Watch Video 🎥
                    </a>
                  </div>
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
