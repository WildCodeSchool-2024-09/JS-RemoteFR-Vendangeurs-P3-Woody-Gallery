import { useState } from "react";
import styles from "../styles/CollectionCard.module.css";

type CollectionCardProps = {
  collectionId: number;
  collectionName: string;
  photos: {
    photoId: number;
    name: string;
    image: string;
  };
};

export default function CollectionCard({
  collectionId,
  collectionName,
  photos,
}: CollectionCardProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsVisible(true);
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  return (
    <div
      key={collectionId}
      className={styles.collectionCard}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
    >
      <figure>
        <img src={photos.image} alt={photos.name} />
      </figure>
      <h3>Collection {collectionName}</h3>
      <div
        className={isVisible ? styles.modalVisible : styles.modalOff}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
      >
        <a href="/collection">VOIR LA COLLECTION</a>
      </div>
    </div>
  );
}
