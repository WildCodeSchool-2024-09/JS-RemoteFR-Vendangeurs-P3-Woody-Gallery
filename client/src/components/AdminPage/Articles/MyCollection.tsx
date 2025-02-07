import { useEffect } from "react";
import { useCollection } from "../../../contexts/MyCollectionContext";
import styles from "../../../styles/AdminPage/Articles/MyCollection.module.css";
import CreateMyCollection from "./CreateMyCollection";
import DeleteMyCollection from "./DeleteMyCollections";
import EditMyCollection from "./EditMyCollection";

type MyCollectionProps = {
  handleCloseMyCollection: () => void;
};

export default function MyCollection({
  handleCloseMyCollection,
}: MyCollectionProps) {
  const { collections, fetchCollections } = useCollection();

  useEffect(() => {
    fetchCollections();
  });

  const uniqueCollection = Array.from(
    new Map(
      collections.map((collections) => [collections.name, collections]),
    ).values(),
  );

  return (
    <div className={styles.myCollection}>
      <div>
        <h2>Mes collections</h2>
        <button
          onClick={handleCloseMyCollection}
          onKeyDown={handleCloseMyCollection}
          className={`material-symbols-outlined ${styles.exit}`}
          type="button"
        >
          close
        </button>
        <label className={styles.allCollections} htmlFor="collection">
          Liste de toutes les collections
          <select name="collection" id="collection">
            {uniqueCollection.map((collection) => (
              <option
                key={`collectionList${collection.id}`}
                value={collection.id}
              >
                {collection.name}
              </option>
            ))}
          </select>
        </label>
        <CreateMyCollection handleCloseMyCollection={handleCloseMyCollection} />
        <EditMyCollection
          handleCloseMyCollection={handleCloseMyCollection}
          uniqueCollection={uniqueCollection}
        />
        <DeleteMyCollection
          handleCloseMyCollection={handleCloseMyCollection}
          uniqueCollection={uniqueCollection}
          collections={collections}
        />
      </div>
    </div>
  );
}
