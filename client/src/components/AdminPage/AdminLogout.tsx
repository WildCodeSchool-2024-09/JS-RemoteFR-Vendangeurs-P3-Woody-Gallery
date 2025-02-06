import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/AdminPage/AdminLogout.module.css";

export default function AdminLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeconnect = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuth");
    sessionStorage.clear();
    logout;
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.adminLogout}>
      <p>Voulez-vous vous déconnecter ?</p>
      <button onClick={handleDeconnect} type="button">
        Se déconnecter
      </button>
    </div>
  );
}
