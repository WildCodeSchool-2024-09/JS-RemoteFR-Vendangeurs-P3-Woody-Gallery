import styles from "../../styles/UserAccount/AccountPayment.module.css";

export default function AccountPayment() {
  return (
    <section className={styles.payment}>
      <section className={styles.container}>
        <button type="button" className={styles.addButton}>
          <span className={`material-symbols-outlined ${styles.addIcon}`}>
            add_circle
          </span>
          <p className={styles.addPayment}>Ajouter un moyen de paiement</p>
        </button>
      </section>
    </section>
  );
}
