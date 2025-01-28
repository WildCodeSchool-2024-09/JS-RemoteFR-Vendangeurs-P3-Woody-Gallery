import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminMobile from "../components/AdminMobile";
import styles from "../styles/AdminPage.module.css";

export default function AdminUsersPage() {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useState(() => {
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

  return (
    <section className={styles.adminPage}>
      <h2>Panel administrateur</h2>
      {isMobile ? (
        <AdminMobile />
      ) : (
        <div className={styles.panel}>
          <ul>
            <NavLink to="/user/admin/articles">
              <li>Articles</li>
            </NavLink>
            <NavLink className={styles.currentPage} to="/user/admin/users">
              <li>Utilisateurs</li>
            </NavLink>
            <NavLink to="/user/admin/orders">
              <li>Commandes</li>
            </NavLink>
            <NavLink className={styles.deconnexion} to="/user/admin/logout">
              <li>Déconnexion</li>
            </NavLink>
          </ul>
        </div>
      )}
    </section>
  );
}
