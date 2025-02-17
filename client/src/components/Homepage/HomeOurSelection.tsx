import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Homepage/HomeOurSelection.module.css";

type Collection = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
  };
};

export default function HomeOurSelection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [visibleId, setVisibleId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collectionsPhotos`)
      .then((response) => response.json())
      .then((data: Collection[]) => {
        setCollections(data);
      });
  }, []);

  const selectedCollections = [
    { id: 12, className: styles.photo4 },
    { id: 26, className: styles.photo5 },
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
          const collection = collections.find(
            (col) => col.photos.id === item.id,
          );
          return collection ? (
            <React.Fragment
              key={`fragmentOurCollection${collection.photos.id}`}
            >
              <figure
                key={`photoOurCollection${collection.photos.id}`}
                className={item.className}
                onMouseOver={() => handleMouseOver(collection.photos.id)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.photos.id)}
                onBlur={handleMouseOut}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${collection.photos.image}`}
                  alt={collection.photos.name}
                />
              </figure>
              <div
                key={`modalOurCollection${collection.photos.id}`}
                className={`${styles.modalPhoto} ${item.className} ${collection.photos.id === visibleId ? styles.modalVisible : styles.modalOff}`}
                onMouseOver={() => handleMouseOver(collection.photos.id)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.photos.id)}
                onBlur={handleMouseOut}
              >
                <NavLink
                  className={styles.aArticle}
                  to={`/shop/article/${collection.photos.id}`}
                >
                  VOIR L'ARTICLE
                </NavLink>
                <NavLink
                  className={styles.aSimilaire}
                  to={`/shop?collection=${collection.id}`}
                >
                  VOIR SIMILAIRE
                </NavLink>
              </div>
            </React.Fragment>
          ) : null;
        })}
      </div>
    </section>
  );
}
