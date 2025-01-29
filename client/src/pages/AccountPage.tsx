import { Outlet } from "react-router-dom";
// import Account from "../components/Account";
import AccountHeader from "../components/AccountHeader";

export default function AccountPage() {
  return (
    <>
      <AccountHeader />
      <Outlet />
    </>
  );
}
