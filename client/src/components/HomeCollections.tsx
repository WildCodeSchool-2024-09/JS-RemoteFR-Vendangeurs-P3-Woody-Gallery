import tori from "/photos/modernTokyo/Tokyo_Skytree.jpg";
import styles from "../styles/HomeCollections.module.css";

export default function HomeCollections() {
  return (
    <section className={styles.collections}>
      <h2>Toutes les collections</h2>
      <div className={styles.carousel}>
        <span className={`${styles.prev} material-symbols-outlined`}>
          arrow_forward_ios
        </span>
        <div>
          <figure>
            <img src={tori} alt="" />
          </figure>
          <h3>Collection Tokyo Modern</h3>
        </div>
        <span className={`${styles.next} material-symbols-outlined`}>
          arrow_forward_ios
        </span>
      </div>
    </section>
  );
}
