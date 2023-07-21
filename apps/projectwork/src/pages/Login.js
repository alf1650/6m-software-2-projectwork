import styles from "../css-modules/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "../components/CurrencySelector";
import useUserState from "../store/userStateContext";

function Login() {
  const { updateLogIn, updateUsername } = useUserState();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    updateUsername(input);
    updateLogIn();
    navigate("/search");
  };

  return (
    <div className={styles.login}>
      <h1>Welcome to TravelBuddy!</h1>
      <p>Please enter your name to start using app</p>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          placeholder="e.g. John"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <br />
        <label>Select your currency: </label>
        <CurrencySelector />
        <br />
        <br />
        <br />
        <button
          type="submit"
          className={styles.button}
          disabled={input ? false : true}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
