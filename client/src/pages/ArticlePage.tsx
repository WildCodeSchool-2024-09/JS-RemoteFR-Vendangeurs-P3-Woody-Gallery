import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ArticleDetails from "../components/ShopPage/ArticlePage/ArticleDetails";
import SimilarArticlesCarousel from "../components/ShopPage/ArticlePage/SimilarArticlesCarousel";
import styles from "../styles/ShopPage/ArticlePage/ArticleDetails.module.css";

type Article = {
  id: number;
  name: string;
  price: string;
  format: string;
  description: string;
  image: string;
  collection_id: number;
};

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'article.");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!article) {
    return <p>Aucun article trouvé.</p>;
  }

  return (
    <>
      <h2 id="topOfPage" className={styles.shopTitle}>
        Shop
      </h2>
      <ArticleDetails
        id={article.id}
        name={article.name}
        price={article.price}
        format={article.format}
        image={article.image}
        description={article.description}
      />
      <SimilarArticlesCarousel
        collection_id={article.collection_id}
        articleId={article.id}
      />
    </>
  );
}
