import { useEffect, useState } from "react";
import { useUsers } from "../../../contexts/AdminUsersContext";
import styles from "../../../styles/AdminPage/Users/AdminUsers.module.css";
import AdminUsersCard from "./AdminUsersCard";

export default function AdminUsers() {
  const [search, setSearch] = useState<string>("");
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  });

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
        <li>Commandes effectuées</li>
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
      {search && usersSearch.length === 0 && (
        <p className={styles.notFound}>
          Aucun utilisateur ne correspond à votre recherche
        </p>
      )}
    </div>
  );
}
