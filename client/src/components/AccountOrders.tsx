import { useEffect, useState } from "react";
import styles from "../styles/AccountOrders.module.css";

interface Order {
  id: number;
  date: string;
  total_amount: number;
  status: string;
}

export default function AccountOrders() {
  const userId = sessionStorage.getItem("user");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const toggleClick = (orderId: number) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/orders/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erreur ${response.status}: Commandes non trouvées.`,
            );
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            const parsedOrder = {
              ...data,
              articles: JSON.parse(data.articles),
            };
            setOrders([parsedOrder]);
          }
          // console.log("data:", data);
          // console.log("orders:", orders);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des commandes:", error.message);
          setOrders([]);
        });
    }
  }, [userId]);

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
                <p id={styles.orderNumber}>Commande n° : 000{order.id}</p>
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
