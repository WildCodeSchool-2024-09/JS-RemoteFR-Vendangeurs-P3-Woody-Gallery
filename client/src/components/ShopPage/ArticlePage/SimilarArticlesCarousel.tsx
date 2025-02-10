import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/ShopPage/ArticlePage/SimilarArticlesCarousel.module.css";

type Article = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
    price: string;
  };
};

type SimilarArticlesCarouselProps = {
  collection_id: number;
  articleId: number;
};

export default function SimilarArticlesCarousel({
  collection_id,
  articleId,
}: SimilarArticlesCarouselProps) {
  const [similarArticles, setSimilarArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collectionShow, setCollectionShow] = useState(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsVisible(true);
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/collections/${collection_id}/photos`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement.");
        }
        return response.json();
      })
      .then((data: Article[]) => setSimilarArticles(data))
      .catch((err) => console.error(err));

    handleMediaQ();
    window.addEventListener("resize", handleMediaQ);
    return () => window.removeEventListener("resize", handleMediaQ);
  }, [collection_id]);

  const handleMediaQ = () => {
    if (window.innerWidth >= 1000) {
      setCollectionShow(4);
    } else {
      setCollectionShow(1);
    }
  };

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

  const visibleCollections = [];
  for (let i = 0; i < collectionShow; i++) {
    const collection =
      similarArticles[(currentIndex + i) % similarArticles.length];
    if (collection) {
      visibleCollections.filter((photos) => photos.photos.id !== articleId);
      visibleCollections.push(collection);
    }
  }

  const scrollToTop = () => {
    const topElement = document.getElementById("topOfPage");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <h2 className={styles.h2ArticlesCarousel}>Retrouvez Également</h2>
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
          {visibleCollections.map((article) => (
            <div key={article.photos.id} className={styles.articleCard}>
              <figure>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${article.photos.image}`}
                  alt={article.photos.name}
                />
                {article.id === 2 && <p className={styles.news}>nouveauté</p>}
                <p className={styles.name}>{article.photos.name}</p>
                <p className={styles.price}>{article.photos.price} €</p>
              </figure>
              <div
                className={isVisible ? styles.articleOverlay : styles.modalOff}
                id={styles.modal}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onFocus={handleMouseOver}
                onBlur={handleMouseOut}
              >
                <NavLink
                  to={`/shop/article/${article.photos.id}`}
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
