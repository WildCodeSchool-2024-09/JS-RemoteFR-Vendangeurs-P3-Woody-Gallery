import { Outlet } from "react-router-dom";
import AccountHeader from "../components/AccountHeader";

export default function AccountPage() {
  return (
    <>
      <AccountHeader />
      <Outlet />
    </>
  );
}
