import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import { useCollection } from "../../../contexts/MyCollectionContext";

type MyCollectionProps = {
  handleCloseMyCollection: () => void;
};

export default function CreateMyCollection({
  handleCloseMyCollection,
}: MyCollectionProps) {
  const [newCollection, setNewCollection] = useState({
    name: "",
  });
  const { fetchArticles } = useArticles();
  const { fetchCollections } = useCollection();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/collections`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCollection),
        },
      );
      if (response.ok) {
        fetchCollections();
        fetchArticles();
        handleCloseMyCollection();
        navigate("/admin/articles");
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue durant la modification de l'image",
        error,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Création d'une nouvelle collection
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom de la collection"
          onChange={handleChange}
        />
      </label>
      <button className="material-symbols-outlined" type="submit">
        add
        <p>Confirmer la création</p>
      </button>
    </form>
  );
}
