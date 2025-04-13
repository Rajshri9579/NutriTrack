import { useContext, useState } from "react";
import { AppContext } from "../App_Context";
import "./Profile.css"; // Keep your custom CSS

function Profile() {
  const { user, setUser } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    setUser({ ...user, name, email });
    setEditMode(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-50 p-4">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
            style={{ width: "80px", height: "80px", margin: "0 auto", fontSize: "2rem" }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        {editMode ? (
          <>
            <div className="mb-1">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success w-100 me-2" onClick={handleUpdate}>
                Save
              </button>
              <button className="btn btn-secondary w-100" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-center">{user.name}</h4>
            <p className="text-center text-muted">{user.email}</p>
            <div className="text-center">
              <button className="btn btn-primary w-100" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
