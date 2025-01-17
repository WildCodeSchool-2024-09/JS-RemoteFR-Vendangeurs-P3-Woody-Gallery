import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AccountPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleDeconnect = () => {
    localStorage.clear();
    logout;
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <h2>Page du compte de {user?.name}</h2>
      <button type="button" onClick={handleDeconnect}>
        Déconnection
      </button>
    </>
  );
}
