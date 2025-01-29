// import Account from "../components/Account";
import AccountMenu from "../components/AccountMenu";
import Deconnection from "../components/Deconnection";
import styles from "../styles/AccountHeader.module.css";

export default function AccountHeader() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>INFORMATIONS PERSONNELLES</h2>
      <section className={styles.buttons}>
        <AccountMenu />
        <Deconnection />
      </section>
    </section>
  );
}
