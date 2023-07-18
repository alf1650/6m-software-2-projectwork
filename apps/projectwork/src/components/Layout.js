import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout({ isLoggedin, setIsloggedin, username, updateUsername, currency, updateCurrency, favs }) {
  return (
    <>
      <Navbar
        isLoggedin={isLoggedin}
        setIsloggedin={setIsloggedin}
        username={username}
        updateUsername={updateUsername}
        currency={currency}
        updateCurrency={updateCurrency}
        favs={favs}
      />
      <Outlet />
    </>
  );
}

export default Layout;