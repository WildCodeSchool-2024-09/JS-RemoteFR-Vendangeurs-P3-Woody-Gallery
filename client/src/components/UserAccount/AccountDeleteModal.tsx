import { useState } from "react";
import styles from "../../styles/AdminPage/Orders/ModalChangeStatus.module.css";

interface AccountDeleteModalProps {
  handleCloseModalDelete: () => void;
  onConfirm: () => void;
}

export default function AccountDeleteModal({
  handleCloseModalDelete,
  onConfirm,
}: AccountDeleteModalProps) {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(e.target.value === "Supprimer");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <div className={styles.modalDeleteOrder}>
      <form>
        <h2>Confirmer la suppression ?</h2>
        <button
          onClick={handleCloseModalDelete}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <p>
          Entrez "<span className={styles.delete}>Supprimer</span>" pour valider
          la suppression du compte. Cette action est irréversible !
        </p>
        <input
          onChange={handleCheck}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Tapez 'Supprimer'"
          className={styles.inputs}
        />

        <div className={styles.actions}>
          <button
            onClick={handleCloseModalDelete}
            className={`material-symbols-outlined ${styles.cancelDelete}`}
            type="button"
          >
            <p>Annuler</p> cancel
          </button>
          <button
            onClick={onConfirm}
            className={`material-symbols-outlined ${isValid ? styles.valideDelete : styles.usualDelete}`}
            type="button"
            disabled={!isValid}
          >
            <p>Valider</p> delete
          </button>
        </div>
      </form>
    </div>
  );
}
