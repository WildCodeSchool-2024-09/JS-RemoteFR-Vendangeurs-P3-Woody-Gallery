import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/UserAccount/AccountFavorite.module.css";

interface Article {
  id: number;
  name: string;
  stock: number;
}

export default function FavoriteAccount() {
  const favorites = localStorage.getItem("favorites");
  const [articles, setArticles] = useState<Article[]>([]);

  const favoriteIds = favorites ? JSON.parse(favorites) : [];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors du fetch des articles:", error),
      );
  }, []);

  return (
    <section className={styles.favorites}>
      <section className={styles.container}>
        {favoriteIds?.length === 0 ? (
          <div className={styles.noFavoritesContainer}>
            <p id={styles.noFavorite}>Aucun favoris enregistré</p>
          </div>
        ) : (
          <>
            <ul>
              {articles
                .filter((article) => favoriteIds.includes(article.id))
                .map((article) => (
                  <section key={article.id} className={styles.favoriteArticles}>
                    <NavLink to={`/shop/article/${article.id}`}>
                      <li className={styles.name}>{article.name}</li>
                    </NavLink>
                    {article.stock > 0 ? (
                      <p className={styles.stock}>
                        <span
                          className={`material-symbols-outlined ${styles.inStockIcon}`}
                        >
                          circle
                        </span>
                        En stock
                      </p>
                    ) : (
                      <p className={styles.stock}>
                        <span
                          className={`material-symbols-outlined ${styles.outOfStockIcon}`}
                        >
                          circle
                        </span>
                        En rupture
                      </p>
                    )}
                  </section>
                ))}
            </ul>
          </>
        )}
      </section>
    </section>
  );
}
