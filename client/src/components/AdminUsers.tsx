import { useEffect, useState } from "react";
import styles from "../styles/AdminUsers.module.css";
import AdminUsersCard from "./AdminUsersCard";

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

export default function AdminUsers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users-list`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const usersSearch = users.filter(
    (user) =>
      user.firstname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      user.lastname.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <div className={styles.adminUsers}>
      <div className={styles.interraction}>
        <input
          onChange={handleSearch}
          placeholder="Recherche par nom ou prénom"
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
        <li>Commandes en cours</li>
        <li>Commandes éffectuées</li>
        <li>Avis</li>
        <li className={styles.last}>Actions</li>
      </ul>
      {usersSearch.map((user) => (
        <AdminUsersCard
          key={user.id}
          id={user.id}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          phone_number={user.phone_number}
          addresses={user.addresses}
          ratings={user.ratings}
        />
      ))}
    </div>
  );
}
