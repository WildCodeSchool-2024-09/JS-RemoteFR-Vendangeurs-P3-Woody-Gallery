import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import styles from "../../../styles/AdminPage/Articles/ModalDeleteArticle.module.css";

type ModalDeleteProps = {
  handleCloseModalDelete: () => void;
  photos: {
    id: number;
    name: string;
  };
};

export default function ModalDeleteArticle({
  handleCloseModalDelete,
  photos,
}: ModalDeleteProps) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { fetchArticles } = useArticles();
  const navigate = useNavigate();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(e.target.value === "Supprimer");
  };

  const handleDelete = async () => {
    if (!isValid) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/photos/${photos.id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      await fetchArticles();
      handleCloseModalDelete();
      navigate("/admin/articles");
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
          onClick={handleCloseModalDelete}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <p>
          Nom de l'article : <span>{photos.name}</span>
        </p>
        <p>
          Entrez "<span className={styles.delete}>Supprimer</span>" pour valider
          la suppression de l'article.
        </p>
        <input onChange={handleCheck} onKeyDown={handleKeyDown} type="text" />
        <div>
          <button
            onClick={handleCloseModalDelete}
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
