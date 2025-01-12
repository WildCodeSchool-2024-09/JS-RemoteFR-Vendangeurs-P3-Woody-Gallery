import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.woodyTitle}>Woody</span>
        <span className={styles.galleryTitle}>Gallery</span>
      </h1>
      <span className={`${styles.shopIcon} material-symbols-outlined`}>
        shopping_cart
      </span>
      <span className={`${styles.accountIcon} material-symbols-outlined`}>
        account_circle
      </span>
      <ul className={styles.ulNavigation}>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>Nouveautés</li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
      </ul>
      <ul className={styles.ulUser}>
        <li>
          <span className="material-symbols-outlined">favorite</span>
          Favoris
        </li>
        <li>
          <span className="material-symbols-outlined">shopping_cart</span>
          Panier
        </li>
        <li>Connexion</li>
      </ul>
    </header>
  );
}
