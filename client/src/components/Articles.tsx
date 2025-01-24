import styles from "../styles/Articles.module.css";

export default function Articles() {
  return (
    <article className={styles.articles}>
      <h3>Vos articles en attente</h3>
      <div>
        <p>Aucun article en attente</p>
      </div>
    </article>
  );
}
