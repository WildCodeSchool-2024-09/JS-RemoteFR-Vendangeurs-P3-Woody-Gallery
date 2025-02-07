import { useEffect, useState } from "react";
import styles from "../../styles/Cart/OrderCard.module.css";

type OrderProps = {
  id: number;
  name: string;
  image: string;
  format: string;
  price: number;
  count: number;
};

export default function OrderCard({
  id,
  name,
  format,
  price,
  count,
  image,
}: OrderProps) {
  const [orderNumber, setOrderNumber] = useState(0);

  const orderCount = (price * count).toFixed(2);
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    setOrderNumber(order.includes(id));
  }, [id]);

  const handleAddToOrder = () => {
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    const updatedOrder = [...order, id];

    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setOrderNumber(1);
  };

  const handleRemoveFromOrder = () => {
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    const index = order.findIndex((itemId: number) => itemId === id);

    if (index !== -1) {
      order.splice(index, 1);
      localStorage.setItem("order", JSON.stringify(order));
      setOrderNumber(order.length);
    }
  };

  const handleDeleteFromOrder = () => {
    const order = JSON.parse(localStorage.getItem("order") || "[]");
    const updatedOrder = order.filter((itemId: number) => itemId !== id);

    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setOrderNumber(updatedOrder.length);
  };

  return (
    <div key={`orderCard${orderNumber}`} className={styles.orderCard}>
      <button
        onClick={handleDeleteFromOrder}
        onKeyDown={handleDeleteFromOrder}
        className={`material-symbols-outlined ${styles.delete}`}
        type="button"
      >
        delete
      </button>
      <hr className={styles.hrDelete} />
      <figure>
        <img src={`${import.meta.env.VITE_API_URL}/${image}`} alt={name} />
      </figure>
      <div>
        <h3>{name}</h3>
        <p className={styles.format}>Format : {format}</p>
        <p className={styles.cadre}>Photo imprimée sur toile sans cadre</p>
        <div>
          <h4>{"Nombre(s):"}</h4>
          <button
            onClick={handleRemoveFromOrder}
            onKeyDown={handleRemoveFromOrder}
            className={styles.less}
            type="button"
          >
            -
          </button>
          <p>{count}</p>
          <button
            onClick={handleAddToOrder}
            onKeyDown={handleAddToOrder}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <h5>Prix</h5>
      <hr className={styles.hrPrice} />
      <p className={styles.price}>{orderCount} €</p>
      <hr className={styles.hrTotal} />
    </div>
  );
}
