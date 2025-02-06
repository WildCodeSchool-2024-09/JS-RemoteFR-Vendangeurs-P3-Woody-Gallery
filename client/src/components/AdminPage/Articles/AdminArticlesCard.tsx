import { useState } from "react";
import styles from "../../../styles/AdminPage/Articles/AdminArticlesCard.module.css";
import ModalAAC from "./ModalAAC";
import ModalDeleteArticle from "./ModalDeleteArticle";

type Article = {
  name: string;
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

export default function AdminArticlesCard({ name, photos }: Article) {
  const [modalAAC, setModalAAC] = useState<boolean>(false);
  const [modalDelete, setModaleDelete] = useState<boolean>(false);
  const [imageBig, setImageBig] = useState<boolean>(false);

  const handleImageBig = () => {
    setImageBig(true);
  };

  const handleImageSmall = () => {
    setImageBig(false);
  };

  const handleOpenModal = () => {
    setModalAAC(true);
  };

  const handleCloseModal = () => {
    setModalAAC(false);
  };

  const handleOpenModalDelete = () => {
    setModaleDelete(true);
  };

  const handleCloseModalDelete = () => {
    setModaleDelete(false);
  };

  return (
    <>
      <ul className={styles.adminArticlesCard}>
        <li>{photos.name}</li>
        <li>
          <figure
            onClick={handleImageBig}
            onKeyDown={handleImageBig}
            title="Agrandir l'image"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${photos.image}`}
              alt={photos.name}
            />
          </figure>
        </li>
        <li>{name}</li>
        <li>{photos.format}</li>
        <li className={photos.stock <= 5 ? styles.urgent : ""}>
          {photos.stock}
        </li>
        <li>{photos.price} €</li>
        <li className={styles.last}>
          <button
            onClick={handleOpenModal}
            onKeyDown={handleOpenModal}
            className="material-symbols-outlined"
            type="button"
          >
            edit_square
          </button>
          <button
            onClick={handleOpenModalDelete}
            onKeyDown={handleOpenModalDelete}
            className={`material-symbols-outlined ${styles.delete}`}
            type="button"
          >
            delete
          </button>
        </li>
      </ul>
      {modalAAC && (
        <ModalAAC handleCloseModal={handleCloseModal} photos={photos} />
      )}
      {modalDelete && (
        <ModalDeleteArticle
          handleCloseModalDelete={handleCloseModalDelete}
          photos={photos}
        />
      )}
      {imageBig && (
        <div
          className={styles.imageBig}
          onClick={handleImageSmall}
          onKeyDown={handleImageSmall}
          title="Fermer l'image"
        >
          <figure>
            <img
              src={`${import.meta.env.VITE_API_URL}/${photos.image}`}
              alt={photos.name}
            />
            <span
              className="material-symbols-outlined"
              onClick={handleImageSmall}
              onKeyDown={handleImageSmall}
              title="Fermer l'image"
            >
              close
            </span>
          </figure>
        </div>
      )}
    </>
  );
}
