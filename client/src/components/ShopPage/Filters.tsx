import { useState } from "react";
import styles from "../../styles/ShopPage/Filters.module.css";

interface FilterProps {
  filter: string[];
  setCurrentFilter: (
    selectedCollections: number[],
    sortBy: string,
    sortByPrice: string,
  ) => void;
  photos: { id: number; name: string; collection_id: number }[];
}

const Filters: React.FC<FilterProps> = ({ filter, setCurrentFilter }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("none");
  const [sortPrice, setSortPrice] = useState<string>("none");

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };
  // Checkboxes
  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      }
      return [...prevSelected, option];
    });
  };

  const handleSortChange = (sort: string) => {
    setSortPrice("none");
    setSortOption(sort);
  };

  const handlePriceChange = (priceSort: string) => {
    setSortOption("none");
    setSortPrice(priceSort);
  };

  const applyFilters = () => {
    const selectedIds = filter
      .filter((collectionName) => selectedOptions.includes(collectionName))
      .map(
        (collectionName) =>
          filter.findIndex((item) => item === collectionName) + 1,
      );

    setCurrentFilter(selectedIds, sortOption, sortPrice);
    toggleClick();
  };

  return (
    <>
      <button
        className={`${styles.filtersButton} ${isClicked ? styles.isClicked : ""}`}
        type="button"
        onClick={toggleClick}
      >
        Tri
      </button>
      {isClicked && (
        <div className={styles.modal}>
          <h3>Collections</h3>
          {filter.map((filterName) => (
            <div key={filterName}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id={filterName}
                value={filterName}
                checked={selectedOptions.includes(filterName)}
                onChange={() => handleOptionChange(filterName)}
              />
              <label htmlFor={filterName}>{filterName}</label>
            </div>
          ))}
          <form>
            <h3>Par ordre : </h3>
            <div>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="radioButtons"
                checked={sortOption === "asc"}
                onChange={() => handleSortChange("asc")}
              />
              <label htmlFor="asc">A-Z</label>
            </div>
            <div>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="radioButtons"
                checked={sortOption === "desc"}
                onChange={() => handleSortChange("desc")}
              />
              <label htmlFor="desc">Z-A</label>
            </div>

            <h3>Par prix : </h3>
            <div>
              <input
                type="radio"
                id="priceAsc"
                value="priceAsc"
                name="radioButtons"
                checked={sortPrice === "asc"}
                onChange={() => handlePriceChange("asc")}
              />
              <label htmlFor="asc">Croissant</label>
            </div>
            <div>
              <input
                type="radio"
                id="priceDesc"
                value="priceDesc"
                name="radioButtons"
                checked={sortPrice === "desc"}
                onChange={() => handlePriceChange("desc")}
              />
              <label htmlFor="desc">Décroissant</label>
            </div>
          </form>
          <button
            type="button"
            onClick={applyFilters}
            className={styles.applyButton}
          >
            Appliquer
          </button>
        </div>
      )}
    </>
  );
};

export default Filters;
