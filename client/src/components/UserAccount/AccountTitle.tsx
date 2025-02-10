import { matchPath, useLocation } from "react-router-dom";
import styles from "../../styles/UserAccount/AccountTitle.module.css";

export default function AccountTitle() {
  const location = useLocation();

  const routes = [
    { path: "/user/:name/addresses", title: "Adresse" },
    { path: "/user/:name/orders", title: "Commandes" },
    { path: "/user/:name/favorites", title: "Favoris" },
    { path: "/user/:name/payment", title: "Paiement" },
  ];

  const matchedRoute = routes.find((route) =>
    matchPath(route.path, location.pathname),
  );

  return (
    <section className={`${styles.container} ${styles.hidden}`}>
      <h3 className={styles.title}>
        {matchedRoute ? matchedRoute.title : "Compte"}
      </h3>
    </section>
  );
}
