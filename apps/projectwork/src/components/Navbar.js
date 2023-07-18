import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import CurrencySelector from "./CurrencySelector";
import React, { useState, useEffect } from 'react';
import { Button } from './Button';

function Navbar({   
  isLoggedin,  
  setisLoggedin,  
  username,  
  updateUsername,  
  currency,  
  updateCurrency, 
  favs
}) {
  /* const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  
  useEffect(() => {
    const closeMenu = () => setClick(false);
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []); */

  const logout = () => {
    setisLoggedin(false);
    updateUsername("");
  /*  closeMobileMenu(); */
  };

  /* const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const closeMobileMenu = () => setClick(false); */

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.navbarContainer}>
//         <NavLink to="/" className={styles.navbarLogo} onClick={closeMobileMenu}>
//           TRAVELBUD 
//           <i className={`fab fa-typo3 ${styles.faTypo3}`} />
//         </NavLink>
//         <div className={styles.menuIcon} onClick={handleClick}>
//         <i className={click ? `fas fa-times ${styles.faTimes}` : `fas fa-bars ${styles.faBars}`} />
//           </div>
//           <ul className={click ? `${styles.navMenu} ${styles.active}` : styles.navMenu}> */}
//           <li className={styles.navItem}>
//               <NavLink to='/favorites' className={styles.navLinks} onClick={closeMobileMenu}>
//                 Favs
//               </NavLink>
//             </li>
//             </ul>
//             {button && <Button buttonStyle='btn--outline'>Logout</Button>}
//       {isLoggedin && (
//         <>
//           <div>
//             {username}{" "}
//             <CurrencySelector
//               currency={currency}
//               updateCurrency={updateCurrency}
//             />
//           </div>
//         </>
//       )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

return (
  <nav className={styles.navbar}>
    <div className={styles.navbarContainer}>
      <NavLink to="/" className={styles.navbarLogo}>
        TRAVELBUD 
        <i className={`fab fa-typo3 ${styles.faTypo3}`} />
      </NavLink>
      <ul className={styles.navMenu}>
        <div className={styles.navItem}>
          <NavLink to='/favorites' className={styles.navLinks}>
            Favs
          </NavLink>
        </div>
      </ul>
      {isLoggedin && (
        <>
          <div>
            {username}{" "}
            <CurrencySelector
              currency={currency}
              updateCurrency={updateCurrency}
            />
          </div>
        </>
      )}
      {isLoggedin && <Button buttonStyle='btn--outline' onClick={logout}>Logout</Button>}
    </div>
  </nav>
);
}

export default Navbar;