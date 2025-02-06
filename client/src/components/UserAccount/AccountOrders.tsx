import { useEffect, useState } from "react";
import styles from "../../styles/UserAccount/AccountOrders.module.css";

interface Order {
  id: number;
  date: string;
  total_amount: number;
  status: "préparation" | "livraison" | "terminé";
  articles: number[];
}

interface Article {
  id: number;
  name: string;
}

export default function AccountOrders() {
  const userId = sessionStorage.getItem("user");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

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
            setOrders(
              data.map((order) => ({
                ...order,
                articles: JSON.parse(order.articles),
              })),
            );
          } else {
            setOrders([
              {
                ...data,
                articles: JSON.parse(data.articles),
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des commandes:", error.message);
          setOrders([]);
        });
    }
  }, [userId]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) =>
        console.error("Erreur lors du fetch des articles:", error),
      );
  }, []);

  //Message personnalisé en fonction du statut de la commande
  const statusMessages: { [key in Order["status"]]: string } = {
    préparation: "En cours de préparation",
    livraison: "En cours de livraison",
    terminé: "Commande livrée",
  };

  function getOrderStatusMessage(order: Order) {
    return statusMessages[order.status] || "Statut inconnu";
  }

  function getGroupedArticles(orderArticles: number[], allArticles: Article[]) {
    const articleCount: Record<number, number> = {};

    for (const articleId of orderArticles) {
      articleCount[articleId] = (articleCount[articleId] || 0) + 1;
    }

    return Object.keys(articleCount)
      .map((articleId) => {
        const article = allArticles.find((a) => a.id === Number(articleId));
        if (!article) return null;

        return {
          ...article,
          quantity: articleCount[article.id],
        };
      })
      .filter(Boolean) as (Article & { quantity: number })[];
  }

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
                    id={selectedOrder === order.id ? styles.close : styles.open}
                  >
                    {selectedOrder === order.id ? "close" : "arrow_back"}
                  </span>
                  <span className={styles.seeMore}>
                    {selectedOrder === order.id ? "Voir moins" : "Voir plus"}
                  </span>
                </button>
              </div>
              {selectedOrder === order.id && (
                <div className={styles.orderDetails}>
                  <section className={styles.orderDate}>
                    <p className={styles.category}>Commande effectuée le :</p>
                    <p>{order.date.split("T")[0]}</p>
                  </section>
                  <section className={styles.orderPrice}>
                    <p className={styles.category}>Total :</p>
                    <p>{order.total_amount} €</p>
                  </section>
                  <section className={styles.orderStatus}>
                    <p className={styles.category}>Statut : </p>
                    <p>{getOrderStatusMessage(order)}</p>
                  </section>
                  <section className={styles.orderArticles}>
                    <p className={styles.category}>Articles :</p>
                    <ul>
                      {getGroupedArticles(order.articles, articles).map(
                        (article) => (
                          <li key={article.id} className={styles.articleCount}>
                            {article.name}

                            <p className={styles.quantity}>
                              Qté :{" "}
                              <span className={styles.quantityCount}>
                                {article.quantity}
                              </span>
                            </p>
                          </li>
                        ),
                      )}
                    </ul>
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
