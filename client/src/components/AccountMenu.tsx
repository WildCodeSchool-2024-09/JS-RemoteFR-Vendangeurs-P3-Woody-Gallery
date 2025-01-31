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
          <NavLink
            to={`/user/${userName}`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Compte
          </NavLink>
          <NavLink
            to={`/user/${userName}/addresses`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Adresses
          </NavLink>
          <NavLink
            to={`/user/${userName}/orders`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Commandes
          </NavLink>
          <NavLink
            to={`/user/${userName}/favorites`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Favoris
          </NavLink>
          <NavLink
            to={`/user/${userName}/payment`}
            className={styles.nav}
            onClick={toggleClick}
          >
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
