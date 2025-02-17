import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/ShopPage/Filters";
import SearchBar from "../components/ShopPage/SearchBar";
import ShopPhotos from "../components/ShopPage/ShopPhotos";
import styles from "../styles/ShopPage/ShopPage.module.css";

interface PhotosProps {
  id: number;
  name: string;
  image: string;
  description: string;
  format: string;
  stock: number;
  price: number;
  is_favorite: boolean;
  collection_id: number;
}

interface CollectionsProps {
  id: number;
  name: string;
}

export default function ShopPage() {
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  const [collections, setCollections] = useState<CollectionsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("none");
  const [sortPrice, setSortPrice] = useState<string>("none");
  const [visiblePhotos, setVisiblePhotos] = useState<PhotosProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [searchParams] = useSearchParams();
  const photosPerPage = 8;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setVisiblePhotos(data.slice(0, photosPerPage));
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections`)
      .then((response) => response.json())
      .then((data) => setCollections(data));
  }, []);

  useEffect(() => {
    const collectionId = searchParams.get("collection");
    if (collectionId) {
      setSelectedCollections([Number.parseInt(collectionId, 10)]);
    } else {
      setSelectedCollections([]);
    }
  }, [searchParams]);

  const filteredPhotos = photos
    .filter(
      (photo) =>
        photo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCollections.length === 0 ||
          selectedCollections.includes(photo.collection_id)),
    )
    .sort((a, b) => {
      if (sortOption !== "none") {
        const nameCompare =
          sortOption === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);

        if (nameCompare !== 0) {
          return nameCompare;
        }
      }

      if (sortPrice !== "none") {
        return sortPrice === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

  const loadMorePhotos = () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;
    const newPhotos = photos.slice(
      visiblePhotos.length,
      nextPage * photosPerPage,
    );
    setVisiblePhotos((prev) => [...prev, ...newPhotos]);
    setPage(nextPage);
    setLoading(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (
    selected: number[],
    sortByOption: string,
    sortByPrice: string,
  ) => {
    setSelectedCollections(selected);
    setSortOption(sortByOption);
    setSortPrice(sortByPrice);
  };

  const filterNames = [...new Set(collections.map((a) => a.name))];

  return (
    <div className={styles.shopPage}>
      <section className={styles.searchTools}>
        <div className={styles.navContainer}>
          <h2>Shop</h2>
          <SearchBar onSearch={handleSearch} />
          <Filters
            filter={filterNames}
            setCurrentFilter={handleFilterChange}
            photos={photos}
          />
        </div>
      </section>
      <section
        className={`${styles.photosContainer} ${visiblePhotos.length < filteredPhotos.length ? "" : styles.withoutSeeMore}`}
      >
        {filteredPhotos.slice(0, visiblePhotos.length).map((photo) => (
          <ShopPhotos key={photo.id} photo={photo} />
        ))}
        {visiblePhotos.length < filteredPhotos.length && (
          <button
            className={styles.seeMore}
            type="button"
            onClick={loadMorePhotos}
          >
            Voir plus
          </button>
        )}
        {searchTerm && filteredPhotos.length === 0 && (
          <p className={styles.notFound}>
            Aucun article ne correspond à votre recherche
          </p>
        )}
      </section>
    </div>
  );
}
