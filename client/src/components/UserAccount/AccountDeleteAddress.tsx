import styles from "../../styles/AdminPage/Orders/ModalChangeStatus.module.css";

interface AccountDeleteAddressProps {
  handleCloseModalDelete: () => void;
  onConfirm: () => void;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountDeleteAddress({
  handleCloseModalDelete,
  onConfirm,
  setDeleteIsClicked,
  isValid,
  setIsValid,
}: AccountDeleteAddressProps) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "Supprimer") {
      setIsValid(true);
      setDeleteIsClicked(true);
    } else {
      setIsValid(false);
    }
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
          onKeyDown={handleCloseModalDelete}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <p>
          Entrez "<span className={styles.delete}>Supprimer</span>" pour valider
          la suppression de l'adresse'.
        </p>
        <input onChange={handleCheck} onKeyDown={handleKeyDown} type="text" />
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
