import { useCallback, useEffect, useState } from "react";
import AdminOrdersCard from "../components/AdminOrdersCard";
import styles from "../styles/AdminOrdersPage.module.css";

interface UserProps {
  id: number;
  firstname: string;
  lastname: string;
}

interface OrderProps {
  id: number;
  articles: string | number[];
  status: "préparation" | "livraison" | "terminé";
  user_id: number;
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [userIdsWithOrders, setUserIdsWithOrders] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);

        const userIds = new Set<number>(
          data.map((order: OrderProps) => order.user_id),
        );
        setUserIdsWithOrders(userIds);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des commandes :", error),
      );
  }, []);

  useEffect(() => {
    if (userIdsWithOrders.size === 0) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user: UserProps) =>
          userIdsWithOrders.has(user.id),
        );
        setUsers(filteredUsers);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error,
        ),
      );
  }, [userIdsWithOrders]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredOrders = orders.filter((order) => {
    const user = users.find((u) => u.id === order.user_id);
    return (
      user &&
      (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const fetchOrders = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        const userIds = new Set<number>(
          data.map((order: OrderProps) => order.user_id),
        );
        setUserIdsWithOrders(userIds);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des commandes :", error),
      );
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className={styles.adminOrders}>
      <div className={styles.interaction}>
        <input
          placeholder="Recherche par nom"
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
        />
        <button
          className={`material-symbols-outlined ${styles.search}`}
          type="button"
        >
          search
        </button>
      </div>
      <ul className={styles.list}>
        <li>Nom</li>
        <li>Prénom</li>
        <li>Numéro de commande</li>
        <li>Articles</li>
        <li>Quantité</li>
        <li>Statut</li>
        <li className={styles.last}>Actions</li>
      </ul>
      {filteredOrders.map((order) => {
        const user = users.find((u) => u.id === order.user_id);
        return user ? (
          <AdminOrdersCard
            key={order.id}
            user={user}
            order={order}
            onReload={fetchOrders}
          />
        ) : null;
      })}
    </div>
  );
}
