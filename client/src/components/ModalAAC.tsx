import styles from "../styles/ModalAAC.module.css";

type ModalAACProps = {
  handleCloseModal: () => void;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
    description: string;
    format: string;
    stock: number;
    price: number;
  };
};

export default function ModalAAC({
  handleCloseModal,
  name,
  photos,
}: ModalAACProps) {
  return (
    <div className={styles.modalAAC}>
      <form>
        <h2>Modification de {photos.name}</h2>
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
            value={photos.name}
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
            value={photos.description}
          />
        </label>
        <label htmlFor="collection">
          Collection
          <input
            type="text"
            id="collection"
            name="collection"
            placeholder="Nom de la collection de l'article (déjà existante)"
            value={name}
          />
        </label>
        <label htmlFor="format">
          Format
          <input
            type="text"
            id="format"
            name="format"
            placeholder={`Format de l'article "LONGUEURxLARGUEURcm"`}
            value={photos.format}
          />
        </label>
        <label htmlFor="stock">
          Stock
          <input
            type="text"
            id="stock"
            name="stock"
            placeholder="Nombre de stock disponible de l'article"
            value={photos.stock}
          />
        </label>
        <label htmlFor="price">
          Prix
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Prix de l'article en euros (€)"
            value={photos.price}
          />
        </label>
        <button className={styles.confirm} type="button">
          Confirmer la modification
        </button>
      </form>
    </div>
  );
}
