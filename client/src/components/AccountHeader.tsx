// import Account from "../components/Account";
import AccountMenu from "./AccountMenu";
import Disconnection from "./Disconnection";
import styles from "../styles/AccountHeader.module.css";
import AccountTitle from "./AccountTitle";

export default function AccountHeader() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>INFORMATIONS PERSONNELLES</h2>
      <section className={`${styles.buttons} ${styles.hidden}`}>
        <AccountMenu />
        <AccountTitle />
        <Disconnection />
      </section>
    </section>
  );
}
