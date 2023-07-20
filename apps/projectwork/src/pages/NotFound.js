import styles from "../css-modules/NotFound.module.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.center}>
        <h1>Oops.. Page not found</h1>
        <button onClick={() => navigate("/search")}>Back to Search</button>
      </div>
      ;
    </>
  );
}

export default NotFound;
