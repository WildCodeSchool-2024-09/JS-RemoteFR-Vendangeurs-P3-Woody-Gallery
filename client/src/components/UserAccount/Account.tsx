import { useEffect, useState } from "react";
import styles from "../../styles/UserAccount/Account.module.css";
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
        <AccountLine
          value={userData.firstname}
          valueName="firstname"
          onReload={handleReload}
        />
        <AccountLine
          value={userData.lastname}
          valueName="lastname"
          onReload={handleReload}
        />
        <AccountLine
          value={userData.email}
          valueName="email"
          onReload={handleReload}
        />
        <AccountLine
          value={
            userData.phone_number ? userData.phone_number : "Pas de numéro"
          }
          valueName="phone_number"
          onReload={handleReload}
        />
        <AccountLine
          value={"Modifier le mot de passe"}
          valueName="password"
          onReload={handleReload}
        />
        <AccountLine
          value={"Supprimer le compte"}
          valueName="deleteAccount"
          onReload={handleReload}
        />
      </div>
    </section>
  );
}
