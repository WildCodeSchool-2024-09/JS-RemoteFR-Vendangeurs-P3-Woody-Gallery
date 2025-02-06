import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/AdminPage/AdminMobile.module.css";

export default function AdminMobile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeconnect = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("isAdmin");
    logout;
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.adminMobile}>
      <hr />
      <h3>Admin</h3>
      <button
        onClick={handleDeconnect}
        onKeyDown={handleDeconnect}
        className={`material-symbols-outlined ${styles.logoutIcon}`}
        type="button"
      >
        logout
      </button>
      <p>
        Veuillez utiliser un ordinateur pour accéder à votre compte
        ADMINISTRATEUR
      </p>
    </div>
  );
}
