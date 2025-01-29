import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminArticles from "../components/AdminArticles";
import AdminMobile from "../components/AdminMobile";
import styles from "../styles/AdminPage.module.css";

export default function AdminPage() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isArticlesPage, setIsArticlesPage] = useState<boolean>(false);
  const [isUsersPage, setIsUsersPage] = useState<boolean>(false);
  const [isOrdersPage, setIsOrdersPage] = useState<boolean>(false);
  const [isLogoutPage, setIsLogoutPage] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const url = window.location.href;

    url === `${import.meta.env.VITE_CURRENT_URL}/user/admin/articles`
      ? setIsArticlesPage(true)
      : setIsArticlesPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/user/admin/users`
      ? setIsUsersPage(true)
      : setIsUsersPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/user/admin/orders`
      ? setIsOrdersPage(true)
      : setIsOrdersPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/user/admin/logout`
      ? setIsLogoutPage(true)
      : setIsLogoutPage(false);
  });

  return (
    <section className={styles.adminPage}>
      <h2>Panel administrateur</h2>
      {isMobile ? (
        <AdminMobile />
      ) : (
        <div className={styles.panel}>
          <ul className={styles.nav}>
            <NavLink
              className={isArticlesPage ? styles.currentPage : ""}
              to="/user/admin/articles"
            >
              <li>Articles</li>
            </NavLink>
            <NavLink
              className={isUsersPage ? styles.currentPage : ""}
              to="/user/admin/users"
            >
              <li>Utilisateurs</li>
            </NavLink>
            <NavLink
              className={isOrdersPage ? styles.currentPage : ""}
              to="/user/admin/orders"
            >
              <li>Commandes</li>
            </NavLink>
            <NavLink
              className={
                isLogoutPage ? styles.currentDeconnexion : styles.deconnexion
              }
              to="/user/admin/logout"
            >
              <li>Déconnexion</li>
            </NavLink>
          </ul>
          {isArticlesPage && <AdminArticles />}
        </div>
      )}
    </section>
  );
}
