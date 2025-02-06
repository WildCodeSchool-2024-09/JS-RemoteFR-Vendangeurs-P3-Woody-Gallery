import { Outlet } from "react-router-dom";
import AccountHeader from "../components/UserAccount/AccountHeader";
import styles from "../styles/UserAccount/AccountPage.module.css";

export default function AccountPage() {
  return (
    <>
      <AccountHeader />
      <div className={styles.desktopContainer}>
        <Outlet />
      </div>
    </>
  );
}
