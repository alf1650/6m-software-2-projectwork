import styles from "../css-modules/Navbar.module.css";
import { NavLink } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import useUserState from "../store/userStateContext";

function Navbar() {
  const {
    isLoggedIn,
    updateLogIn,
    username,
    userCurrency,
    updateUserCurrency,
    favs,
  } = useUserState();

  return (
    <nav className={styles.navbar}>
      {/*navbar is to be blank on login page, before user logs in*/}
      {isLoggedIn && (
        <>
          <div>
            {username}{" "}
            <CurrencySelector
              currency={userCurrency}
              updateCurrency={updateUserCurrency}
            />
          </div>
          <div>
            <NavLink className={styles.navlink} to="/favorites">
              {`Favorites (${favs ? favs.length : 0})`}
            </NavLink>
            <NavLink
              className={styles.navlink}
              to="/"
              onClick={() => updateLogIn()}
            >
              Logout
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
