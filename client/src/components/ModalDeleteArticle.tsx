import { useEffect, useState } from "react";
import { useArticles } from "../contexts/AdminArticlesContext";
import styles from "../styles/ModalDeleteArticle.module.css";

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { fetchArticles } = useArticles();

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
      fetch(`${import.meta.env.VITE_API_URL}/api/photos/${photos.id}`, {
        method: "DELETE",
      });
      handleCloseModalDelete();
      fetchArticles();
    }
  });

  return (
    <div className={styles.modalDeleteArticle}>
      <form>
        <h2>Confirmer la suppréssion ?</h2>
        <button
          onClick={handleCloseModalDelete}
          onKeyDown={handleCloseModalDelete}
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
          la suppréssion de l'article.
        </p>
        <input onChange={handleCheck} type="text" />
        <div>
          <button
            onClick={handleCloseModalDelete}
            onKeyDown={handleCloseModalDelete}
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
