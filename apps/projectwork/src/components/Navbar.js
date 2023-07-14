import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import CurrencySelector from "./CurrencySelector";

function Navbar({
  isLoggedin,
  setisLoggedin,
  username,
  updateUsername,
  currency,
  updateCurrency,
}) {
  const logout = () => {
    setisLoggedin(false);
    updateUsername("");
  };

  return (
    <nav className={styles.navbar}>
      {isLoggedin && (
        <>
          <div>
            {username}{" "}
            <CurrencySelector
              currency={currency}
              updateCurrency={updateCurrency}
            />
          </div>
          <div>
            <NavLink className={styles.navlink} to="/favorites">
              Favs
            </NavLink>
            <NavLink className={styles.navlink} to="/" onClick={logout}>
              Logout
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
