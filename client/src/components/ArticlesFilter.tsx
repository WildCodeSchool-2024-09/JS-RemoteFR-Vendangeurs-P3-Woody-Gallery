import { useCollection } from "../contexts/MyCollectionContext";
import styles from "../styles/ArticlesFilter.module.css";

export default function ArticlesFilter() {
  const { collections } = useCollection();

  const uniqueCollection = Array.from(
    new Map(
      collections.map((collections) => [collections.name, collections]),
    ).values(),
  );

  return (
    <form className={styles.articlesFiler}>
      <label htmlFor="collectionFilter">
        Collections :
        <ul>
          {uniqueCollection.map((collection) => (
            <li key={`filterCollection${collection.id}`}>
              <input type="checkbox" name="collection" id="collection1" />
              {collection.name}
            </li>
          ))}
        </ul>
      </label>
      <label htmlFor="stockFilter">
        Par stock :
        <ul>
          <li>
            <input type="radio" name="stock" id="stockAsc" />
            croissant
          </li>
          <li>
            <input type="radio" name="stock" id="stockDesc" />
            décroissant
          </li>
        </ul>
      </label>
      <label htmlFor="priceFilter">
        Par prix :
        <ul>
          <li>
            <input type="radio" name="price" id="priceAsc" />
            croissant
          </li>
          <li>
            <input type="radio" name="price" id="priceDesc" />
            décroissant
          </li>
        </ul>
      </label>
    </form>
  );
}
