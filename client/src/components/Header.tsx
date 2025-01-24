import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Header.module.css";

export default function Header() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const userName = sessionStorage.getItem("userName");
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("userName") === null &&
      localStorage.getItem("isAuth") === "true"
    ) {
      localStorage.clear();
      logout;
      navigate("/");
      window.location.reload();
    }
  });

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.woodyTitle}>Woody</span>
        <span className={styles.galleryTitle}>Gallery</span>
      </h1>
      <NavLink className={styles.shopIcon} to="/panier">
        <span className="material-symbols-outlined">shopping_cart</span>
      </NavLink>
      <NavLink
        className={styles.accountIcon}
        to={isAuth ? `/user/${userName}` : "/create-account"}
      >
        <span className="material-symbols-outlined">account_circle</span>
      </NavLink>
      <ul className={styles.ulNavigation}>
        <li>
          <NavLink className={styles.navLink} to="/">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="/shop?collection=2">
            Nouveautés
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="/shop">
            Shop
          </NavLink>
        </li>
      </ul>
      <ul className={styles.ulUser}>
        <li>
          <span className="material-symbols-outlined">favorite</span>
          <NavLink className={styles.navLink} to="/">
            Favoris
          </NavLink>
        </li>
        <li>
          <span className="material-symbols-outlined">shopping_cart</span>
          <NavLink className={styles.navLink} to="/panier">
            Panier
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.navLink}
            to={isAuth ? `/user/${userName}` : "/create-account"}
          >
            {isAuth ? (
              <span className={`material-symbols-outlined ${styles.account}`}>
                account_circle
              </span>
            ) : (
              "Connexion"
            )}
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
