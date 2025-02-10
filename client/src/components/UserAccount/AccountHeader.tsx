import styles from "../../styles/UserAccount/AccountHeader.module.css";
import AccountMenu from "./AccountMenu";
import AccountTitle from "./AccountTitle";
import Disconnection from "./Disconnection";

export default function AccountHeader() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>INFORMATIONS PERSONNELLES</h2>
      <section className={`${styles.buttons} ${styles.desktopContainer}`}>
        <AccountMenu />
        <AccountTitle />
        <Disconnection />
      </section>
    </section>
  );
}
