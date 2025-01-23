import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  const isAuth = localStorage.getItem("isAuth") === "true";

  const userName = sessionStorage.getItem("userName");

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.woodyTitle}>Woody</span>
        <span className={styles.galleryTitle}>Gallery</span>
      </h1>
      <NavLink className={styles.shopIcon} to="/">
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
          <NavLink className={styles.navLink} to="/">
            Panier
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.navLink}
            to={isAuth ? `/user/${userName}` : "/create-account"}
          >
            {isAuth ? (
              <span className="material-symbols-outlined">account_circle</span>
            ) : (
              "Connexion"
            )}
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
