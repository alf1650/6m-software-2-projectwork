import { Outlet, Navigate } from "react-router-dom";
import useUserState from "../store/userStateContext";

function ProtectedRoutes() {
  const { isLoggedIn } = useUserState();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
