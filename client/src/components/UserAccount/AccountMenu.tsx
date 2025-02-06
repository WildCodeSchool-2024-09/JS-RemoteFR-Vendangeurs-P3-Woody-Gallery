import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../../styles/UserAccount/AccountMenu.module.css";

export default function AccountMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState("Compte");
  const userName = sessionStorage.getItem("userName");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/addresses")) {
      setCurrentPage("Adresses");
    } else if (location.pathname.includes("/orders")) {
      setCurrentPage("Commandes");
    } else if (location.pathname.includes("/favorites")) {
      setCurrentPage("Favoris");
    } else if (location.pathname.includes("/payment")) {
      setCurrentPage("Paiement");
    } else {
      setCurrentPage("Compte");
    }
  }, [location.pathname]);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className={styles.container}>
      <button type="button" className={styles.menu} onClick={toggleClick}>
        <span className={`material-symbols-outlined ${styles.menuIcon}`}>
          menu
        </span>
      </button>

      {isClicked && (
        <div className={styles.modal}>
          <NavLink
            to={`/user/${userName}`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Compte
          </NavLink>
          <NavLink
            to={`/user/${userName}/addresses`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Adresses
          </NavLink>
          <NavLink
            to={`/user/${userName}/orders`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Commandes
          </NavLink>
          <NavLink
            to={`/user/${userName}/favorites`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Favoris
          </NavLink>
          <NavLink
            to={`/user/${userName}/payment`}
            className={styles.nav}
            onClick={toggleClick}
          >
            Paiement
          </NavLink>
        </div>
      )}
      <div className={styles.desktopMenu}>
        <NavLink
          to={`/user/${userName}`}
          className={`${styles.desktopNav} ${currentPage === "Compte" ? styles.active : ""}`}
        >
          Compte
        </NavLink>
        <NavLink
          to={`/user/${userName}/addresses`}
          className={`${styles.desktopNav} ${currentPage === "Adresses" ? styles.active : ""}`}
        >
          Adresses
        </NavLink>
        <NavLink
          to={`/user/${userName}/orders`}
          className={`${styles.desktopNav} ${currentPage === "Commandes" ? styles.active : ""}`}
        >
          Commandes
        </NavLink>
        <NavLink
          to={`/user/${userName}/favorites`}
          className={`${styles.desktopNav} ${currentPage === "Favoris" ? styles.active : ""}`}
        >
          Favoris
        </NavLink>
        <NavLink
          to={`/user/${userName}/payment`}
          className={`${styles.desktopNav} ${currentPage === "Paiement" ? styles.active : ""}`}
        >
          Paiement
        </NavLink>
      </div>
    </section>
  );
}
