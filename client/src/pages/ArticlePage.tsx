import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButtons from "../components/AddToCartButtons";
import ArticleDetails from "../components/ArticleDetails";
import SimilarArticlesCarousel from "../components/SimilarArticlesCarousel";
import styles from "../styles/ArticleDetails.module.css";

type Article = {
  id: number;
  name: string;
  price: string;
  format: string;
  frameType: string;
  description: string;
  image: string;
};

export default function ArticlePage() {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL
  const [article, setArticle] = useState<Article | null>(null); // État pour stocker les données de l'article
  const [loading, setLoading] = useState<boolean>(true); // État pour gérer le chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
  const [showBar, setShowBar] = useState(true); // État pour gérer l'affichage de la barre

  useEffect(() => {
    // Appel à l'API pour récupérer les détails de l'article
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

  // Si une erreur survient, afficher un message d'erreur
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Si les données sont en cours de chargement, afficher un message ou un spinner
  if (loading) {
    return <p>Chargement...</p>;
  }

  // Si aucune donnée d'article n'est disponible, afficher un message approprié
  if (!article) {
    return <p>Aucun article trouvé.</p>;
  }

  // Affichage des détails de l'article, des boutons et des articles similaires
  return (
    <div>
      {/* Barre décorative avec le titre */}
      <h2 className={styles.decorativeTitle}>Shop</h2>
      {/* Nouvelle barre décorative seule */}

      {/* Article details */}
      <ArticleDetails
        name={article.name}
        price={article.price}
        format={article.format}
        frameType={article.frameType}
        image={article.image}
      />
      {/* Barre conditionnelle */}
      {showBar && <div className={styles.thinDecorativeBar2} />}

      {/* Composant AddToCartButtons */}
      <AddToCartButtons
        description={article.description || "Description indisponible"}
        onToggleBar={(visible) => setShowBar(visible)} // Gère l'état de la barre
      />

      <div className={styles.thinDecorativeBar3} />
      {/* Barre décorative avec le titre */}
      <h2 className={styles.decorativeTitle}>RETROUVEZ ÉGALEMENT</h2>
      <SimilarArticlesCarousel articleId={Number(id)} />
    </div>
  );
}
