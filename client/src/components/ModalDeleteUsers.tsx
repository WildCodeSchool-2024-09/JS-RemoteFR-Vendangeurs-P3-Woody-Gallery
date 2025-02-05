import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ModalDeleteArticle.module.css";

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "Supprimer") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    if (isValid && isClicked) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "DELETE",
      });
      handleDeleteFalse();
      navigate("/admin/users");
    }
  });

  return (
    <div className={styles.modalDeleteArticle}>
      <form>
        <h2>Confirmer la suppression ?</h2>
        <button
          onClick={handleDeleteFalse}
          onKeyDown={handleDeleteFalse}
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
        <input onChange={handleCheck} type="text" />
        <div>
          <button
            onClick={handleDeleteFalse}
            onKeyDown={handleDeleteFalse}
            className={`material-symbols-outlined ${styles.cancelDelete}`}
            type="button"
          >
            <p>Annuler</p> cancel
          </button>
          <button
            onClick={handleClick}
            onKeyDown={handleClick}
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
