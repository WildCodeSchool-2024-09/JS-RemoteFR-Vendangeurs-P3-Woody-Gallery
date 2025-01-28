import { useEffect, useState } from "react";
import styles from "../styles/AccountOrders.module.css";

export default function AccountOrders() {
  const users = sessionStorage.getItem("user");
  const [orders, setOrders] = useState("");

  useEffect(() => {
    if (users) {
      fetch(`${import.meta.env.VITE_API_URL}/api/orders/${users}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erreur ${response.status}: Commandes non trouvées.`,
            );
          }
          return response.json();
        })
        .then((data) => setOrders(data))
        .catch((error) => {
          console.error("Erreur lors du fetch des commandes:", error.message);
        });
    }
  }, [users]);

  return (
    <section className={styles.orders}>
      <section className={styles.container}>
        {orders ? (
          <p id={styles.noOrder}>Aucune commande passée</p>
        ) : (
          <p>Commande n° :{orders}</p>
        )}
      </section>
    </section>
  );
}
