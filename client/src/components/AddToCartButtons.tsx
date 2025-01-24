import styles from "../styles/AddToCartButtons.module.css";

export default function AddToCartButtons() {
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
    </div>
  );
}
