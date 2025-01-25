import { useEffect, useState } from "react";
import isfavorite from "/isfavorite.png";
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

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites: number[];

    if (!isFavorite) {
      updatedFavorites = [...favorites, id];
    } else {
      updatedFavorites = favorites.filter((fav: number) => fav !== id);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div className={styles.articleDetails}>
      <figure className={styles.photoContainer}>
        <img src={image} alt={name} className={styles.articlePhoto} />
      </figure>
      <div className={styles.backgroundArticleWhite}>
        <div className={styles.articlesContain}>
          <h3>{name}</h3>
          <button
            type="button"
            className={`material-symbols-outlined ${styles.favoriteIcon}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              "favorite"
            ) : (
              <img src={isfavorite} alt="coeur rouge" />
            )}
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
          <hr />
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
