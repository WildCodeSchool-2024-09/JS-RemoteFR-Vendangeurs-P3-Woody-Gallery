import magnifiyingGlass from "/MagnifyingGlass.svg";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" name="searchBar" placeholder="Rechercher" />
      <img src={magnifiyingGlass} alt="Loupe" />
    </div>
  );
}
