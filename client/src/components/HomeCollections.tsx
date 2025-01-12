import { useEffect, useState } from "react";
import styles from "../styles/HomeCollections.module.css";
import CollectionCard from "./CollectionCard";

type Collections = {
  collectionId: number;
  collectionName: string;
  photos: {
    photoId: number;
    name: string;
    image: string;
  };
};

export default function HomeCollections() {
  const [collections, setCollections] = useState<Collections[]>([]);
  const [collectionIndex, setCollectionIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collectionsPhotos`)
      .then((response) => response.json())
      .then((data: Collections[]) => {
        setCollections(data);
      });
  }, []);

  const uniqueCollectionIds = [
    ...new Set(collections.map((col) => col.collectionId)),
  ];

  const HandlePrev = () => {
    setCollectionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : uniqueCollectionIds.length - 1,
    );
  };

  const HandleNext = () => {
    setCollectionIndex((prevIndex) =>
      prevIndex < uniqueCollectionIds.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const collectionSelect =
    uniqueCollectionIds.length > 0
      ? uniqueCollectionIds[collectionIndex]
      : null;

  return (
    <section className={styles.collections}>
      <h2>Toutes les collections</h2>
      <div className={styles.carousel}>
        <span
          onClick={HandlePrev}
          onKeyDown={HandlePrev}
          className={`${styles.prev} material-symbols-outlined`}
        >
          arrow_forward_ios
        </span>
        <span
          onClick={HandleNext}
          onKeyDown={HandleNext}
          className={`${styles.next} material-symbols-outlined`}
        >
          arrow_forward_ios
        </span>
        <div className={styles.carouselContainCol}>
          {collections.length > 0 &&
            collections
              .filter((col) => [4, 13, 18, 30].includes(col.photos.photoId))
              .filter((select) => select.collectionId === collectionSelect)
              .map((collection) => (
                <CollectionCard
                  key={collection.collectionId}
                  collectionId={collection.collectionId}
                  collectionName={collection.collectionName}
                  photos={collection.photos}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
