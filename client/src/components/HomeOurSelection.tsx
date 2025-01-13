import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomeOurSelection.module.css";

type Collection = {
  collectionId: number;
  collectionName: string;
  photos: {
    photoId: number;
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
            (col) => col.photos.photoId === item.id,
          );
          return collection ? (
            <React.Fragment
              key={`fragmentOurCollection${collection.photos.photoId}`}
            >
              <figure
                key={`photoOurCollection${collection.photos.photoId}`}
                className={item.className}
                onMouseOver={() => handleMouseOver(collection.photos.photoId)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.photos.photoId)}
                onBlur={handleMouseOut}
              >
                <img
                  src={collection.photos.image}
                  alt={collection.photos.name}
                />
              </figure>
              <div
                key={`modalOurCollection${collection.photos.photoId}`}
                className={`${styles.modalPhoto} ${item.className} ${collection.photos.photoId === visibleId ? styles.modalVisible : styles.modalOff}`}
                onMouseOver={() => handleMouseOver(collection.photos.photoId)}
                onMouseOut={handleMouseOut}
                onFocus={() => handleMouseOver(collection.photos.photoId)}
                onBlur={handleMouseOut}
              >
                <NavLink
                  className={styles.aArticle}
                  to={`/shop/article/${collection.photos.photoId}`}
                >
                  VOIR L'ARTICLE
                </NavLink>
                <NavLink
                  className={styles.aSimilaire}
                  to={`/shop/collection/${collection.collectionId}`}
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
