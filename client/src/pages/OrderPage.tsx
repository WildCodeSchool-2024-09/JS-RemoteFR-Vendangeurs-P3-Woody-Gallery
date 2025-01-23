import Articles from "../components/Articles";
import styles from "../styles/OrderPage.module.css";

export default function OrderPage() {
  return (
    <section className={styles.orderPage}>
      <h2>Panier</h2>
      <Articles />
    </section>
  );
}
