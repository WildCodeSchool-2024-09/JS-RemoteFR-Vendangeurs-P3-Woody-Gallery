import { useState } from "react";
import styles from "../../styles/ShopPage/SearchBar.module.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleOpenSB = () => {
    if (searchTerm.trim() === "") {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles.searchBar} ${isOpen ? styles.openSearchBar : styles.closeSearchBar}`}
    >
      <input
        type={isOpen ? "text" : "none"}
        name="searchBar"
        placeholder={isOpen ? "Rechercher" : ""}
        onChange={handleSearchTerm}
      />
      <span
        onClick={handleOpenSB}
        onKeyDown={handleOpenSB}
        className={`${styles.searchIcon} material-symbols-outlined ${isOpen ? styles.positionOpen : styles.positionClose}`}
      >
        search
      </span>
    </div>
  );
};

export default SearchBar;
