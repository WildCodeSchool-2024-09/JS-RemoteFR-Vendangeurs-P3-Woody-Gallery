import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import { useCollection } from "../../../contexts/MyCollectionContext";
import styles from "../../../styles/AdminPage/Articles/MyCollection.module.css";

type ImportProps = {
  collections: CollectionsPros[];
  uniqueCollection: UniqueCollections[];
  handleCloseMyCollection: () => void;
};

type CollectionsPros = {
  id: number;
  name: string;
  photos: {
    collection_id: number;
  };
};

type UniqueCollections = {
  id: number;
  name: string;
};

export default function DeleteMyCollection({
  handleCloseMyCollection,
  collections,
  uniqueCollection,
}: ImportProps) {
  const [collectionId, setCollectionId] = useState(0);
  const [voidCollection, setVoidCollection] = useState<boolean>(false);
  const { fetchArticles } = useArticles();
  const { fetchCollections } = useCollection();
  const navigate = useNavigate();

  useEffect(() => {
    const canDeleteCollection = () => {
      const selectedCollection = collections.find(
        (collection) => collection.id === collectionId,
      );
      if (
        selectedCollection &&
        selectedCollection.photos.collection_id === null
      ) {
        setVoidCollection(false);
      } else {
        setVoidCollection(true);
      }
    };
    canDeleteCollection();
  }, [collectionId, collections]);

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.target as HTMLSelectElement;
    setCollectionId(Number(value));
    fetchCollections();
    fetchArticles();
    navigate("/admin/articles");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!voidCollection) {
        fetch(
          `${import.meta.env.VITE_API_URL}/api/collections/${collectionId}`,
          {
            method: "DELETE",
          },
        );
        handleCloseMyCollection();
        fetchCollections();
        fetchArticles();
        navigate("/admin/articles");
      }
    } catch (err) {
      console.error(
        "Une erreur est survenue durant la suppression de la collection",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="deleteCollection">
        Suppression d'une collection
        <select
          name="deleteCollection"
          id="deleteCollection"
          onChange={handleChange}
        >
          {uniqueCollection.map((collection) => (
            <option
              key={`collectionDelete${collection.id}`}
              value={collection.id}
            >
              {collection.name}
            </option>
          ))}
        </select>
      </label>
      <button
        className={`material-symbols-outlined ${voidCollection ? styles.noDelete : styles.delete}`}
        type="submit"
        title={
          voidCollection
            ? "Cette collection contient encore des photos"
            : "Supprimé définitivement la collection"
        }
      >
        delete<p className={styles.textDelete}>Confirmer la suppression</p>
      </button>
    </form>
  );
}
