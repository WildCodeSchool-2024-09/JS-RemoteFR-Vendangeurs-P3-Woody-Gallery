import { NavLink } from "react-router-dom";
import styles from "../styles/AddToCartButtons.module.css";

export default function AddToCartButtons() {
  const handleAddToCart = () => {
    alert("Article ajouté au panier !");
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
      <NavLink className={styles.buyNow} to="/panier">
        Acheter
      </NavLink>
    </div>
  );
}
