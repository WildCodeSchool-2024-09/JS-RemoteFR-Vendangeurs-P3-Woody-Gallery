import { useState } from "react";
import styles from "../styles/AddToCartButtons.module.css";

type AddToCartButtonsProps = {
  description: string;
  onToggleBar: (visible: boolean) => void; // Callback pour gérer la barre
};

export default function AddToCartButtons({
  description,
  onToggleBar,
}: AddToCartButtonsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prevState) => {
      const newState = !prevState;
      onToggleBar(!newState); // Masquer la barre si la description est affichée
      return newState;
    });
  };

  const handleAddToCart = () => {
    alert("Article ajouté au panier !");
  };

  const handleBuyNow = () => {
    alert("Achat immédiat !");
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        onClick={handleAddToCart}
        className={styles.addToCart}
      >
        Ajouter au panier
      </button>
      <button type="button" onClick={handleBuyNow} className={styles.buyNow}>
        Acheter
      </button>

      {/* Description avec "Voir plus" */}
      <p className={styles.description}>
        {showFullDescription
          ? description // Affiche toute la description si "Voir plus" est activé
          : `${description.slice(0, 100)}...`}{" "}
        {/* Sinon, affiche un extrait */}
      </p>

      {/* Barre conditionnelle */}

      {!showFullDescription && <div className={styles.thinDecorativeBar2} />}

      {/* Bouton "Voir plus / Voir moins" */}
      <button
        type="button"
        className={styles.seeMore}
        onClick={toggleDescription}
      >
        {showFullDescription ? "Voir moins" : "Voir plus"}
      </button>
    </div>
  );
}
