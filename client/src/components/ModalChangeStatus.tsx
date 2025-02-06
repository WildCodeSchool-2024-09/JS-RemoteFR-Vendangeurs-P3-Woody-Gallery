import styles from "../styles/ModalChangeStatus.module.css";

interface ModalChangeStatusProps {
  handleCloseModal: () => void;
  onConfirm: () => void;
  nextStatus: string | null;
}

export default function ModalChangeStatus({
  handleCloseModal,
  onConfirm,
  nextStatus,
}: ModalChangeStatusProps) {
  if (!nextStatus) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Changer le statut</h2>
        <p>Voulez-vous changer le statut en "{nextStatus}" ?</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm} type="button">
            Confirmer
          </button>
          <button
            onClick={handleCloseModal}
            className={styles.cancel}
            type="button"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
