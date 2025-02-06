import { useEffect, useState } from "react";
import styles from "../../../styles/AdminPage/Users/AdminUsersCard.module.css";
import ModalDeleteUsers from "./ModalDeleteUsers";
import UserModal from "./UserModal";

type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  addresses: {
    street_number: string;
    street_name: string;
    postal_code: string;
    city: string;
    country: string;
  };
  ratings: {
    rating: number;
    comment: string;
    date: string;
  };
};

type Orders = {
  id: number;
  articles: number[];
  total_amount: number;
  date: string;
  status: "préparation" | "livraison" | "terminé";
  user_id: number;
};

export default function AdminUsersCard({
  id,
  firstname,
  lastname,
  email,
  phone_number,
  addresses,
  ratings,
}: Users) {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [seeUser, setSeeUser] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteOpen = () => {
    setIsDelete(true);
  };

  const handleDeleteFalse = () => {
    setIsDelete(false);
  };

  const handleOpenUser = () => {
    setSeeUser(true);
  };

  const handleCloseUser = () => {
    setSeeUser(false);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, [id]);

  const ordersInProgress = orders.filter(
    (order) => order.status === "préparation" || order.status === "livraison",
  ).length;
  const ordersCompleted = orders.filter(
    (order) => order.status === "terminé",
  ).length;

  return (
    <>
      <ul className={styles.adminUsersCard}>
        <li>{lastname}</li>
        <li>{firstname}</li>
        <li>
          {ordersInProgress
            ? `${ordersInProgress} : commande(s) en cours`
            : "Aucune commande en cours"}
        </li>
        <li>
          {ordersCompleted
            ? `${ordersCompleted} : commande(s) terminée(s)`
            : "Aucune commande effectuée"}
        </li>
        <li>{ratings.comment ? ratings.comment : "Aucun avis"}</li>
        <li className={styles.last}>
          <button
            onClick={handleOpenUser}
            className="material-symbols-outlined"
            type="button"
          >
            edit_square
          </button>
          <button
            onClick={handleDeleteOpen}
            className={`material-symbols-outlined ${styles.delete}`}
            type="button"
          >
            delete
          </button>
        </li>
      </ul>
      {seeUser && (
        <UserModal
          handleCloseUser={handleCloseUser}
          id={id}
          firstname={firstname}
          lastname={lastname}
          email={email}
          phone_number={phone_number}
          addresses={addresses}
          ratings={ratings}
          orders={orders}
        />
      )}
      {isDelete && (
        <ModalDeleteUsers
          id={id}
          firstname={firstname}
          lastname={lastname}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </>
  );
}
