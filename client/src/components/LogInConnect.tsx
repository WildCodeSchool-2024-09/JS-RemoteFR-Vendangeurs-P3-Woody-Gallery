import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/LogInCreate.module.css";

export default function LogInConnect() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

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
          <input type="email" placeholder="Email" />
          <div>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Mot de passe"
            />
            <button
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              type="button"
              className={`${styles.eyes} material-symbols-outlined`}
            >
              {passwordVisible ? "visibility" : "visibility_off"}
            </button>
          </div>
          <button className={styles.confirm} type="button">
            Connexion
          </button>
          <a className={styles.forgotPassword} href="/ok">
            Mot de passe oublié ?
          </a>
        </form>
      </div>
    </>
  );
}
