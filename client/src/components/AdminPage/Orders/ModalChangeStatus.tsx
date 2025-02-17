import styles from "../../../styles/AdminPage/Orders/ModalChangeStatus.module.css";

interface ModalChangeStatusProps {
  handleCloseModalStatus: () => void;
  onConfirm: () => void;
  nextStatus: string | null;
}

export default function ModalChangeStatus({
  handleCloseModalStatus,
  onConfirm,
  nextStatus,
}: ModalChangeStatusProps) {
  if (!nextStatus) return null;

  return (
    <div className={styles.modalOrderStatus}>
      <form>
        <h2>Changement de statut</h2>
        <p>Voulez-vous changer le statut en "{nextStatus}" ?</p>
        <button
          onClick={handleCloseModalStatus}
          onKeyDown={handleCloseModalStatus}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <div className={styles.actions}>
          <button
            onClick={handleCloseModalStatus}
            className={styles.cancelModifyStatus}
            type="button"
          >
            <p>Annuler</p>
          </button>
          <button
            onClick={onConfirm}
            className={styles.valideDelete}
            type="button"
          >
            <p>Valider</p>
          </button>
        </div>
      </form>
    </div>
  );
}
