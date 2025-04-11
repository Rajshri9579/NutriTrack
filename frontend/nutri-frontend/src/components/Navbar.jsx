import { useContext } from "react";
import { AppContext } from "../App_Context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>NutriTrack</div>
      <div className="nav-links">
        {!user ? (
          <button onClick={() => navigate("/auth")}>Login</button>
        ) : (
          <>
            <button onClick={() => navigate("/saved")}>Saved</button>
            <button onClick={() => navigate("/")}>Quick Recipes</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
