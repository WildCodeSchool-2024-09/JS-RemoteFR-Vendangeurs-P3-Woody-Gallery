import styles from "../styles/AdminArticlesCard.module.css";

type Article = {
  id: number;
  name: number;
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

export default function AdminArticlesCard({ name, photos }: Article) {
  const numberChar = photos.description.length;

  return (
    <ul className={styles.adminArticlesCard}>
      <li>{photos.name}</li>
      <li>
        <figure>
          <img src={photos.image} alt={photos.name} />
        </figure>
      </li>
      <li>{numberChar} charactères</li>
      <li>{name}</li>
      <li>{photos.format}</li>
      <li className={photos.stock <= 5 ? styles.urgent : ""}>{photos.stock}</li>
      <li className={styles.last}>
        <button className="material-symbols-outlined" type="button">
          edit_square
        </button>
        <button
          className={`material-symbols-outlined ${styles.delete}`}
          type="button"
        >
          delete
        </button>
      </li>
    </ul>
  );
}
