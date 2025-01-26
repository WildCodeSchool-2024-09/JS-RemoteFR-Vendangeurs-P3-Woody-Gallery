import Order from "../components/Order";
import styles from "../styles/OrderPage.module.css";

export default function OrderPage() {
  return (
    <section className={styles.orderPage}>
      <h2>Panier</h2>
      <Order />
    </section>
  );
}
