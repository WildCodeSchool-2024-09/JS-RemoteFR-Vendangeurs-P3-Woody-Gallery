import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/AccountMenu.module.css";

export default function AccountMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const userName = sessionStorage.getItem("userName");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className={styles.container}>
      <button type="button" className={styles.menu} onClick={toggleClick}>
        <span className={`material-symbols-outlined ${styles.menuIcon}`}>
          menu
        </span>
      </button>

      {isClicked && (
        <div className={styles.modal}>
          <NavLink to={`/user/${userName}`} className={styles.nav}>
            Compte
          </NavLink>
          <NavLink to={`/user/${userName}/adresses`} className={styles.nav}>
            Adresses
          </NavLink>
          <NavLink to="/" className={styles.nav}>
            Commandes
          </NavLink>
          <NavLink to="/" className={styles.nav}>
            Favoris
          </NavLink>
          <NavLink to="/" className={styles.nav}>
            Moyen de paiement
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/user/admin/Woody-Gallery"
              className={styles.nav}
              id={styles.admin}
            >
              Admin
            </NavLink>
          )}
        </div>
      )}
    </section>
  );
}
