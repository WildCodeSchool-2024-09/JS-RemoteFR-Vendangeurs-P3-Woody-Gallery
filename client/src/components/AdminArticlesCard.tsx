import { useState } from "react";
import styles from "../styles/AdminArticlesCard.module.css";
import ModalAAC from "./ModalAAC";
import ModalDeleteArticle from "./ModalDeleteArticle";

type Article = {
  id: number;
  name: string;
  photos: {
    id: number;
    name: string;
    image: string;
    description: string;
    format: string;
    stock: number;
    price: number;
  };
};

export default function AdminArticlesCard({ name, photos }: Article) {
  const [modalAAC, setModalAAC] = useState<boolean>(false);
  const [modalDelete, setModaleDelete] = useState<boolean>(false);

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

  const numberChar = photos.description.length;

  return (
    <>
      <ul className={styles.adminArticlesCard}>
        <li>{photos.name}</li>
        <li>
          <figure>
            <img src={photos.image} alt={photos.name} />
          </figure>
        </li>
        <li>{numberChar} charactères</li>
        <li>{name}</li>
        <li>{photos.format}</li>
        <li className={photos.stock <= 5 ? styles.urgent : ""}>
          {photos.stock}
        </li>
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
        <ModalAAC
          handleCloseModal={handleCloseModal}
          name={name}
          photos={photos}
        />
      )}
      {modalDelete && (
        <ModalDeleteArticle
          handleCloseModalDelete={handleCloseModalDelete}
          photos={photos}
        />
      )}
    </>
  );
}
