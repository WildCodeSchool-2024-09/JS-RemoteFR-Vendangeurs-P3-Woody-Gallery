import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import styles from "../../../styles/AdminPage/Articles/ModalAAC.module.css";

type ModalAACProps = {
  handleCloseModal: () => void;
};

type CollectionProps = {
  id: number;
  name: string;
};

type PhotoProps = {
  name: string;
  file: string;
  description: string;
  format: string;
  stock: number;
  price: number;
  collection_id: number;
};

export default function ModalCreateArticle({
  handleCloseModal,
}: ModalAACProps) {
  const [collections, setCollections] = useState<CollectionProps[]>([]);
  const [newPhoto, setNewPhoto] = useState<PhotoProps>({
    name: "",
    file: "",
    description: "",
    format: "",
    stock: 0,
    price: 0,
    collection_id: 1,
  });
  const { fetchArticles } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections`)
      .then((response) => response.json())
      .then((data: CollectionProps[]) => setCollections(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewPhoto((prevPhoto) => ({
      ...prevPhoto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newPhoto.name);
    formData.append("image", (e.target as HTMLFormElement).image.files[0]);
    formData.append("description", newPhoto.description);
    formData.append("format", newPhoto.format);
    formData.append("stock", newPhoto.stock.toString());
    formData.append("price", newPhoto.price.toString());
    formData.append("collection_id", newPhoto.collection_id.toString());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/photos/`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        handleCloseModal();
        fetchArticles();
        navigate("/admin/articles");
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue durant la modification de l'image",
        error,
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "."
    ) {
      return;
    }

    if (
      (e.key < "0" || e.key > "9") &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.modalAAC}>
      <form onSubmit={handleSubmit}>
        <h2>Créer un article</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className={`material-symbols-outlined ${styles.exit}`}
        >
          close
        </button>
        <label htmlFor="name">
          Nom
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom de l'article"
            onChange={handleChange}
          />
        </label>
        <label className={styles.file} htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description de l'article"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="collection_id">
          Collection
          <select
            id="collection_id"
            name="collection_id"
            onChange={handleChange}
          >
            <option value="0" disabled>
              Veuillez choisir une collection
            </option>
            {collections.map((collection) => (
              <option
                key={`selectCollection${collection.id}`}
                value={collection.id}
              >
                {collection.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="format">
          Format
          <input
            type="text"
            id="format"
            name="format"
            placeholder={`Format de l'article "LONGUEURxLARGUEURcm"`}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="stock">
          Stock
          <input
            type="text"
            id="stock"
            name="stock"
            placeholder="Nombre de stock disponible de l'article"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <label htmlFor="price">
          Prix
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Prix de l'article en euros (€)"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <button className={styles.confirm} type="submit">
          Confirmer la modification
        </button>
      </form>
    </div>
  );
}
