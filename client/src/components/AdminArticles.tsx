import { useEffect, useState } from "react";
import styles from "../styles/AdminArticles.module.css";
import AdminArticlesCard from "./AdminArticlesCard";

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

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collection-articles`)
      .then((response) => response.json())
      .then((data: Article[]) => setArticles(data));
  }, []);

  return (
    <div className={styles.adminArticles}>
      <div className={styles.interraction}>
        <input type="text" />
        <button
          className={`material-symbols-outlined ${styles.search}`}
          type="button"
        >
          search
        </button>
        <button className={styles.tri} type="button">
          Tri
        </button>
        <button
          className={`material-symbols-outlined ${styles.addArticles}`}
          type="button"
        >
          add <p>Ajouter un articles</p>
        </button>
      </div>
      <ul className={styles.list}>
        <li>Nom</li>
        <li>Image</li>
        <li>Description</li>
        <li>Collection</li>
        <li>Format</li>
        <li>Stock</li>
        <li className={styles.last}>Actions</li>
      </ul>
      {articles.map((article) => (
        <AdminArticlesCard
          key={article.photos.id}
          id={article.photos.id}
          name={article.name}
          photos={article.photos}
        />
      ))}
    </div>
  );
}
