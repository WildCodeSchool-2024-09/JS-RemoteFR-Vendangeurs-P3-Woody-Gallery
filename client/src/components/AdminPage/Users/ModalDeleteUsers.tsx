import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../contexts/AdminUsersContext";
import styles from "../../../styles/AdminPage/Articles/ModalDeleteArticle.module.css";

type ModalProps = {
  handleDeleteFalse: () => void;
  id: number;
  firstname: string;
  lastname: string;
};

export default function ModalDeleteUsers({
  id,
  firstname,
  lastname,
  handleDeleteFalse,
}: ModalProps) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const { fetchUsers } = useUsers();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(e.target.value === "Supprimer");
  };

  const handleDelete = async () => {
    if (!isValid) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      await fetchUsers();
      handleDeleteFalse();
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDelete();
    }
  };

  return (
    <div className={styles.modalDeleteArticle}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Confirmer la suppression ?</h2>
        <button
          onClick={handleDeleteFalse}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <p>
          Nom de l'utilisateur :{" "}
          <span>
            {firstname} {lastname}
          </span>
        </p>
        <p>
          Entrez "<span className={styles.delete}>Supprimer</span>" pour valider
          la suppression de l'utilisateur.
        </p>
        <input onChange={handleCheck} onKeyDown={handleKeyDown} type="text" />
        <div>
          <button
            onClick={handleDeleteFalse}
            className={`material-symbols-outlined ${styles.cancelDelete}`}
            type="button"
          >
            <p>Annuler</p> cancel
          </button>
          <button
            onClick={handleDelete}
            className={`material-symbols-outlined ${isValid ? styles.valideDelete : styles.usualDelete}`}
            type="button"
          >
            <p>Valider</p> delete
          </button>
        </div>
      </form>
    </div>
  );
}
