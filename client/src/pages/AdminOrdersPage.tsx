import { useCallback, useEffect, useState } from "react";
import AdminOrdersCard from "../components/AdminPage/Orders/AdminOrdersCard";
import styles from "../styles/AdminPage/Orders/AdminOrdersPage.module.css";

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
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleSortClick = () => {
    setSortMenuOpen(!sortMenuOpen);
  };

  const handleSortSelection = (status: string | null) => {
    setSelectedStatus(status);
    setSortMenuOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    const user = users.find((u) => u.id === order.user_id);
    const matchesSearch =
      user &&
      (user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus
      ? order.status === selectedStatus
      : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.adminOrders}>
      <div className={styles.interaction}>
        <input
          placeholder="Recherche par nom ou prénom"
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
        <li>
          Statut
          <button
            type="button"
            className={`material-symbols-outlined ${styles.sortStatus}`}
            onClick={handleSortClick}
          >
            filter_list
          </button>
          {sortMenuOpen && (
            <div className={styles.sortMenu}>
              <button
                type="button"
                className={styles.sortButtons}
                onClick={() => handleSortSelection("préparation")}
              >
                Nouvelle commande
              </button>
              <button
                type="button"
                className={styles.sortButtons}
                onClick={() => handleSortSelection("livraison")}
              >
                Commande envoyée
              </button>
              <button
                type="button"
                className={styles.sortButtons}
                onClick={() => handleSortSelection("terminé")}
              >
                Commande livrée
              </button>
              <button
                type="button"
                className={styles.sortButtons}
                onClick={() => handleSortSelection(null)}
              >
                Réinitialiser
              </button>
            </div>
          )}
        </li>
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
      {searchTerm && filteredOrders.length === 0 && (
        <p className={styles.notFound}>
          Aucun utilisateur ne correspond à votre recherche
        </p>
      )}
    </div>
  );
}
