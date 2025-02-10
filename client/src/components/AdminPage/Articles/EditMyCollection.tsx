import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import { useCollection } from "../../../contexts/MyCollectionContext";
import styles from "../../../styles/AdminPage/Articles/MyCollection.module.css";

type ImportProps = {
  uniqueCollection: UniqueCollections[];
  handleCloseMyCollection: () => void;
};

type UniqueCollections = {
  id: number;
  name: string;
};

export default function EditMyCollection({
  uniqueCollection,
  handleCloseMyCollection,
}: ImportProps) {
  const [editCollection, setEditCollection] = useState<UniqueCollections>({
    id: 0,
    name: "",
  });
  const { fetchArticles } = useArticles();
  const { fetchCollections } = useCollection();
  const navigate = useNavigate();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedCollection = uniqueCollection.find(
      (collection) => collection.id === selectedId,
    );
    if (selectedCollection) {
      setEditCollection(selectedCollection);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/collections/${editCollection.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editCollection),
        },
      );
      if (response.ok) {
        fetchCollections();
        fetchArticles();
        handleCloseMyCollection();
        navigate("/admin/articles");
      }
    } catch (err) {
      console.error(
        "Une erreur est survenue durant la modification de la collection",
        err,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="editCollection">
        Modification d'une collection
        <select
          name="editCollection"
          id="editCollectionSelect"
          onChange={handleSelectChange}
        >
          {uniqueCollection.map((collection) => (
            <option
              key={`collectionEdit${collection.id}`}
              value={collection.id}
            >
              {collection.name}
            </option>
          ))}
        </select>
        <input
          className={styles.inputEditCollection}
          type="text"
          name="name"
          id="editCollection"
          value={editCollection.name}
          onChange={handleValueChange}
          placeholder="Sélectionnez une collection"
        />
      </label>
      <button className="material-symbols-outlined" type="submit">
        edit_square
        <p>Confirmer la modification</p>
      </button>
    </form>
  );
}
