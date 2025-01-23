import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Account.module.css";
import AccountLine from "./AccountLine";

export default function Account() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, [user]);

  return (
    <section className={styles.account}>
      <div className={styles.container}>
        <AccountLine firstname={userData.firstname} />
        <AccountLine lastname={userData.lastname} />
        <AccountLine email={userData.email} />
        <AccountLine
          phone_number={
            userData.phone_number ? userData.phone_number : "Pas de numéro"
          }
        />
        <AccountLine password={"Modifier le mot de passe"} />
      </div>
    </section>
  );
}
