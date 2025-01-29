import { useState } from "react";
import styles from "../styles/AccountOrders.module.css";

export default function AccountOrders() {
  // const users = sessionStorage.getItem("user");
  // const [orders, setOrders] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const toggleClick = (orderId: number) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  // useEffect(() => {
  //   if (users) {
  //     fetch(`${import.meta.env.VITE_API_URL}/api/orders/${users}`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(
  //             `Erreur ${response.status}: Commandes non trouvées.`,
  //           );
  //         }
  //         return response.json();
  //       })
  //       .then((data) => setOrders(data))
  //       .catch((error) => {
  //         console.error("Erreur lors du fetch des commandes:", error.message);
  //       });
  //   }
  // }, [users]);

  const orders = [
    {
      id: 123456,
      date: "2025-01-14",
      total_amount: 23.59,
      status: "En cours de livraison",
    },
    {
      id: 12454577,
      date: "2025-01-14",
      total_amount: 23.59,
      status: "En cours de livraison",
    },
  ];

  return (
    <section className={styles.orders}>
      <section className={styles.container}>
        {orders.length === 0 ? (
          <div className={styles.noOrderContainer}>
            <p id={styles.noOrder}>Aucune commande passée</p>
          </div>
        ) : (
          orders.map((order) => (
            <section key={order.id} className={styles.orderMini}>
              <div className={styles.orderHeader}>
                <p id={styles.orderNumber}>Commande n° : {order.id}</p>
                <button
                  type="button"
                  id={styles.orderDetailsButton}
                  onClick={() => toggleClick(order.id)}
                >
                  <span
                    className={`material-symbols-outlined ${styles.openIcon}`}
                  >
                    {selectedOrder === order.id ? "close" : "arrow_back"}
                  </span>
                </button>
              </div>
              {selectedOrder === order.id && (
                <div className={styles.orderDetails}>
                  <section className={styles.orderDate}>
                    <p>{`Commande effectuée le : ${order.date}`}</p>
                  </section>
                  <section className={styles.orderPrice}>
                    <p>{`Total : ${order.total_amount} €`}</p>
                  </section>
                  <section className={styles.orderStatus}>
                    <p>{`Statut : ${order.status}`}</p>
                  </section>
                </div>
              )}
            </section>
          ))
        )}
      </section>
    </section>
  );
}
