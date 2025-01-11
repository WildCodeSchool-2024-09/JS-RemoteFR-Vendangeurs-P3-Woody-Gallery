import { useEffect, useState } from "react";
import styles from "../styles/HomeLastCollection.module.css";

type Collection = {
  collectionId: number;
  collectionName: string;
  photos: {
    photoId: number;
    name: string;
    image: string;
    price: string;
  };
};

export default function HomeLastCollection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections/2/photos`)
      .then((response) => response.json())
      .then((data: Collection[]) => {
        setCollections(data);
      });
  }, []);

  const filteredCollections = collections.filter((maxItem) =>
    [10, 12, 13].includes(maxItem.photos.photoId),
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

  return (
    <section className={styles.lastCollection}>
      <div className={styles.container}>
        <div className={styles.carouselLC}>
          {filteredCollections.length > 0 &&
            filteredCollections.map((collection, index) => (
              <figure
                key={collection.collectionId}
                className={index === currentIndex ? styles.active : styles.off}
              >
                <img
                  src={collection.photos.image}
                  alt={collection.photos.name}
                />
              </figure>
            ))}
        </div>
        <article>
          <h3>Dernière collection</h3>
          <h2>Collection {collections[0]?.collectionName}</h2>
        </article>
      </div>
      <div className={styles.timer} />
    </section>
  );
}
