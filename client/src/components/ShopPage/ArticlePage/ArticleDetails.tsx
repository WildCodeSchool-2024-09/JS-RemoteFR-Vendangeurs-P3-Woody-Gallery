import { useEffect, useState } from "react";
import isfavorite from "/isfavorite.png";
import styles from "../../../styles/ShopPage/ArticlePage/ArticleDetails.module.css";
import AddToCartButtons from "./AddToCartButtons";

type ArticleDetailsProps = {
  id: number;
  name: string;
  price: string;
  format: string;
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
  const [addToOrder, setAddToOrder] = useState(0);
  const isAuth = localStorage.getItem("isAuth") === "true";

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    setAddToOrder(order.includes(id));
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setShowFullDescription(true);
      } else {
        setShowFullDescription(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFavoriteClick = () => {
    if (isAuth === false) {
      alert("Merci de vous connecter pour ajouter des favoris");
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      let updatedFavorites: number[];

      if (!isFavorite) {
        updatedFavorites = [...favorites, id];
      } else {
        updatedFavorites = favorites.filter((fav: number) => fav !== id);
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    }
  };

  const handleAddToOrder = () => {
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    const updatedOrder = [...order, id];

    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setAddToOrder(1);
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div key={addToOrder} className={styles.articleDetails}>
      <figure className={styles.photoContainer}>
        <img
          src={`${import.meta.env.VITE_API_URL}/${image}`}
          alt={name}
          className={styles.articlePhoto}
        />
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
              <img src={isfavorite} alt="coeur rouge" />
            ) : (
              "favorite"
            )}
          </button>
          <p className={styles.price}>{price} €</p>
          <p className={styles.format}>Format : {format}</p>
          <p className={styles.frameType}>Photo imprimée sur toile</p>
          <AddToCartButtons handleAddToOrder={handleAddToOrder} />
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
