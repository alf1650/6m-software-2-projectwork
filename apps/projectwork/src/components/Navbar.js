import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/favorites">Favs</Link>
      <Link to="/">Logout</Link>
    </nav>
  );
}

export default Navbar;
