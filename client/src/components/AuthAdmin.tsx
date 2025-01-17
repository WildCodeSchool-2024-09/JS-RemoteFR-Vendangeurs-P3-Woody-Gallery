import { Navigate, Outlet } from "react-router-dom";

function AuthAdmin() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAuth) {
    return <Navigate to="/create-account" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default AuthAdmin;
