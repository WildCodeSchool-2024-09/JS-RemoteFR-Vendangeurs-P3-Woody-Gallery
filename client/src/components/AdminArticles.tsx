import styles from "../styles/AdminArticles.module.css";
import AdminArticlesCard from "./AdminArticlesCard";

export default function AdminArticles() {
  return (
    <div className={styles.adminArticles}>
      <div className={styles.interraction}>
        <input type="text" />
        <button
          className={`material-symbols-outlined ${styles.search}`}
          type="button"
        >
          search
        </button>
        <button className={styles.tri} type="button">
          Tri
        </button>
        <button
          className={`material-symbols-outlined ${styles.addArticles}`}
          type="button"
        >
          add <p>Ajouter un articles</p>
        </button>
      </div>
      <ul className={styles.list}>
        <li>Nom</li>
        <li>Image</li>
        <li>Description</li>
        <li>Collection</li>
        <li>Format</li>
        <li>Stock</li>
        <li className={styles.last}>Actions</li>
      </ul>
      <AdminArticlesCard />
    </div>
  );
}
