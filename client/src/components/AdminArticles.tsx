import { useEffect, useState } from "react";
import { useArticles } from "../contexts/AdminArticlesContext.tsx";
import { MyCollectionsProvider } from "../contexts/MyCollectionContext.tsx";
import styles from "../styles/AdminArticles.module.css";
import AdminArticlesCard from "./AdminArticlesCard";
import ModalCreateArticle from "./ModalCreateArticle";
import MyCollection from "./MyCollection.tsx";

export default function AdminArticles() {
  const [modalCA, setModalCA] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [myCollection, setMyCollection] = useState<boolean>(false);
  const { articles, fetchArticles } = useArticles();

  const handleOpenMyCollection = () => {
    setMyCollection(true);
  };

  const handleCloseMyCollection = () => {
    setMyCollection(false);
  };

  const handleOpenModal = () => {
    setModalCA(true);
  };

  const handleCloseModal = () => {
    setModalCA(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchArticles();
    setSearch(e.target.value);
  };

  const articlesSearch = articles.filter((article) =>
    article.photos.name
      ? article.photos.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      : false,
  );

  useEffect(() => {
    fetchArticles();
  });

  return (
    <div className={styles.adminArticles}>
      <div className={styles.interraction}>
        <input
          placeholder="Recherche par nom"
          onChange={handleSearch}
          type="text"
        />
        <button
          className={`material-symbols-outlined ${styles.search}`}
          type="button"
        >
          search
        </button>
        <button className={styles.tri} type="button">
          Tri
        </button>
        <button
          onClick={handleOpenMyCollection}
          className={styles.collectionsButton}
          type="button"
        >
          Mes collections
        </button>
        <button
          onClick={handleOpenModal}
          className={`material-symbols-outlined ${styles.addArticles}`}
          type="button"
        >
          add <p>Ajouter un articles</p>
        </button>
      </div>
      <ul className={styles.list}>
        <li>Nom</li>
        <li>Image</li>
        <li>Collection</li>
        <li>Format</li>
        <li>Stock</li>
        <li>Prix</li>
        <li className={styles.last}>Actions</li>
      </ul>
      {articlesSearch.map((article) => (
        <AdminArticlesCard
          key={article.photos.id}
          name={article.name}
          photos={article.photos}
        />
      ))}
      {modalCA && <ModalCreateArticle handleCloseModal={handleCloseModal} />}
      {myCollection && (
        <MyCollectionsProvider>
          <MyCollection handleCloseMyCollection={handleCloseMyCollection} />
        </MyCollectionsProvider>
      )}
    </div>
  );
}
