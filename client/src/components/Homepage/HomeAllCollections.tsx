import { useEffect, useState } from "react";
import styles from "../../styles/Homepage/HomeAllCollections.module.css";
import CollectionCard from "./CollectionCard";

type Collections = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
  };
};

export default function HomeAllCollections() {
  const [collections, setCollections] = useState<Collections[]>([]);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [collectionShow, setCollectionShow] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collectionsPhotosSelect`)
      .then((response) => response.json())
      .then((data: Collections[]) => {
        setCollections(data);
      });

    handleMediaQ();
    window.addEventListener("resize", handleMediaQ);
    return () => window.removeEventListener("resize", handleMediaQ);
  }, []);

  const handleMediaQ = () => {
    if (window.innerWidth >= 1280) {
      setCollectionShow(3);
    } else {
      setCollectionShow(1);
    }
  };

  const HandlePrev = () => {
    setCollectionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : collections.length - 1,
    );
  };

  const HandleNext = () => {
    setCollectionIndex((prevIndex) =>
      prevIndex < collections.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const visibleCollections = [];
  for (let i = 0; i < collectionShow; i++) {
    const collection = collections[(collectionIndex + i) % collections.length];
    if (collection) {
      visibleCollections.push(collection);
    }
  }

  return (
    <section className={styles.collections}>
      <h2>Toutes les collections</h2>
      <div className={styles.carousel}>
        <span
          className={`${styles.prev} material-symbols-outlined`}
          onClick={HandlePrev}
          onKeyDown={HandlePrev}
        >
          arrow_forward_ios
        </span>
        <span
          className={`${styles.next} material-symbols-outlined`}
          onClick={HandleNext}
          onKeyDown={HandleNext}
        >
          arrow_forward_ios
        </span>
        <div className={styles.carouselContainCol}>
          {visibleCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              collectionName={collection.name}
              photos={collection.photos}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
