import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/LogInCreate.module.css";

export default function LogInCreate() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.logInCreate}>
        <NavLink className={styles.createAccount} to="/create-account">
          Créer un compte
        </NavLink>
        <NavLink className={styles.connexionCreate} to="/login">
          Connexion
        </NavLink>
        <div className={styles.formulaire}>
          <form>
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Nom" />
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
            <div>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                onKeyDown={toggleConfirmPasswordVisibility}
                type="button"
                className={`${styles.eyes} material-symbols-outlined`}
              >
                {confirmPasswordVisible ? "visibility" : "visibility_off"}
              </button>
            </div>
            <button className={styles.confirm} type="submit">
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
