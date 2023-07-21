import styles from "../css-modules/Navbar.module.css";
import { NavLink } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import { Button } from "./Button";
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
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navlogo}>
        TRAVELBUD
        <i className={`fab fa-typo3 ${styles.faTypo3}`} />
      </NavLink>

      {isLoggedIn && (
        <>
          <div className={styles.navMenu}>
            <h3 style={{color: "white",margin: "10px"}}>{username}</h3>
            <CurrencySelector
              currency={userCurrency}
              updateCurrency={updateUserCurrency}
            />
            <div className={styles.navItem}>
              <NavLink to="/favorites" className={styles.navLinks}>
                {`Favorites (${favs ? favs.length : 0})`}
              </NavLink>
            </div>
          </div>
          <Button buttonStyle="btn--outline" onClick={() => updateLogIn()}>
            Logout
          </Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
