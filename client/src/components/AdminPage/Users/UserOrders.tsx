import React, { useEffect, useState } from "react";
import styles from "../../../styles/AdminPage/Users/UserModal.module.css";

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

interface UserProps {
  orders: Order[];
}

export default function UserOrders({ orders }: UserProps) {
  const [ordersInProgress, setOrdersInProgress] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleOrdersInProgress = (orderId: number) => {
    setOrdersInProgress((prev) => (prev === orderId ? null : orderId));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors du fetch des articles:", error),
      );
  }, []);

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

  const formatOrderNumber = (id: number) => {
    return id.toString().padStart(4, "0");
  };

  const parsedOrdersRun = orders
    .filter(
      (order) => order.status === "préparation" || order.status === "livraison",
    )
    .map((order) => ({
      ...order,
      articles:
        typeof order.articles === "string"
          ? JSON.parse(order.articles)
          : order.articles,
    }));

  const parsedOrdersDone = orders
    .filter((order) => order.status === "terminé")
    .map((order) => ({
      ...order,
      articles:
        typeof order.articles === "string"
          ? JSON.parse(order.articles)
          : order.articles,
    }));

  return (
    <div className={styles.userOrders}>
      <h3>{"Commande(s) en en cours"}</h3>
      <ul>
        {parsedOrdersRun.length > 0 ? (
          parsedOrdersRun.map((order) => (
            <React.Fragment key={order.id}>
              <li>
                <p>Commande n°{formatOrderNumber(order.id)}</p>
                <button
                  className={
                    ordersInProgress !== order.id ? "" : styles.seeMore
                  }
                  onClick={() => handleOrdersInProgress(order.id)}
                  type="button"
                >
                  {ordersInProgress !== order.id ? "Voir plus" : "Voir moins"}
                </button>
              </li>
              {ordersInProgress === order.id ? (
                <React.Fragment key={`commande-${order.id}`}>
                  <li>
                    Commande effectuée le : <p>{order.date.slice(0, 10)}</p>
                  </li>
                  <li>
                    Total : <p>{order.total_amount} €</p>
                  </li>
                  <li>
                    Statut : <p>{getOrderStatusMessage(order)}</p>{" "}
                  </li>
                  <li className={styles.comment}>
                    Articles :
                    {getGroupedArticles(order.articles, articles).map(
                      (article) => (
                        <li key={article.id}>
                          <p>
                            {article.name} (x{article.quantity})
                          </p>
                        </li>
                      ),
                    )}
                  </li>
                </React.Fragment>
              ) : (
                ""
              )}
            </React.Fragment>
          ))
        ) : (
          <li className={styles.noOrder}>Aucune commande en cours</li>
        )}
      </ul>

      <h3>{"Commande(s) terminée(s)"}</h3>
      <ul>
        {parsedOrdersDone.length > 0 ? (
          parsedOrdersDone.map((order) => (
            <React.Fragment key={order.id}>
              <li>
                <p>Commande n°{formatOrderNumber(order.id)}</p>
                <button
                  onClick={() => handleOrdersInProgress(order.id)}
                  type="button"
                >
                  {ordersInProgress !== order.id ? "Voir plus" : "Voir moins"}
                </button>
              </li>
              {ordersInProgress === order.id ? (
                <React.Fragment key={`commande-${order.id}`}>
                  <li>
                    Commande effectuée le : <p>{order.date.slice(0, 10)}</p>
                  </li>
                  <li>
                    Total : <p>{order.total_amount} €</p>
                  </li>
                  <li>
                    Statut : <p>{getOrderStatusMessage(order)}</p>{" "}
                  </li>
                  <li className={styles.comment}>
                    Articles :
                    {getGroupedArticles(order.articles, articles).map(
                      (article) => (
                        <li key={article.id}>
                          <p>
                            {article.name} (x{article.quantity})
                          </p>
                        </li>
                      ),
                    )}
                  </li>
                </React.Fragment>
              ) : (
                ""
              )}
            </React.Fragment>
          ))
        ) : (
          <li className={styles.noOrder}>Aucune commande terminée</li>
        )}
      </ul>
    </div>
  );
}
