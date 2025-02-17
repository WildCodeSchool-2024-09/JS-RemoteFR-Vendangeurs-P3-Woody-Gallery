import { useEffect, useState } from "react";
import { useArticles } from "../../../contexts/AdminArticlesContext.tsx";
import styles from "../../../styles/AdminPage/Articles/AdminArticles.module.css";
import AdminArticlesCard from "./AdminArticlesCard";
import ArticlesFilter from "./ArticlesFilter.tsx";
import ModalCreateArticle from "./ModalCreateArticle";
import MyCollection from "./MyCollection";

export default function AdminArticles() {
  const [modalCA, setModalCA] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [myCollection, setMyCollection] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [selectCollection, setSelectCollection] = useState<number[]>([]);
  const [selectStock, setSelectStock] = useState<string>("none");
  const [selectPrice, setSelectPrice] = useState<string>("none");
  const [stockOrPrice, setStockOrPrice] = useState<boolean>(false);
  const { articles, fetchArticles } = useArticles();

  const handleFilter = () => {
    setFilter((prev) => !prev);
  };

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
      <div className={styles.interaction}>
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
        <button onClick={handleFilter} className={styles.tri} type="button">
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
          add <p>Ajouter un article</p>
        </button>
      </div>
      {filter && (
        <ArticlesFilter
          setSelectCollection={setSelectCollection}
          selectCollection={selectCollection}
          setSelectStock={setSelectStock}
          setSelectPrice={setSelectPrice}
          selectStock={selectStock}
          selectPrice={selectPrice}
          setStockOrPrice={setStockOrPrice}
          stockOrPrice={stockOrPrice}
        />
      )}
      <ul className={styles.list}>
        <li>Nom</li>
        <li>Image</li>
        <li>Collection</li>
        <li>Format</li>
        <li>Stock</li>
        <li>Prix</li>
        <li className={styles.last}>Actions</li>
      </ul>
      {articlesSearch
        .filter(
          (collection) =>
            selectCollection.length === 0 ||
            selectCollection.includes(collection.id),
        )
        .sort((a, b) => {
          if (selectStock === "ArtStockAsc" && stockOrPrice) {
            return a.photos.stock - b.photos.stock;
          }
          if (selectStock === "ArtStockDesc" && stockOrPrice) {
            return b.photos.stock - a.photos.stock;
          }
          if (selectPrice === "ArtPriceAsc" && !stockOrPrice) {
            return a.photos.price - b.photos.price;
          }
          if (selectPrice === "ArtPriceDesc" && !stockOrPrice) {
            return b.photos.price - a.photos.price;
          }
          return 0;
        })
        .map((article) => (
          <AdminArticlesCard
            key={article.photos.id}
            name={article.name}
            photos={article.photos}
          />
        ))}
      {modalCA && <ModalCreateArticle handleCloseModal={handleCloseModal} />}
      {myCollection && (
        <MyCollection handleCloseMyCollection={handleCloseMyCollection} />
      )}
      {search && articlesSearch.length === 0 && (
        <p className={styles.notFound}>
          Aucun article ne correspond à votre recherche
        </p>
      )}
    </div>
  );
}
