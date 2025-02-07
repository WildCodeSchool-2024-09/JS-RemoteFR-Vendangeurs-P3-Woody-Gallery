import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/UserAccount/Disconnection.module.css";

export default function Disconnection() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuth");
    sessionStorage.clear();
    logout;
    navigate("/");
    window.location.reload();
  };
  return (
    <button
      type="button"
      onClick={handleDisconnect}
      className={styles.logoutButton}
    >
      <span className={`material-symbols-outlined ${styles.logoutIcon}`}>
        logout
      </span>
      <span className={styles.desktopName}>Déconnexion</span>
    </button>
  );
}
