import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ updateUsername }) {
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("SGD");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleClick = (name) => {
    // updateUsername(name);
    navigate("/search");
  };

  return (
    <div className={styles.login}>
      <h1>Welcome to TravelBud!</h1>
      <p>Please enter your name to start using app</p>
      <br />
      <label>Name: </label>
      <input placeholder="e.g. John" value={name} onChange={handleChange} />
      <br />
      <br />
      <label>Select your currency: </label>
      <select value={selectedValue} onChange={handleSelect}>
        <option value="SG">SGD</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      <br />
      <br />
      <br />
      <button className={styles.button} onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

export default Login;
