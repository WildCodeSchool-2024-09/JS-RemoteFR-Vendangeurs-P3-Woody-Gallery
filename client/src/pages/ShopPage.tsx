import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import ShopPhotos from "../components/ShopPhotos";
import styles from "../styles/ShopPage.module.css";

export default function ShopPage() {
  return (
    <>
      <section className={styles.searchTools}>
        <SearchBar />
        <Filters />
      </section>
      <section className={styles.photos}>
        <ShopPhotos />
        <button className={styles.seeMore} type="button">
          Voir plus
        </button>
      </section>
    </>
  );
}
