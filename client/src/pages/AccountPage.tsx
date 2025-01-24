import Account from "../components/Account";
import AccountMenu from "../components/AccountMenu";
import Deconnection from "../components/Deconnection";
import styles from "../styles/AccountPage.module.css";

export default function AccountPage() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>INFORMATIONS PERSONNELLES</h2>
      <section className={styles.buttons}>
        <AccountMenu />
        <Deconnection />
      </section>
      <section className={styles.components}>
        <Account />
      </section>
    </section>
  );
}
