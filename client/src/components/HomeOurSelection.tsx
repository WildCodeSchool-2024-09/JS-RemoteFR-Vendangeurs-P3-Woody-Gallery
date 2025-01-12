import { useEffect, useState } from "react";
import styles from "../styles/HomeOurSelection.module.css";

type Collection = {
  id: number;
  name: string;
  image: string;
};

export default function HomeOurSelection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [visibleId, setVisibleId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data: Collection[]) => {
        setCollections(data);
      });
  }, []);

  const selectedCollections = [
    { id: 32, className: styles.photo1 },
    { id: 19, className: styles.photo2 },
    { id: 7, className: styles.photo3 },
  ];

  const handleMouseOver = (id: number) => {
    setVisibleId(id);
  };

  const handleMouseOut = () => {
    setVisibleId(null);
  };

  return (
    <section className={styles.ourSelection}>
      <h2>Notre sélection</h2>
      <div>
        {selectedCollections.map((item) => {
          const collection = collections.find((col) => col.id === item.id);
          return collection ? (
            <>
              <figure
                key={collection.id}
                className={item.className}
                onMouseOver={() => handleMouseOver(collection.id)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.id)}
                onBlur={handleMouseOut}
              >
                <img src={collection.image} alt={collection.name} />
              </figure>
              <div
                key={collection.id}
                className={`${styles.modalPhoto} ${item.className} ${collection.id === visibleId ? styles.modalVisible : styles.modalOff}`}
                onMouseOver={() => handleMouseOver(collection.id)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.id)}
                onBlur={handleMouseOut}
              >
                <a className={styles.aArticle} href="/article">
                  VOIR L'ARTICLE
                </a>
                <a className={styles.aSimilaire} href="/collection">
                  VOIR SIMILAIRE
                </a>
              </div>
            </>
          ) : null;
        })}
      </div>
    </section>
  );
}
