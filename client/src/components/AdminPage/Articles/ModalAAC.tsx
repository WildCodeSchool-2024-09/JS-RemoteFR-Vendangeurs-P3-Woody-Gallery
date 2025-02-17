import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../contexts/AdminArticlesContext";
import styles from "../../../styles/AdminPage/Articles/ModalAAC.module.css";

type ModalAACProps = {
  handleCloseModal: () => void;
  photos: {
    id: number;
    name: string;
    image: string;
    description: string;
    format: string;
    stock: number;
    price: number;
    collection_id: number;
  };
};

type CollectionProps = {
  id: number;
  name: string;
};

export default function ModalAAC({ handleCloseModal, photos }: ModalAACProps) {
  const [collections, setCollections] = useState<CollectionProps[]>([]);
  const [newPhoto, setNewPhoto] = useState(photos);
  const { fetchArticles } = useArticles();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections`)
      .then((response) => response.json())
      .then((data: CollectionProps[]) => setCollections(data));
  }, []);

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
        `${import.meta.env.VITE_API_URL}/api/photos/${photos.id}`,
        {
          method: "PUT",
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

  return (
    <div className={styles.modalAAC}>
      <form onSubmit={handleSubmit}>
        <h2>Modification de {photos.name}</h2>
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
            value={newPhoto.name}
            onChange={handleChange}
          />
        </label>
        <label className={styles.file} htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
          <figure>
            <img
              src={`${import.meta.env.VITE_API_URL}/${newPhoto.image}`}
              alt={newPhoto.name}
            />
          </figure>
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description de l'article"
            value={newPhoto.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="collection_id">
          Collection
          <select
            id="collection_id"
            name="collection_id"
            value={newPhoto.collection_id}
            onChange={handleChange}
          >
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
            value={newPhoto.format}
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
            value={newPhoto.stock}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Prix
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Prix de l'article en euros (€)"
            value={newPhoto.price}
            onChange={handleChange}
          />
        </label>
        <button className={styles.confirm} type="submit">
          Confirmer la modification
        </button>
      </form>
    </div>
  );
}
