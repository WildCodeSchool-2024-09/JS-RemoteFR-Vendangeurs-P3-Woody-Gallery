import Order from "../components/Cart/Order";
import styles from "../styles/Cart/OrderPage.module.css";

export default function OrderPage() {
  return (
    <section className={styles.orderPage}>
      <h2>Panier</h2>
      <Order />
    </section>
  );
}
