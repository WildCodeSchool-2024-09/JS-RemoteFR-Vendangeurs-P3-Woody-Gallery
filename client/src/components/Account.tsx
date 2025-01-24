import { useEffect, useState } from "react";

import styles from "../styles/Account.module.css";
import AccountLine from "./AccountLine";

export default function Account() {
  const user = sessionStorage.getItem("user");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchUserData = () => {
      if (user) {
        fetch(`${import.meta.env.VITE_API_URL}/api/users/${user}`)
          .then((response) => response.json())
          .then((data) => setUserData(data));
      }
    };

    fetchUserData();
  }, [user]);

  const handleReload = () => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${user}`)
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  };

  return (
    <section className={styles.account}>
      <div className={styles.container}>
        <AccountLine firstname={userData.firstname} onReload={handleReload} />
        <AccountLine lastname={userData.lastname} onReload={handleReload} />
        <AccountLine email={userData.email} onReload={handleReload} />
        <AccountLine
          phone_number={
            userData.phone_number ? userData.phone_number : "Pas de numéro"
          }
          onReload={handleReload}
        />
        <AccountLine
          password={"Modifier le mot de passe"}
          onReload={handleReload}
        />
      </div>
    </section>
  );
}
