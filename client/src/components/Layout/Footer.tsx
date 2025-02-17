import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Layout/Footer.module.css";

type CollectionProps = {
  id: number;
  name: string;
};

export default function Footer() {
  const [collections, setCollections] = useState<CollectionProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections`)
      .then((response) => response.json())
      .then((data) => setCollections(data));
  });

  return (
    <footer className={styles.footer}>
      <article>
        <h3>À propos</h3>
        <p>
          Passionné de voyage et de photographie. Je partage avec vous les
          moments que j’ai pu capturer avec mon appareil
        </p>
      </article>
      <article>
        <h3>Shop</h3>
        <ul>
          {collections.map((collection) => (
            <NavLink
              key={`collectionFooter${collection.id}`}
              to={`/shop?collection=${collection.id}`}
            >
              <li>Collection {collection.name}</li>
            </NavLink>
          ))}
        </ul>
      </article>
      <article>
        <h3>Suivez moi</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com">Instagram</a>
          </li>
          <li>
            <a href="https://www.twitter.com">Twitter / X</a>
          </li>
          <li>
            <a href="https://www.pinterest.com">Pinterest</a>
          </li>
        </ul>
      </article>
      <article>
        <h3>Contacts</h3>
        <ul className={styles.contatcs}>
          <li>woody@woody_gallery.com</li>
          <li>02.25.02.25.02</li>
        </ul>
      </article>
      <ul className={styles.credit}>
        <li>©2024</li>
        <li>Mateusz Plebanek - Jeremy Perez - Flavien Rousseau</li>
      </ul>
    </footer>
  );
}
