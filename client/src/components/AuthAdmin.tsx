import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface DecodedToken {
  userId: number;
  isAdmin: boolean;
  exp: number;
}

function AuthAdmin() {
  const token = Cookies.get("authToken");

  if (!token) {
    console.warn("Aucun token trouvé !");
    return <Navigate to="/create-account" replace />;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      console.warn("Token expiré !");
      Cookies.remove("authToken");
      return <Navigate to="/create-account" replace />;
    }

    if (!decodedToken.isAdmin) {
      console.warn("L'utilisateur n'est pas administrateur !");
      localStorage.clear();
      sessionStorage.clear();
      return <Navigate to="/create-account" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return <Navigate to="/create-account" replace />;
  }
}

export default AuthAdmin;
