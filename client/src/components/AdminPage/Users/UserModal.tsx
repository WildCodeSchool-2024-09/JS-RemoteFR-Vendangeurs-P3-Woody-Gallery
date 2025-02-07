import { useState } from "react";
import styles from "../../../styles/AdminPage/Users/UserModal.module.css";
import UserAddresses from "./UserAddresses";
import UserContacts from "./UserContacts";
import UserOrders from "./UserOrders";
import UserReviews from "./UserReviews";

type UserModalProps = {
  handleCloseUser: () => void;
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
  orders: {
    id: number;
    articles: number[];
    total_amount: number;
    date: string;
    status: "préparation" | "livraison" | "terminé";
    user_id: number;
  }[];
};

export default function UserModal({
  handleCloseUser,
  firstname,
  lastname,
  email,
  phone_number,
  addresses,
  ratings,
  orders,
}: UserModalProps) {
  const [menu, setMenu] = useState<string>("contacts");

  const handleContacts = () => {
    setMenu("contacts");
  };

  const handleAddress = () => {
    setMenu("addresses");
  };

  const handleReviews = () => {
    setMenu("reviews");
  };

  const handleOrder = () => {
    setMenu("oders");
  };

  return (
    <div className={styles.userModal}>
      <div>
        <h2>
          Utilisateur : {firstname} {lastname}{" "}
        </h2>
        <button
          onClick={handleCloseUser}
          type="button"
          className={`material-symbols-outlined ${styles.exit}`}
        >
          close
        </button>
        <ul className={styles.menu}>
          <li
            onClick={handleContacts}
            onKeyDown={handleContacts}
            className={menu === "contacts" ? styles.currentLi : ""}
          >
            Contacts
          </li>
          <li
            onClick={handleAddress}
            onKeyDown={handleAddress}
            className={menu === "addresses" ? styles.currentLi : ""}
          >
            Adresse
          </li>
          <li
            onClick={handleReviews}
            onKeyDown={handleReviews}
            className={menu === "reviews" ? styles.currentLi : ""}
          >
            Avis
          </li>
          <li
            onClick={handleOrder}
            onKeyDown={handleOrder}
            className={`${styles.lastLi} ${menu === "oders" ? styles.currentLi : ""}`}
          >
            Commandes
          </li>
        </ul>
        <section>
          {menu === "contacts" && (
            <UserContacts
              lastname={lastname}
              firstname={firstname}
              email={email}
              phone_number={phone_number}
            />
          )}
          {menu === "addresses" && <UserAddresses addresses={addresses} />}
          {menu === "reviews" && <UserReviews ratings={ratings} />}
          {menu === "oders" && <UserOrders orders={orders} />}
        </section>
      </div>
    </div>
  );
}
