// import { useState } from "react";
import Filters from "../components/Filters";
// import SearchBar from "../components/SearchBar";
import ShopPhotos from "../components/ShopPhotos";
import styles from "../styles/ShopPage.module.css";

// interface PhotosProps {
//   id: string;
//   name: string;
//   image: string;
//   description: string;
//   format: string;
//   stock: number;
//   price: number;
//   is_favorite: boolean;
//   collection_id: number;
// }

export default function ShopPage() {
  // const [photos, setPhotos] = useState<PhotosProps[] | null>([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredPhotos = photos.filter((photo) =>
  //   photo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  // // );
  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  // };

  return (
    <>
      <section className={styles.searchTools}>
        {/* <SearchBar onSearch={handleSearch} /> */}
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
