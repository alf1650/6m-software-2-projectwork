import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

function Login({ setIsloggedin, updateUsername, currency, updateCurrency }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    updateUsername(input);
    navigate("/search");
    setIsloggedin(true);
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
      <h1>Welcome to TravelBud!</h1>
      <br />
      <p>Please enter your name to start using app</p>
      <br />
      <label>Name: </label>
      <input
        type="text"
        placeholder="e.g. John"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <label>Select your currency: </label>
      <CurrencySelector currency={currency} updateCurrency={updateCurrency} />
      <br />
      <br />
      <button
        className={styles.button}
        disabled={input ? false : true}
        onClick={handleClick}
      >
        Start Your Journey
      </button>
    </div>
    </div>
  );
}

export default Login;