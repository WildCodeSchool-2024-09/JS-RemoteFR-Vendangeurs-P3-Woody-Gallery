import styles from "../../../styles/AdminPage/Orders/ModalChangeStatus.module.css";

interface ModalDeleteOrderProps {
  handleCloseModalDelete: () => void;
  onConfirm: () => void;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalDeleteOrder({
  handleCloseModalDelete,
  onConfirm,
  setIsClicked,
  isValid,
  setIsValid,
}: ModalDeleteOrderProps) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "Supprimer") {
      setIsValid(true);
      setIsClicked(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      onConfirm();
    }
  };

  return (
    <div className={styles.modalDeleteOrder}>
      <form onSubmit={handleSubmit}>
        <h2>Confirmer la suppression ?</h2>
        <button
          onClick={handleCloseModalDelete}
          onKeyDown={handleCloseModalDelete}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <p>
          Entrez "<span className={styles.delete}>Supprimer</span>" pour valider
          la suppression de la commande.
        </p>
        <input onChange={handleCheck} type="text" />
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
