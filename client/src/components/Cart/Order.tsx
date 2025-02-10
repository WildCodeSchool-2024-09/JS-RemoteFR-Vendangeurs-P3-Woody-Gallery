import { useEffect, useState } from "react";
import styles from "../../styles/Cart/Order.module.css";
import OrderCard from "./OrderCard";

type OrderProps = {
  id: number;
  name: string;
  image: string;
  format: string;
  price: number;
};

export default function Order() {
  const [orderNumber, setOrderNumber] = useState<number[]>([]);
  const [photos, setPhotos] = useState<OrderProps[]>([]);
  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/photos`)
      .then((response) => response.json())
      .then((data: OrderProps[]) => setPhotos(data));
  }, []);

  useEffect(() => {
    const updateOrderNumber = () => {
      const order = JSON.parse(localStorage.getItem("order") || "[]");
      if (order) {
        setOrderNumber(order);
      }
    };

    updateOrderNumber();
    const intervalOrder = setInterval(updateOrderNumber, 100);

    return () => {
      clearInterval(intervalOrder);
    };
  }, []);

  const countOccurrences = (arr: number[]) => {
    const counts: { [key: number]: number } = {};
    for (const num of arr) {
      counts[num] = (counts[num] || 0) + 1;
    }
    return counts;
  };

  const occurrences = countOccurrences(orderNumber);

  const countTotalPrice = (arr: number[]) => {
    const counts: { [key: number]: number } = {};
    for (const num of arr) {
      counts[num] = (counts[num] || 0) + 1;
    }

    let totalPrice = 0;
    for (const id in counts) {
      const photo = photos.find((photo) => photo.id === Number.parseInt(id));
      if (photo) {
        totalPrice += photo.price * counts[id];
      }
    }

    return totalPrice.toFixed(2);
  };

  const totalPrice = countTotalPrice(orderNumber);

  const handleConfirmOrder = () => {
    if (!userId) {
      alert(
        "Veuillez vous connecter à votre compte pour passer votre commande",
      );
      return;
    }

    if (userId && orderNumber && totalPrice) {
      fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          articles: [...orderNumber],
          total_amount: totalPrice,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la commande");
          }
          localStorage.removeItem("order");
          alert("Votre commande vient d'être effectuée");
          return response.json();
        })
        .catch((error) => {
          console.error("Erreur lors de la commande:", error);
          alert("Une erreur est survenue lors de la commande");
        });
    } else {
      alert("Une erreur vient de se produire");
    }
  };

  return (
    <article className={styles.order}>
      {orderNumber.length === 0 ? (
        <p className={styles.noOrder}>Aucun article en attente</p>
      ) : (
        <>
          {photos
            .filter((order) => orderNumber.includes(order.id))
            .map((photo) => (
              <OrderCard
                key={`orderCard-${photo.id}-${photo.name} `}
                id={photo.id}
                name={photo.name}
                image={photo.image}
                format={photo.format}
                price={photo.price}
                count={occurrences[photo.id]}
              />
            ))}
          <div className={styles.priceTotal}>
            <h5>{`Sous-total (${orderNumber.length} articles) :`}</h5>
            <p>{totalPrice} €</p>
          </div>
          <div className={styles.totalToBuy}>
            <h5>{`Sous-total (${orderNumber.length} articles) :`}</h5>
            <p>{totalPrice} €</p>
          </div>
          <button
            onClick={handleConfirmOrder}
            onKeyDown={handleConfirmOrder}
            className={styles.validateOrder}
            type="button"
          >
            Passer commande
          </button>
        </>
      )}
    </article>
  );
}
