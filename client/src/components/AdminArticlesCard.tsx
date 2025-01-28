import styles from "../styles/AdminArticlesCard.module.css";

export default function AdminArticlesCard() {
  return (
    <ul className={styles.adminArticlesCard}>
      <li>name</li>
      <li>
        <figure>
          <img src="image" alt="name" />
        </figure>
      </li>
      <li>numberChar charactères</li>
      <li>collection name</li>
      <li>format</li>
      <li>stock</li>
      <li className={styles.last}>
        <button className="material-symbols-outlined" type="button">
          edit_square
        </button>
        <button
          className={`material-symbols-outlined ${styles.delete}`}
          type="button"
        >
          delete
        </button>
      </li>
    </ul>
  );
}
