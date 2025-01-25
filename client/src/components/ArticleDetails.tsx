import { useEffect, useState } from "react";
import styles from "../styles/ArticleDetails.module.css";
import AddToCartButtons from "./AddToCartButtons";

type ArticleDetailsProps = {
  id: number;
  name: string;
  price: string;
  format: string;
  frameType: string;
  image: string;
  description: string;
};

export default function ArticleDetails({
  id,
  name,
  price,
  format,
  image,
  description,
}: ArticleDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // État pour gérer les favoris
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites: number[];

    if (!isFavorite) {
      // Ajouter aux favoris
      updatedFavorites = [...favorites, id];
    } else {
      updatedFavorites = favorites.filter((fav: number) => fav !== id);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.articleDetails}>
      <figure className={styles.photoContainer}>
        <img src={image} alt={name} className={styles.articlePhoto} />
      </figure>
      <div>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <button
            type="button"
            className={`${styles.favoriteIcon} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <p className={styles.price}>{price} €</p>
          <p className={styles.format}>Format : {format}</p>
          <p className={styles.frameType}>Photo imprimé sur toile sans cadre</p>
          <AddToCartButtons />
          <p className={styles.description}>
            {showFullDescription
              ? description
              : `${description.slice(0, 100)}...`}{" "}
          </p>
          <hr className={styles.horizontalLine} />
          <button
            type="button"
            className={styles.seeMore}
            onClick={toggleDescription}
          >
            {showFullDescription ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      </div>
    </div>
  );
}
