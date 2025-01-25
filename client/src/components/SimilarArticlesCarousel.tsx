import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/SimilarArticlesCarousel.module.css";

type Article = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type SimilarArticlesCarouselProps = {
  articleId: number;
};

export default function SimilarArticlesCarousel({
  articleId,
}: SimilarArticlesCarouselProps) {
  const [similarArticles, setSimilarArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsVisible(true);
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos/${articleId}/similar`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des articles similaires.");
        }
        return response.json();
      })
      .then((data: Article[]) => setSimilarArticles(data))
      .catch((err) => console.error(err));
  }, [articleId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? similarArticles.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === similarArticles.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (similarArticles.length === 0) {
    return <p>Aucun article similaire trouvé.</p>;
  }

  const scrollToTop = () => {
    const topElement = document.getElementById("topOfPage");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <h2>Retrouvez Également</h2>
      <div className={styles.carousel}>
        <span
          className={`${styles.prev} material-symbols-outlined`}
          onClick={handlePrev}
          onKeyUp={(e) => {
            if (e.key === "Enter") handlePrev();
          }}
        >
          arrow_forward_ios
        </span>
        <div className={styles.carouselContainCol}>
          {similarArticles
            .slice(currentIndex, currentIndex + 1)
            .map((article) => (
              <div key={article.id} className={styles.articleCard}>
                <figure>
                  <img src={article.image} alt={article.name} />
                </figure>
                <div
                  className={
                    isVisible ? styles.articleOverlay : styles.modalOff
                  }
                  id={styles.modal}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onFocus={handleMouseOver}
                  onBlur={handleMouseOut}
                >
                  <NavLink
                    to={`/shop/article/${article.id}`}
                    onClick={scrollToTop}
                    onKeyDown={scrollToTop}
                    className={styles.viewArticleButton}
                  >
                    VOIR L'ARTICLE
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
        <span
          className={`${styles.next} material-symbols-outlined`}
          onClick={handleNext}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleNext();
          }}
        >
          arrow_forward_ios
        </span>
      </div>
    </>
  );
}
