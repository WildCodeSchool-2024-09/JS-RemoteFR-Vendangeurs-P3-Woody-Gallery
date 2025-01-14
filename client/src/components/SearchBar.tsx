import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name="searchBar"
        placeholder="Rechercher"
        onChange={handleSearchTerm}
      />
      <span className={`${styles.search} material-symbols-outlined`}>
        search
      </span>
    </div>
  );
};

export default SearchBar;
