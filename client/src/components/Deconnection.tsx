import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Deconnection.module.css";

export default function Deconnection() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeconnect = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuth");
    logout;
    navigate("/");
    window.location.reload();
  };
  return (
    <button
      type="button"
      onClick={handleDeconnect}
      className={styles.logoutButton}
    >
      <span className={`material-symbols-outlined ${styles.logoutIcon}`}>
        logout
      </span>
    </button>
  );
}
