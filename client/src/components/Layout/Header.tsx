import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Layout/Header.module.css";

export default function Header() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userName = sessionStorage.getItem("userName");
  const [orderNumber, setOrderNumber] = useState(0);
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const updateOrderNumber = () => {
      const order = JSON.parse(localStorage.getItem("order") || "[]");
      if (order) {
        setOrderNumber(order.length);
      }
    };

    updateOrderNumber();
    const intervalOrder = setInterval(updateOrderNumber, 100);

    if (
      sessionStorage.getItem("userName") === null &&
      localStorage.getItem("isAuth") === "true"
    ) {
      localStorage.clear();
      logout();
      navigate("/");
      window.location.reload();
    }

    return () => {
      clearInterval(intervalOrder);
    };
  }, [logout, navigate]);

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.woodyTitle}>Woody</span>
        <span className={styles.galleryTitle}>Gallery</span>
      </h1>
      <NavLink className={styles.shopIcon} to="/panier">
        <span className="material-symbols-outlined">shopping_cart</span>
        {orderNumber !== 0 ? <p>{orderNumber}</p> : ""}
      </NavLink>
      <NavLink
        className={`${styles.accountIcon} ${isAdmin ? `${styles.accountAdmin}` : ""}`}
        to={
          isAuth
            ? isAdmin
              ? "admin/articles"
              : `/user/${userName}`
            : "/create-account"
        }
      >
        <span className="material-symbols-outlined">account_circle</span>
      </NavLink>

      <ul className={styles.ulNavigation}>
        <NavLink className={styles.navLink} to="/">
          <li>
            <p>Accueil</p>
          </li>
        </NavLink>
        <NavLink className={styles.navLink} to="/shop?collection=2">
          <li>
            <p>Nouveautés</p>
          </li>
        </NavLink>
        <NavLink className={styles.navLink} to="/shop">
          <li>
            <p>Shop</p>
          </li>
        </NavLink>
      </ul>

      <ul className={styles.ulUser}>
        {isAuth ? (
          <NavLink
            className={styles.navLink}
            to={`/user/${userName}/favorites`}
          >
            <li>
              <span className="material-symbols-outlined">favorite</span>
              <p>Favoris</p>
            </li>
          </NavLink>
        ) : (
          ""
        )}
        <NavLink className={`${styles.navLink} ${styles.order}`} to="/panier">
          <li>
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>Panier</p>
            {orderNumber !== 0 ? (
              <p className={styles.numberOrder}>{orderNumber}</p>
            ) : (
              ""
            )}
          </li>
        </NavLink>
        <NavLink
          className={styles.navLink}
          to={
            isAuth
              ? isAdmin
                ? "admin/articles"
                : `/user/${userName}`
              : "/create-account"
          }
        >
          <li>
            {isAuth ? (
              <span
                className={`material-symbols-outlined ${styles.account} ${isAdmin ? `${styles.accountAdmin}` : ""}`}
              >
                account_circle
              </span>
            ) : (
              "Connexion"
            )}
          </li>
        </NavLink>
      </ul>
    </header>
  );
}
