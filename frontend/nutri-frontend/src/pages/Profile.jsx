import { useContext, useState } from "react";
import { AppContext } from "../App_Context";
import "./Profile.css"; // Import the provided CSS file

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
    <div className="profile">
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      {editMode ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{user.name}</h3>
          <br />
          <p>{user.email}</p>
          <br />
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Profile;