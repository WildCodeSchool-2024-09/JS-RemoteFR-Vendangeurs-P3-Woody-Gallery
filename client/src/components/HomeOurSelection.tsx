import lac from "/photos/alpes/Lac des vaches1.jpg";
import shinjuku from "/photos/modernTokyo/Shinjuku_night.jpg";
import zugspitze4 from "/photos/munich/Zugspitze4.jpg";
import styles from "../styles/HomeOurSelection.module.css";

export default function HomeOurSelection() {
  return (
    <section className={styles.ourSelection}>
      <h2>Notre sélection</h2>
      <div>
        <figure className={styles.photo1}>
          <img src={lac} alt="" />
        </figure>
        <figure className={styles.photo2}>
          <img src={shinjuku} alt="" />
        </figure>
        <figure className={styles.photo3}>
          <img src={zugspitze4} alt="" />
        </figure>
      </div>
    </section>
  );
}
