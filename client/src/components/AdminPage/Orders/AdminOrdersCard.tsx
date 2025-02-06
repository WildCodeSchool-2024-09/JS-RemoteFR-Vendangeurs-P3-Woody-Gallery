import { useEffect, useState } from "react";
import styles from "../../../styles/AdminPage/Orders/AdminOrdersCard.module.css";
import ModalChangeStatus from "./ModalChangeStatus";
import ModalDeleteOrder from "./ModalDeleteOrder";

type OrdersProps = {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  order: {
    id: number;
    articles: string | number[];
    status: "préparation" | "livraison" | "terminé";
    user_id: number;
  };
  onReload: () => void;
};

interface Article {
  id: number;
  name: string;
}

export default function AdminOrdersCard({
  user,
  order,
  onReload,
}: OrdersProps) {
  const [modalChangeStatus, setModalChangeStatus] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const STATUS_FLOW = ["préparation", "livraison", "terminé"];

  const statusMessages: { [key in OrdersProps["order"]["status"]]: string } = {
    préparation: "Nouvelle commande",
    livraison: "Commande envoyée",
    terminé: "Commande livrée",
  };

  function getOrderStatusMessage(order: OrdersProps["order"]) {
    return statusMessages[order.status] || "Statut inconnu";
  }

  const getNextStatus = (currentStatus: string) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    return currentIndex < STATUS_FLOW.length - 1
      ? STATUS_FLOW[currentIndex + 1]
      : null;
  };

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

  const handleChangeStatus = async () => {
    const nextStatus = getNextStatus(order.status);
    if (!nextStatus) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        },
      );
      if (response.ok) {
        onReload();
      } else if (response.status === 404) {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (err) {
      console.error("Erreur lors de la modification du statut:", err);
    }
    setModalChangeStatus(false);
  };

  const handleDeleteOrder = async () => {
    try {
      if (isValid && isClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/${order.id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          onReload();
        } else {
          console.error("Erreur lors de la suppression de la commande");
        }
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de la commande :", err);
    }

    setModalDelete(false);
  };

  const formatOrderNumber = (id: number) => {
    return id.toString().padStart(4, "0");
  };

  return (
    <>
      <ul className={styles.adminOrdersCard}>
        <li>{user.lastname}</li>
        <li>{user.firstname}</li>
        <li>{formatOrderNumber(order.id)}</li>
        <li className={styles.noBorderLi}>
          <ul>
            {getGroupedArticles(
              typeof order.articles === "string"
                ? JSON.parse(order.articles)
                : order.articles,
              articles,
            ).map((article) => (
              <li key={article.id} className={styles.articleCount}>
                {article.name}
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.noBorderLi}>
          <ul>
            {" "}
            {getGroupedArticles(
              typeof order.articles === "string"
                ? JSON.parse(order.articles)
                : order.articles,
              articles,
            ).map((article) => (
              <li key={article.id} className={styles.articleCount}>
                {article.quantity}
              </li>
            ))}
          </ul>
        </li>
        <li>{getOrderStatusMessage(order)}</li>
        <li className={styles.last}>
          {getNextStatus(order.status) && (
            <button
              onClick={() => setModalChangeStatus(true)}
              className={`material-symbols-outlined ${styles.statusButton}`}
              type="button"
            >
              {order.status === "préparation" ? "hourglass" : "local_shipping"}
            </button>
          )}
          <button
            onClick={() => setModalDelete(true)}
            className={`material-symbols-outlined ${styles.delete}`}
            type="button"
          >
            delete
          </button>
        </li>
      </ul>

      {modalChangeStatus && (
        <ModalChangeStatus
          handleCloseModalStatus={() => setModalChangeStatus(false)}
          onConfirm={handleChangeStatus}
          nextStatus={getNextStatus(order.status)}
        />
      )}

      {modalDelete && (
        <ModalDeleteOrder
          handleCloseModalDelete={() => setModalDelete(false)}
          onConfirm={handleDeleteOrder}
          isValid={isValid}
          setIsValid={setIsValid}
          setIsClicked={setIsClicked}
        />
      )}
    </>
  );
}
