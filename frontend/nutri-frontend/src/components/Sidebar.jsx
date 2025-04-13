import { useState } from "react";

import "./Sidebar.css"; // Keep your custom styles if needed

function Sidebar() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmr, setBMR] = useState(null);
  const [error, setError] = useState("");
  const [diseases, setDiseases] = useState({
    bp: false,
    diabetes: false,
    none: true,
  });

  const calculateBMR = () => {
    if (!weight || !height || !age) {
      setError("Please fill in all fields.");
      return;
    }
    if (weight <= 0 || height <= 0 || age <= 0) {
      setError("Values must be greater than zero.");
      return;
    }
    setError("");

    let calculated;
    if (gender === "male") {
      calculated = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      calculated = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    setBMR(calculated.toFixed(2));
  };

  const handleDiseaseChange = (e) => {
    const { name, checked } = e.target;
    if (name === "none") {
      setDiseases({ bp: false, diabetes: false, none: true });
    } else {
      setDiseases((prev) => ({
        ...prev,
        [name]: checked,
        none: !checked && !prev.bp && !prev.diabetes,
      }));
    }
  };

  return (
    <div className="sidebar p-2 bg-light rounded shadow-sm w-300" style={{ minHeight: "380px" }}>
      <h3 className="text-center mb-2 text-primary mt-1">BMR Calculator</h3>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      
      <div className="mb-3">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      
      <div className="mb-3">
        <label className="form-label fw-bold">Gender</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
            id="male"
          />
          <label className="form-check-label mb-2" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
            id="female"
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </div>

      
      <div className="mb-3">
        <label className="form-label fw-bold">Health Conditions</label>
        <div className="form-check">
          <input
            className="form-check-input mb-2"
            type="checkbox"
            name="bp"
            checked={diseases.bp}
            onChange={handleDiseaseChange}
            id="bp"
          />
          <label className="form-check-label mb-2" htmlFor="bp">
             BP
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="diabetes"
            checked={diseases.diabetes}
            onChange={handleDiseaseChange}
            id="diabetes"
          />
          <label className="form-check-label mb-2" htmlFor="diabetes">
            Diabetes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input mb-2"
            type="checkbox"
            name="none"
            checked={diseases.none}
            onChange={handleDiseaseChange}
            id="none"
          />
          <label className="form-check-label" htmlFor="none">
            None
          </label>
        </div>
      </div>

      {/* Calculate button */}
      <button className="btn btn-primary w-100 mb-3" onClick={calculateBMR}>
        Calculate BMR
      </button>

      {/* Result */}
      {bmr && (
        <div className="alert alert-success text-center">
          Your BMR is <strong>{bmr}</strong> kcal/day
        </div>
      )}
    </div>
  );
}

export default Sidebar;
