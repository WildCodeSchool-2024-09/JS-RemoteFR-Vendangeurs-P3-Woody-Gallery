import { NavLink } from "react-router-dom";
import styles from "../styles/LogInCreate.module.css";

export default function LogInCreate() {
  return (
    <>
      <div className={styles.logInCreate}>
        <NavLink className={styles.createAccount} to="/create-account">
          Créer un compte
        </NavLink>
        <NavLink className={styles.connexionCreate} to="/connexion">
          Connexion
        </NavLink>
        <form>
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
          <input type="text" placeholder="Confirmer le mot de passe" />
          <button type="button">Créer mon compte</button>
        </form>
      </div>
    </>
  );
}
