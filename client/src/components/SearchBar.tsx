import MagnifiyingGlass from "../assets/images/MagnifyingGlass.svg";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input type="text" name="searchBar" placeholder="Rechercher" />
      <img src={MagnifiyingGlass} alt="Loupe" />
    </div>
  );
}
