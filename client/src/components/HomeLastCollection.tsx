import { useEffect, useState } from "react";
import styles from "../styles/HomeLastCollection.module.css";

// core version + navigation, pagination modules:
import Swiper from "swiper/bundle";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/element/css/autoplay";

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections/2/photos`)
      .then((response) => response.json())
      .then((data: Collection[]) => {
        setCollections(data);
      });
  }, []);

  new Swiper(".swiperLastCollection", {
    modules: [Navigation, Pagination],
    loop: true,
    autoplay: {
      delay: 10000,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  return (
    <section className={styles.lastCollection}>
      <div className={`${styles.container} swiperLastCollection`}>
        <div className="swiper-wrapper" data-swiper-autoplay="10000">
          {collections
            .filter((maxItem) => [10, 12, 13].includes(maxItem.photos.photoId))
            .map((collection) => (
              <figure key={collection.collectionId} className="swiper-slide">
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
