import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";

function Search({ username }) {
  const navigate = useNavigate();
  const handlerSubmit = () => {
    console.log("Submit");
  };
  const handlerDate = () => {
    console.log("date changed");
  };
  const handleClick = () => {
    navigate("/:id");
  };

  return (
    <div className={styles.form}>
      <h2>{`Hi, ${username}`}</h2>
      <p> Where would you like to go?</p>
      <form onSubmit={handlerSubmit}>
        <label>I would like to visit: </label> <input />
        <label>from:</label>
        <input
          type="text"
          name="name"
          placeholder="YYYY-MM-DD"
          onChange={handlerDate}
        />
        <label>to:</label>
        <input
          type="text"
          name="name"
          placeholder="YYYY-MM-DD"
          onChange={handlerDate}
        />
        <br />
        <br />
        <button className={styles.button} onClick={handleClick}>
          Get me some info!
        </button>
      </form>
    </div>
  );
}

export default Search;
