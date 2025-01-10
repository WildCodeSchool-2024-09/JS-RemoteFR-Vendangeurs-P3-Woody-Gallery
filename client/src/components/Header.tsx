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
      <ul>
        <li>Accueil</li>
        <li>Nouveautés</li>
        <li>Shop</li>
      </ul>
    </header>
  );
}
