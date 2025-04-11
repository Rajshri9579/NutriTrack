import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App_Context";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup ? "register" : "login";

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);

      if (isSignup) {
        // After signing up, redirect to the login page
        alert("Sign-up successful! Please log in.");
        setIsSignup(false);
      } else {
        // After logging in, update user state and redirect to home
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      <p className="mt-3">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login here" : "Sign up here"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;