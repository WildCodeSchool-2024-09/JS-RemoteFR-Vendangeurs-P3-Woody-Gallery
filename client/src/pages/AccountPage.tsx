import { Outlet } from "react-router-dom";
import AccountHeader from "../components/AccountHeader";
import styles from "../styles/AccountPage.module.css";

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
