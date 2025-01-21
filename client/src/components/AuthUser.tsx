import { Navigate, Outlet } from "react-router-dom";

export default function AuthUser() {
  const isAuth = localStorage.getItem("isAuth") === "true";

  return isAuth ? <Outlet /> : <Navigate to="/create-account" replace />;
}
