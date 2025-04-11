import { useState } from "react";
import "./Sidebar.css"; // Import the CSS file for styling

function Sidebar() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
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
    const calculated = 10 * weight + 6.25 * height - 5 * age + 5;
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
    <div className="sidebar">
      <h3 className="sidebar-title">BMR Calculator</h3>
      <div className="input-group">
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="disease-group">
        <label>
          <input
            type="checkbox"
            name="bp"
            checked={diseases.bp}
            onChange={handleDiseaseChange}
          />
          BP
        </label>
        <label>
          <input
            type="checkbox"
            name="diabetes"
            checked={diseases.diabetes}
            onChange={handleDiseaseChange}
          />
          Diabetes
        </label>
        <label>
          <input
            type="checkbox"
            name="none"
            checked={diseases.none}
            onChange={handleDiseaseChange}
          />
          None
        </label>
      </div>
      <button className="calculate-button" onClick={calculateBMR}>
        Calculate
      </button>
      {error && <p className="error-message">{error}</p>}
      {bmr && (
        <p className="bmr-result">
          Your BMR is <strong>{bmr}</strong> kcal/day
        </p>
      )}
    </div>
  );
}

export default Sidebar;