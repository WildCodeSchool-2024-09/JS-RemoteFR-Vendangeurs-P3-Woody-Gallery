// import Account from "../components/Account";
import AccountMenu from "../components/AccountMenu";
import AccountOrders from "../components/AccountOrders";
// import Addresses from "../components/Addresses";

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
        {/* <Account /> */}
        {/* <Addresses /> */}
        <AccountOrders />
      </section>
    </section>
  );
}
