import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/ShopPage/ShopPhotos.module.css";

interface PhotoProps {
  photo: {
    id: number;
    name: string;
    image: string;
    description: string;
    format: string;
    stock: number;
    price: number;
    is_favorite: boolean;
    collection_id: number;
  };
}

export default function ShopPhotos({ photo }: PhotoProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsVisible(true);
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };
  return (
    <section className={styles.photos}>
      <figure className={styles.box}>
        <img
          src={`${import.meta.env.VITE_API_URL}/${photo.image}`}
          alt={photo.name}
        />
        {photo.collection_id === 2 && <p className={styles.news}>nouveauté</p>}
        <p className={styles.name}>{photo.name}</p>
        <p className={styles.price}>{photo.price} €</p>
      </figure>
      <div
        className={isVisible ? styles.modalVisible : styles.modalOff}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
      >
        <NavLink to={`/shop/article/${photo.id}`}>VOIR L'ARTICLE</NavLink>
      </div>
    </section>
  );
}
