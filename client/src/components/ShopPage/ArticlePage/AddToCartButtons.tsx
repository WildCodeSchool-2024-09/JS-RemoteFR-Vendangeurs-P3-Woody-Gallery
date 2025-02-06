import { NavLink } from "react-router-dom";
import styles from "../../../styles/ShopPage/ArticlePage/AddToCartButtons.module.css";

type OrderProps = {
  handleAddToOrder: () => void;
};

export default function AddToCartButtons({ handleAddToOrder }: OrderProps) {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        onClick={handleAddToOrder}
        onKeyDown={handleAddToOrder}
        className={styles.addToCart}
      >
        Ajouter au panier
      </button>
      <NavLink
        onClick={handleAddToOrder}
        onKeyDown={handleAddToOrder}
        className={styles.buyNow}
        to="/panier"
      >
        Acheter
      </NavLink>
    </div>
  );
}
