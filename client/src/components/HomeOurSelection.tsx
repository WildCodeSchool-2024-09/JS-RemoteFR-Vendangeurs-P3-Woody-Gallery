import { useEffect, useState } from "react";
import styles from "../styles/HomeOurSelection.module.css";

type Collection = {
  id: number;
  name: string;
  image: string;
};

export default function HomeOurSelection() {
  const [collections, setCollections] = useState<Collection[]>([]);

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

  return (
    <section className={styles.ourSelection}>
      <h2>Notre sélection</h2>
      <div>
        {selectedCollections.map((item) => {
          const collection = collections.find((col) => col.id === item.id);
          return collection ? (
            <figure key={collection.id} className={item.className}>
              <img src={collection.image} alt={collection.name} />
            </figure>
          ) : null;
        })}
      </div>
    </section>
  );
}
