import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminLogout from "../components/AdminPage/AdminLogout";
import AdminMobile from "../components/AdminPage/AdminMobile";
import AdminArticles from "../components/AdminPage/Articles/AdminArticles";
import AdminUsers from "../components/AdminPage/Users/AdminUsers";
import { ArticlesProvider } from "../contexts/AdminArticlesContext";
import { UsersProvider } from "../contexts/AdminUsersContext";
import { MyCollectionsProvider } from "../contexts/MyCollectionContext";
import styles from "../styles/AdminPage/AdminPage.module.css";
import AdminOrdersPage from "./AdminOrdersPage";

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

    url === `${import.meta.env.VITE_CURRENT_URL}/admin/articles`
      ? setIsArticlesPage(true)
      : setIsArticlesPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/admin/users`
      ? setIsUsersPage(true)
      : setIsUsersPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/admin/orders`
      ? setIsOrdersPage(true)
      : setIsOrdersPage(false);
    url === `${import.meta.env.VITE_CURRENT_URL}/admin/logout`
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
              to="/admin/articles"
            >
              <li>Articles</li>
            </NavLink>
            <NavLink
              className={isUsersPage ? styles.currentPage : ""}
              to="/admin/users"
            >
              <li>Utilisateurs</li>
            </NavLink>
            <NavLink
              className={isOrdersPage ? styles.currentPage : ""}
              to="/admin/orders"
            >
              <li>Commandes</li>
            </NavLink>
            <NavLink
              className={
                isLogoutPage ? styles.currentDeconnexion : styles.deconnexion
              }
              to="/admin/logout"
            >
              <li>Déconnexion</li>
            </NavLink>
          </ul>
          {isArticlesPage && (
            <ArticlesProvider>
              <MyCollectionsProvider>
                <AdminArticles />
              </MyCollectionsProvider>
            </ArticlesProvider>
          )}
          {isUsersPage && (
            <UsersProvider>
              <AdminUsers />
            </UsersProvider>
          )}
          {isLogoutPage && <AdminLogout />}
          {isOrdersPage && <AdminOrdersPage />}
        </div>
      )}
    </section>
  );
}
