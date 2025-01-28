import styles from "../styles/ModalAAC.module.css";

type ModalAACProps = {
  handleCloseModal: () => void;
};

export default function ModalCreateArticle({
  handleCloseModal,
}: ModalAACProps) {
  return (
    <div className={styles.modalAAC}>
      <form>
        <h2>Création de l'article</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className={`material-symbols-outlined ${styles.exit}`}
        >
          close
        </button>
        <label htmlFor="name">
          Nom
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom de l'article"
          />
        </label>
        <label className={styles.file} htmlFor="image">
          Image
          <input type="file" id="image" name="image" />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description de l'article"
          />
        </label>
        <label htmlFor="collection">
          Collection
          <input
            type="text"
            id="collection"
            name="collection"
            placeholder="Nom de la collection de l'article (déjà existante)"
          />
        </label>
        <label htmlFor="format">
          Format
          <input
            type="text"
            id="format"
            name="format"
            placeholder={`Format de l'article "LONGUEURxLARGUEURcm"`}
          />
        </label>
        <label htmlFor="stock">
          Stock
          <input
            type="text"
            id="stock"
            name="stock"
            placeholder="Nombre de stock disponible de l'article"
          />
        </label>
        <label htmlFor="price">
          Prix
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Prix de l'article en euros (€)"
          />
        </label>
        <button className={styles.confirm} type="button">
          Confirmer la modification
        </button>
      </form>
    </div>
  );
}
