import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Homepage/CollectionCard.module.css";

type CollectionCardProps = {
  id: number;
  collectionName: string;
  photos: {
    id: number;
    name: string;
    image: string;
  };
};

export default function CollectionCard({
  id,
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
      key={id}
      className={styles.collectionCard}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
    >
      <figure>
        <img
          src={`${import.meta.env.VITE_API_URL}/${photos.image}`}
          alt={photos.name}
        />
      </figure>
      <h3>Collection {collectionName}</h3>
      <div
        className={isVisible ? styles.modalVisible : styles.modalOff}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
      >
        <NavLink to={`/shop?collection=${id}`}>VOIR LA COLLECTION</NavLink>
      </div>
    </div>
  );
}
