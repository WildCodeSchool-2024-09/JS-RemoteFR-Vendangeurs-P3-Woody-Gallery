import { NavLink } from "react-router-dom";
import styles from "../styles/LogInCreate.module.css";

export default function LogInConnect() {
  return (
    <>
      <div className={styles.logInCreate}>
        <NavLink className={styles.createAccountConnect} to="/create-account">
          Créer un compte
        </NavLink>
        <NavLink className={styles.connexion} to="/connexion">
          Connexion
        </NavLink>
        <form>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
          <button type="button">Connexion</button>
          <a className={styles.forgotPassword} href="/ok">
            Mot de passe oublié ?
          </a>
        </form>
      </div>
    </>
  );
}
