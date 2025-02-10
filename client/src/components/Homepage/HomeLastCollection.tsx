import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Homepage/HomeLastCollection.module.css";
import AddReview from "./AddReviews";

type Collection = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
    price: string;
  };
};

export default function HomeLastCollection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isAuth = localStorage.getItem("isAuth") === "true";

  const { rating } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections/2/photos`)
      .then((response) => response.json())
      .then((data: Collection[]) => {
        setCollections(data);
      });
  }, []);

  const filteredCollections = collections.filter((maxItem) =>
    [10, 12, 13].includes(maxItem.photos.id),
  );

  useEffect(() => {
    if (filteredCollections.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % filteredCollections.length,
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [filteredCollections.length]);

  const HandleHrClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.lastCollection}>
      <div className={styles.container}>
        <div className={styles.carouselLC}>
          {filteredCollections.length > 0 &&
            filteredCollections.map((collection, index) => (
              <figure
                key={`carouselLC${collection.id}-${index}`}
                className={index === currentIndex ? styles.active : styles.off}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${collection.photos.image}`}
                  alt={collection.photos.name}
                />
              </figure>
            ))}
        </div>
        <article>
          <h3>Dernière collection</h3>
          <h2>Collection </h2>
          {collections[2] && <h2>{collections[2].name}</h2>}
        </article>
        {isAuth && rating && <AddReview />}
      </div>
      <div className={styles.timer}>
        {filteredCollections.map((collection, index) => (
          <hr
            key={`timer${collection.id}-${index}`}
            className={index === currentIndex ? styles.active : styles.disable}
            onClick={() => HandleHrClick(index)}
            onKeyDown={() => HandleHrClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
