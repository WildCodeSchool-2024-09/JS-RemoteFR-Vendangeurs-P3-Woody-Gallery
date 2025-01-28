import styles from "../styles/ModalDeleteArticle.module.css";

export default function ModalDeleteArticle() {
  return (
    <div>
      <form>
        <h2>Confirmer la suppréssion ?</h2>
        <button className={styles.exit} type="button">
          close
        </button>
        <p>Nom de l'article : name</p>
        <p>Entrez "Supprimer" pour valider la suppréssion de l'article.</p>
        <input type="text" />
        <button type="button">Annuler</button>
        <button type="button">Valider</button>
      </form>
    </div>
  );
}
