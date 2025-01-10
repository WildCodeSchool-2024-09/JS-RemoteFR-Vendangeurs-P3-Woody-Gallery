import Hasedera from "../assets/images/photos/Hasedera.jpg";
import Kotoku from "../assets/images/photos/Kotoku-in.jpg";
import Meiji from "../assets/images/photos/Meiji-jingu.jpg";
import Fuji from "../assets/images/photos/mont_fuji.jpg";
import styles from "../styles/ShopPhotos.module.css";

export default function ShopPhotos() {
  return (
    <section className={styles.photos}>
      <div className={styles.box}>
        <img src={Hasedera} alt="Hasedera" />
        <div className={styles.name}>Hasedera</div>
        <div className={styles.price}>29,99€</div>
      </div>
      <div className={styles.box}>
        <img src={Kotoku} alt="Kotoku-in" />
        <div className={styles.name}>Kotoku-in</div>
        <div className={styles.price}>29,99€</div>
      </div>
      <div className={styles.box}>
        <img src={Meiji} alt="Meiji-jingu" />
        <div className={styles.name}>Meiji-jingu</div>
        <div className={styles.price}>29,99€</div>
      </div>
      <div className={styles.box}>
        <img src={Fuji} alt="Mont Fuji" />
        <div className={styles.name}>Mont Fuji</div>
        <div className={styles.price}>29,99€</div>
      </div>
    </section>
  );
}
