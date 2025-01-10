import fuji from "/photos/traditionalTokyo/mont_fuji.jpg";
import styles from "../styles/HomeLastCollection.module.css";

export default function HomeLastCollection() {
  return (
    <section className={styles.lastCollection}>
      <figure>
        <img src={fuji} alt="le mont fuji" />
      </figure>
      <article>
        <h3>Dernière collection</h3>
        <h2>Collection Tokyo</h2>
      </article>
      <div>
        <hr />
        <hr />
        <hr />
      </div>
    </section>
  );
}
